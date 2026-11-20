// 1. lists of items - our data 
var missingItems = ["Toilet paper", "Tooth- paste", "Toothbrushes"];
var boughtItems = ["Vitamins", "Medications", "Laundry detergent", "Cleaning products", "Cleaning wipes"];
var commonItems = [
  "Cleaning products", "Toothpaste", "Hand soap", "Dish soap", "Toilet paper",
  "Detergent", "Shampoo", "Mouth wash", "Dental floss", "Hygenic products", "Soap"
];

// 2. Finding the required html elements 
// IMPORTANT: these ids must match the ids in index.html exactly.
// If one is wrong, the console (F12) will tell you which one.
function getElement(id) {
  var element = document.getElementById(id);
  if (element === null) {
    console.error("Can't find an element with id='" + id + "' in Amenities.html");
  }
  return element;
}
var missingList = getElement("missing-list");
var boughtList = getElement("bought-list");
var commonList = getElement("common-list");
var newItemInput = getElement("new-item");
var addButton = getElement("add-button");

 ===== 1. OUR DATA (lists of items) =====
var missingItems = ["Toilet paper", "Tooth- paste", "Toothbrushes"];
var boughtItems = ["Vitamins", "Medications", "Laundry detergent", "Cleaning products", "Cleaning wipes"];
var commonItems = [
  "Cleaning products", "Toothpaste", "Hand soap", "Dish soap", "Toilet paper",
  "Detergent", "Shampoo", "Mouth wash", "Dental floss", "Hygenic products", "Soap"
];

// ===== 2. FIND THE HTML ELEMENTS WE NEED =====
// IMPORTANT: these ids must match the ids in index.html exactly.
// If one is wrong, the console (F12) will tell you which one.
function getElement(id) {
  var element = document.getElementById(id);
  if (element === null) {
    console.error("Can't find an element with id='" + id + "' in index.html");
  }
  return element;
}

var missingList = getElement("missing-list");
var boughtList = getElement("bought-list");
var commonList = getElement("common-list");
var newItemInput = getElement("new-item");
var addButton = getElement("add-button");

// 3. date function ---> shows todays date 
function showDate() {
  var today = new Date();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];
  var text = days[today.getDay()] + ", " + today.getDate() + " " + months[today.getMonth()];
  getElement("today").textContent = text;
}
// 4. Missing and bought 
function drawList(listElement, items, emptyText, clickFunction) {
  listElement.innerHTML = "";  

  if (items.length === 0) {
    var message = document.createElement("li");
    message.className = "empty-message";
    message.textContent = emptyText;
    listElement.appendChild(message);
    return;
  }

  for (var i = 0; i < items.length; i++) {
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.className = "item-button";
    button.textContent = items[i];
    button.setAttribute("data-position", i);   

    button.onclick = function () {
      var position = this.getAttribute("data-position");
      clickFunction(position);
    };

     li.appendChild(button);
    listElement.appendChild(li);
  }
}

function drawAll() {
  drawList(missingList, missingItems, "Nothing is missing.", markAsBought);
  drawList(boughtList, boughtItems, "Nothing bought yet.", moveBackToMissing);
}

//  5. Moving items between lists 
function markAsBought(position) {
  var item = missingItems.splice(position, 1)[0];   // take it out of "missing"
  boughtItems.push(item);                            // put it in "bought"
  drawAll();
}
function moveBackToMissing(position) {
  var item = boughtItems.splice(position, 1)[0];
  missingItems.push(item);
  drawAll();
}

//  6. ADDING A NEW ITEM 
function addMissingItem(name) {
  name = name.trim();   // remove extra spaces
  if (name === "") {
    return;             // do nothing if the box is empty
  }

  // Don't add the same item twice
  for (var i = 0; i < missingItems.length; i++) {
    if (missingItems[i].toLowerCase() === name.toLowerCase()) {
      alert(name + " is already on the list!");
      return;
    }
  }

  missingItems.push(name);
  drawAll();
}

addButton.onclick = function () {
  addMissingItem(newItemInput.value);
  newItemInput.value = "";   // empty the box
  newItemInput.focus();
};
 
// Pressing Enter in the box should add a new item
newItemInput.onkeydown = function (event) {
  if (event.key === "Enter") {
    addButton.onclick();
  }
};

//  7. "common items" list 
function drawCommonItems() {
  commonList.innerHTML = "";

  // The real common items
  for (var i = 0; i < commonItems.length; i++) {
    makeCommonRow(commonItems[i], false);
  }

  // Four "Add your own" rows at the end
  for (var j = 0; j < 4; j++) {
    makeCommonRow("Add your own", true);
  }
}

function makeCommonRow(name, isOwn) {
  var li = document.createElement("li");

  var label = document.createElement("span");
  label.textContent = name;

  var plus = document.createElement("button");
  plus.className = "plus-button";
  plus.textContent = "+";

  plus.onclick = function () {
    if (isOwn) {
      newItemInput.focus();      // let the user type their own item
    } else {
      addMissingItem(name);      // add this common item to missing(list)
    }
  };

  li.appendChild(label);
  li.appendChild(plus);
  commonList.appendChild(li);
}

//  8. Start the page 
showDate();
drawAll();
drawCommonItems();
