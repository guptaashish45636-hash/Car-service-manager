const carKey = "csm_cars";
const serviceKey = "csm_services";
const maintenanceKey = "csm_maintenance";

const sampleCars = [
  {
    id: 1,
    owner: "Alex Morgan",
    name: "Civic Touring",
    brand: "Honda",
    model: "Civic",
    registration: "KA 01 AB 1234",
    year: "2022",
    fuel: "Petrol",
    color: "Sonic Grey",
    mileage: "24,860",
    purchaseDate: "2022-03-18",
    lastService: "2026-07-12",
    nextService: "2026-10-12",
    image:
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    owner: "Alex Morgan",
    name: "Model 3 Long Range",
    brand: "Tesla",
    model: "Model 3",
    registration: "MH 12 XY 7788",
    year: "2023",
    fuel: "Electric",
    color: "Pearl White",
    mileage: "16,420",
    purchaseDate: "2023-09-04",
    lastService: "2026-06-05",
    nextService: "2026-12-05",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=80",
  },
];
const sampleServices = [
  {
    id: 1001,
    carId: 1,
    type: "Oil Change",
    date: "2026-07-12",
    mileage: "24,860",
    center: "Autocare Central",
    cost: 120,
    status: "Completed",
    description: "Oil and filter replaced.",
    parts: "Engine oil, oil filter",
    nextDate: "2026-10-12",
  },
  {
    id: 1002,
    carId: 2,
    type: "Brake Service",
    date: "2026-08-20",
    mileage: "16,420",
    center: "DriveWell Garage",
    cost: 280,
    status: "Completed",
    description: "Front brake inspection.",
    parts: "Brake pads",
    nextDate: "2027-02-20",
  },
  {
    id: 1003,
    carId: 1,
    type: "General Service",
    date: "2026-10-12",
    mileage: "27,000",
    center: "Autocare Central",
    cost: 220,
    status: "Upcoming",
    description: "Scheduled general service.",
    parts: "",
    nextDate: "2027-01-12",
  },
];
const defaultMaintenance = [
  {
    id: 1,
    category: "Engine",
    task: "Engine Oil",
    last: "2026-07-12",
    next: "2026-10-12",
    status: "Good",
  },
  {
    id: 2,
    category: "Engine",
    task: "Oil Filter",
    last: "2026-07-12",
    next: "2026-10-12",
    status: "Good",
  },
  {
    id: 3,
    category: "Engine",
    task: "Coolant",
    last: "2026-05-08",
    next: "2026-09-25",
    status: "Due Soon",
  },
  {
    id: 4,
    category: "Engine",
    task: "Air Filter",
    last: "2026-01-11",
    next: "2026-07-11",
    status: "Due",
  },
  {
    id: 5,
    category: "Tires",
    task: "Tire Pressure",
    last: "2026-08-24",
    next: "2026-09-24",
    status: "Good",
  },
  {
    id: 6,
    category: "Tires",
    task: "Tire Condition",
    last: "2026-08-24",
    next: "2026-11-24",
    status: "Good",
  },
  {
    id: 7,
    category: "Tires",
    task: "Wheel Alignment",
    last: "2026-04-18",
    next: "2026-10-18",
    status: "Due Soon",
  },
  {
    id: 8,
    category: "Brakes",
    task: "Brake Pads",
    last: "2026-08-20",
    next: "2027-02-20",
    status: "Good",
  },
  {
    id: 9,
    category: "Brakes",
    task: "Brake Fluid",
    last: "2026-02-20",
    next: "2027-02-20",
    status: "Good",
  },
  {
    id: 10,
    category: "Electrical",
    task: "Battery",
    last: "2026-06-05",
    next: "2027-06-05",
    status: "Good",
  },
  {
    id: 11,
    category: "Electrical",
    task: "Headlights",
    last: "2026-08-24",
    next: "2026-11-24",
    status: "Good",
  },
  {
    id: 12,
    category: "Electrical",
    task: "Indicators",
    last: "2026-08-24",
    next: "2026-11-24",
    status: "Good",
  },
];

const getData = (key, fallback) => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  return JSON.parse(stored);
};
const saveData = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
const cars = () => getData(carKey, sampleCars);
const services = () => getData(serviceKey, sampleServices);
const maintenance = () => getData(maintenanceKey, defaultMaintenance);
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char],
  );
const formatDate = (value) =>
  value
    ? new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";
const carName = (id) =>
  cars().find((car) => Number(car.id) === Number(id))?.name || "Unknown car";
const badge = (status) => {
  const type =
    {
      Completed: "success",
      Upcoming: "primary",
      Pending: "warning",
      Good: "success",
      "Due Soon": "warning",
      Due: "danger",
    }[status] || "secondary";
  return `<span class="badge text-bg-${type}">${esc(status)}</span>`;
};
const formSuccess = (message) =>
  `<div class="alert alert-success alert-dismissible fade show" role="alert"><i class="bi bi-check-circle me-2"></i>${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>`;

function setupCommon() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar .nav-link").forEach((link) => {
    if (link.getAttribute("href") === page) link.classList.add("active");
  });
  document
    .querySelectorAll("[data-year]")
    .forEach((item) => (item.textContent = new Date().getFullYear()));
  document.querySelectorAll("[data-confirm-delete]").forEach((button) =>
    button.addEventListener("click", () => {
      if (!confirm("Delete this item?")) return;
    }),
  );
}

function renderCars(filter = "") {
  const target = document.querySelector("#carsGrid");
  if (!target) return;
  const list = cars().filter((car) =>
    `${car.name} ${car.brand} ${car.model} ${car.registration}`
      .toLowerCase()
      .includes(filter.toLowerCase()),
  );
  target.innerHTML = list.length
    ? list
        .map(
          (car) =>
            `<div class="col-md-6 col-lg-4"><article class="card card-hover h-100 overflow-hidden"><img class="car-image" src="${esc(car.image)}" alt="${esc(car.name)}"><div class="card-body d-flex flex-column"><div class="d-flex justify-content-between align-items-start gap-2"><div><h3 class="h5 mb-1">${esc(car.name)}</h3><p class="text-secondary mb-3">${esc(car.brand)} ${esc(car.model)} · ${esc(car.year)}</p></div>${badge(car.fuel)}</div><div class="small text-secondary mb-3"><div class="d-flex justify-content-between py-1"><span>Registration</span><strong class="text-dark">${esc(car.registration)}</strong></div><div class="d-flex justify-content-between py-1"><span>Mileage</span><strong class="text-dark">${esc(car.mileage)} km</strong></div><div class="d-flex justify-content-between py-1"><span>Next service</span><strong class="text-dark">${formatDate(car.nextService)}</strong></div></div><div class="mt-auto d-flex gap-2"><a href="car-details.html?id=${car.id}" class="btn btn-primary btn-sm flex-grow-1"><i class="bi bi-eye me-1"></i>View Details</a><a href="add-car.html?id=${car.id}" class="btn btn-outline-secondary btn-sm" title="Edit"><i class="bi bi-pencil"></i></a><button class="btn btn-outline-danger btn-sm" data-delete-car="${car.id}" title="Delete"><i class="bi bi-trash"></i></button></div></div></article></div>`,
        )
        .join("")
    : '<div class="col-12"><div class="empty-state text-center rounded-3 p-5"><i class="bi bi-car-front fs-2"></i><p class="mb-0 mt-2">No cars match your search.</p></div></div>';
  target.querySelectorAll("[data-delete-car]").forEach((button) =>
    button.addEventListener("click", () => {
      if (!confirm("Delete this car and its service records?")) return;
      saveData(
        carKey,
        cars().filter((car) => car.id !== Number(button.dataset.deleteCar)),
      );
      saveData(
        serviceKey,
        services().filter(
          (service) => service.carId !== Number(button.dataset.deleteCar),
        ),
      );
      renderCars(document.querySelector("#carSearch")?.value || "");
    }),
  );
}

function renderServices(filter = "") {
  const target = document.querySelector("#serviceRows");
  if (!target) return;
  const list = services().filter((service) =>
    `${carName(service.carId)} ${service.type} ${service.center} ${service.status}`
      .toLowerCase()
      .includes(filter.toLowerCase()),
  );
  target.innerHTML =
    list
      .map(
        (service) =>
          `<tr><td>#${service.id}</td><td><strong>${esc(carName(service.carId))}</strong></td><td>${esc(service.type)}</td><td>${formatDate(service.date)}</td><td>${esc(service.mileage)} km</td><td>${esc(service.center)}</td><td>₹${Number(service.cost).toLocaleString("en-IN")}</td><td>${badge(service.status)}</td><td><button class="btn btn-sm btn-outline-danger" data-delete-service="${service.id}" title="Delete"><i class="bi bi-trash"></i></button></td></tr>`,
      )
      .join("") ||
    '<tr><td colspan="9" class="text-center text-secondary py-5">No service records found.</td></tr>';
  target.querySelectorAll("[data-delete-service]").forEach((button) =>
    button.addEventListener("click", () => {
      if (!confirm("Delete this service record?")) return;
      saveData(
        serviceKey,
        services().filter(
          (service) => service.id !== Number(button.dataset.deleteService),
        ),
      );
      renderServices(document.querySelector("#serviceSearch")?.value || "");
    }),
  );
}

function initDashboard() {
  const list = services();
  document
    .querySelector("[data-total-cars]")
    ?.replaceChildren(document.createTextNode(cars().length));
  document
    .querySelector("[data-total-services]")
    ?.replaceChildren(document.createTextNode(list.length));
  document
    .querySelector("[data-upcoming-services]")
    ?.replaceChildren(
      document.createTextNode(
        list.filter((service) => service.status === "Upcoming").length,
      ),
    );
  document
    .querySelector("[data-maintenance-due]")
    ?.replaceChildren(
      document.createTextNode(
        maintenance().filter((item) => item.status !== "Good").length,
      ),
    );
  const recent = document.querySelector("#recentRows");
  if (recent)
    recent.innerHTML = list
      .slice(0, 4)
      .map(
        (item) =>
          `<tr><td>${esc(carName(item.carId))}</td><td>${esc(item.type)}</td><td>${formatDate(item.date)}</td><td>₹${Number(item.cost).toLocaleString("en-IN")}</td><td>${badge(item.status)}</td></tr>`,
      )
      .join("");
  const upcoming = document.querySelector("#upcomingList");
  if (upcoming)
    upcoming.innerHTML =
      list
        .filter((item) => item.status === "Upcoming")
        .map(
          (item) =>
            `<div class="list-group-item d-flex justify-content-between align-items-center"><div><strong>${esc(item.type)}</strong><div class="small text-secondary">${esc(carName(item.carId))}</div></div><span class="text-primary fw-semibold">${formatDate(item.date)}</span></div>`,
        )
        .join("") ||
      '<div class="list-group-item text-secondary">No upcoming services.</div>';
}

function initCarForm() {
  const form = document.querySelector("#carForm");
  if (!form) return;
  const id = new URLSearchParams(location.search).get("id");
  const existing = cars().find((car) => car.id === Number(id));
  if (existing) {
    document.querySelector("#formTitle").textContent = "Edit car details";
    Object.entries(existing).forEach(([key, value]) => {
      const field = form.elements[key];
      if (field) field.value = value;
    });
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    data.id = existing?.id || Date.now();
    data.name = `${data.brand} ${data.model}`;
    data.image =
      existing?.image ||
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80";
    const updated = existing
      ? cars().map((car) => (car.id === existing.id ? data : car))
      : [...cars(), data];
    saveData(carKey, updated);
    document.querySelector("#formMessage").innerHTML = formSuccess(
      "Car details saved successfully.",
    );
    setTimeout(() => (location.href = "my-cars.html"), 800);
  });
}

function initServiceForm() {
  const form = document.querySelector("#serviceForm");
  if (!form) return;
  document.querySelector("#serviceCarOptions").innerHTML = cars()
    .map(
      (car) =>
        `<option value="${car.id}">${esc(car.name)} (${esc(car.registration)})</option>`,
    )
    .join("");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    data.id = Date.now();
    data.carId = Number(data.carId);
    data.cost = Number(data.cost);
    data.status = "Completed";
    saveData(serviceKey, [data, ...services()]);
    const car = cars().find((item) => item.id === data.carId);
    if (car) {
      car.lastService = data.date;
      car.nextService = data.nextDate;
      saveData(
        carKey,
        cars().map((item) => (item.id === car.id ? car : item)),
      );
    }
    document.querySelector("#formMessage").innerHTML = formSuccess(
      "Service record added successfully!",
    );
    form.reset();
  });
}

function initDetails() {
  const target = document.querySelector("#carDetail");
  if (!target) return;
  const car =
    cars().find(
      (item) =>
        item.id === Number(new URLSearchParams(location.search).get("id")),
    ) || cars()[0];
  const carServices = services().filter((item) => item.carId === car.id);
  target.innerHTML = `<div class="row g-4 align-items-center"><div class="col-lg-5"><img src="${esc(car.image)}" alt="${esc(car.name)}" class="detail-image rounded-3"></div><div class="col-lg-7"><span class="eyebrow">Vehicle profile</span><h2 class="display-6 mt-2">${esc(car.name)}</h2><p class="text-secondary">${esc(car.brand)} ${esc(car.model)} · ${esc(car.year)}</p><div class="row g-3 mt-2"><div class="col-sm-6"><small class="text-secondary">Registration</small><div class="fw-semibold">${esc(car.registration)}</div></div><div class="col-sm-6"><small class="text-secondary">Fuel type</small><div class="fw-semibold">${esc(car.fuel)}</div></div><div class="col-sm-6"><small class="text-secondary">Mileage</small><div class="fw-semibold">${esc(car.mileage)} km</div></div><div class="col-sm-6"><small class="text-secondary">Color</small><div class="fw-semibold">${esc(car.color)}</div></div><div class="col-sm-6"><small class="text-secondary">Purchase date</small><div class="fw-semibold">${formatDate(car.purchaseDate)}</div></div></div><div class="d-flex flex-wrap gap-2 mt-4"><a class="btn btn-outline-primary" href="add-car.html?id=${car.id}"><i class="bi bi-pencil me-1"></i>Edit Car</a><a class="btn btn-primary" href="add-service.html"><i class="bi bi-plus-lg me-1"></i>Add Service</a><a class="btn btn-outline-secondary" href="service-history.html">View Service History</a></div></div></div>`;
  document.querySelector("[data-detail-last]").textContent = formatDate(
    car.lastService,
  );
  document.querySelector("[data-detail-next]").textContent = formatDate(
    car.nextService,
  );
  document.querySelector("[data-detail-count]").textContent =
    carServices.length;
  document.querySelector("[data-detail-cost]").textContent =
    `₹${carServices.reduce((total, item) => total + Number(item.cost), 0).toLocaleString("en-IN")}`;
}

function initMaintenance() {
  const target = document.querySelector("#maintenanceGroups");
  if (!target) return;
  const items = maintenance();
  target.innerHTML = [...new Set(items.map((item) => item.category))]
    .map(
      (category) =>
        `<div class="col-md-6"><div class="card h-100"><div class="card-body"><h2 class="h5 mb-3">${esc(category)}</h2>${items
          .filter((item) => item.category === category)
          .map(
            (item) =>
              `<div class="checklist-item rounded-2 bg-light p-3 mb-3" data-maintenance-item="${item.id}"><div class="d-flex justify-content-between gap-2"><div><strong>${esc(item.task)}</strong><div class="small text-secondary mt-1">Last checked: ${formatDate(item.last)}<br>Next check: ${formatDate(item.next)}</div></div>${badge(item.status)}</div><button class="btn btn-sm btn-outline-success mt-3" data-complete-maintenance="${item.id}" ${item.status === "Good" ? "disabled" : ""}><i class="bi bi-check2 me-1"></i>${item.status === "Good" ? "Completed" : "Mark complete"}</button></div>`,
          )
          .join("")}</div></div></div>`,
    )
    .join("");
  target.querySelectorAll("[data-complete-maintenance]").forEach((button) =>
    button.addEventListener("click", () => {
      saveData(
        maintenanceKey,
        maintenance().map((item) =>
          item.id === Number(button.dataset.completeMaintenance)
            ? {
                ...item,
                status: "Good",
                last: new Date().toISOString().slice(0, 10),
              }
            : item,
        ),
      );
      initMaintenance();
    }),
  );
}

function initAuthForms() {
  document.querySelectorAll(".needs-validation").forEach((form) =>
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add("was-validated");
        return;
      }
      const password = form.querySelector('[name="password"]');
      const confirm = form.querySelector('[name="confirmPassword"]');
      if (confirm && password.value !== confirm.value) {
        confirm.setCustomValidity("Passwords do not match");
        form.classList.add("was-validated");
        return;
      }
      if (form.id === "registerForm") {
        document.querySelector("#formMessage").innerHTML = formSuccess(
          "Account created successfully. You can now log in.",
        );
      } else if (form.id === "loginForm") {
        location.href = "dashboard.html";
      } else {
        document.querySelector("#formMessage").innerHTML = formSuccess(
          "Thanks! Your message has been sent.",
        );
        form.reset();
      }
    }),
  );
}

document.addEventListener("DOMContentLoaded", () => {
  setupCommon();
  renderCars();
  renderServices();
  initDashboard();
  initCarForm();
  initServiceForm();
  initDetails();
  initMaintenance();
  initAuthForms();
  document
    .querySelector("#carSearch")
    ?.addEventListener("input", (event) => renderCars(event.target.value));
  document
    .querySelector("#serviceSearch")
    ?.addEventListener("input", (event) => renderServices(event.target.value));
});
