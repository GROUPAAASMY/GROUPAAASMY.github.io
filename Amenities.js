(function () {
  "use strict";

  var missing = ["Toilet paper", "Tooth- paste", "Toothbrushes"];
  var bought = ["Vitamins", "Medications", "Laundry detergent", "Cleaning products", "Cleaning wipes"];
  var common = [
    "Cleaning products", "Toothpaste", "Hand soap", "Dish soap", "Toilet paper",
    "Detergent", "Shampoo", "Mouth wash", "Dental floss", "Hygenic products", "Soap"
  ];
  var ownSlots = 4;
/* hit or miss with these they didnt work but this is what i got for now*/
var missingList = document.getElementById("missingList");
  var boughtList = document.getElementById("boughtList");
  var commonList = document.getElementById("commonList");
  var form = document.getElementById("addForm");
  var input = document.getElementById("itemInput");
  var toastTimer;

 
