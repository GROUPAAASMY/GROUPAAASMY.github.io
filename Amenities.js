// Amenities.js

const missingList = document.getElementById("missing-list");
const boughtList = document.getElementById("bought-list");
const commonList = document.getElementById("common-list");
const itemInput = document.getElementById("item-input");
const addButton = document.getElementById("add-button");
const dateEl = document.getElementById("date");

// Items people buy a lot (the + button adds them to Missing)
const commonItems = [
  "Toilet paper",
  "Dish soap",
  "Hand soap",
  "Paper towels",
  "Trash bags",
  "Laundry detergent",
];

// Load saved lists (or start empty)
let missing = load("missing");
let bought = load("bought");

function load(key) {
  try {
    return JSON.parse(localStorage.getItem("amenities-" + key)) || [];
  } catch {
    return [];
  }
}

function save() {
  try {
    localStorage.setItem("amenities-missing", JSON.stringify(missing));
    localStorage.setItem("amenities-bought", JSON.stringify(bought));
  } catch {
    // Storage unavailable, the lists just won't persist
  }
}

// Today's date in the top bar
dateEl.textContent = new Date().toLocaleDateString("en-CA", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

// Draw one list (missing or bought)
function renderList(listEl, items, emptyText, onClick) {
  listEl.innerHTML = "";

  if (items.length === 0) {
    const li = document.createElement("li");
    li.className = "empty-message";
    li.textContent = emptyText;
    listEl.appendChild(li);
    return;
  }

  items.forEach((name, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "item-button";
    button.type = "button";
    button.textContent = name;
    button.addEventListener("click", () => onClick(index));
    li.appendChild(button);
    listEl.appendChild(li);
  });
}

// Draw the common items list
function renderCommon() {
  commonList.innerHTML = "";

  commonItems.forEach((name) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = name;

    const plus = document.createElement("button");
    plus.className = "plus-button";
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", "Add " + name);
    plus.addEventListener("click", () => addItem(name));

    li.appendChild(label);
    li.appendChild(plus);
    commonList.appendChild(li);
  });
}

function render() {
  // Click a missing item: it's been bought
  renderList(missingList, missing, "Nothing missing!", (i) => {
    bought.push(missing.splice(i, 1)[0]);
    update();
  });

  // Click a bought item: it's missing again
  renderList(boughtList, bought, "Nothing bought yet.", (i) => {
    missing.push(bought.splice(i, 1)[0]);
    update();
  });
}

function update() {
  save();
  render();
}

function addItem(name) {
  const clean = name.trim();
  if (!clean) return;

  // Skip duplicates (ignoring upper/lowercase)
  const exists = missing.some((m) => m.toLowerCase() === clean.toLowerCase());
  if (exists) return;

  // If it was in Bought, take it out of there
  bought = bought.filter((b) => b.toLowerCase() !== clean.toLowerCase());

  missing.push(clean);
  update();
}

// Add from the input box (button or Enter key)
function addFromInput() {
  addItem(itemInput.value);
  itemInput.value = "";
  itemInput.focus();
}

addButton.addEventListener("click", addFromInput);
itemInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addFromInput();
});

// Start up
renderCommon();
render();
