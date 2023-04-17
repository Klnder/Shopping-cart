/* global Product, Cart */

"use strict";

// Set up an empty cart for use on this page.
state.cart = new Cart([]);

// On screen load, we call this method to put all of the product options
// (the things in the state.allProducts array) into the drop down list.
function populateForm() {
  const selectElement = document.getElementById("items");
  for (let i in state.allProducts) {
    let newOption = new Option(state.allProducts[i].name);
    selectElement.add(newOption);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  state.cart.saveToLocalStorage();
  state.cart.updateCounter();
  updateCartPreview();
}

function addSelectedItemToCart() {
  let quantity = document.getElementById("quantity");
  console.log(quantity.value);
  let item = document.getElementById("items");
  console.log(item.value);
  state.cart.addItem(item.value, quantity.value);
}

function updateCartPreview() {
  let quantity = document.getElementById("quantity");
  console.log(quantity.value);
  let item = document.getElementById("items");
  console.log(item.value);
  const cartContents = document.getElementById("cartContents");
  let newitem = document.createElement("P");
  newitem.textContent = `${item.value} ${quantity.value}`;
  cartContents.appendChild(newitem);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById("catalog");
catalogForm.addEventListener("submit", handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
