/* global Cart */
"use strict";

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById("cart");
table.addEventListener("click", removeItemFromCart);

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

function clearCart() {
  const old_tbody = document.querySelector("tbody");
  const new_tbody = document.createElement("tbody");
  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}

function showCart() {
  let tableBody = document.querySelector("tbody");

  for (let i = 0; i < state.cart.items.length; i++) {
    let item = state.cart.items[i];
    //create a new line
    let line = document.createElement("tr");
    //add our text content
    let tableData = document.createElement("td");
    let button = document.createElement("button");
    button.innerText = "x";
    button.setAttribute("id", item.product);
    button.addEventListener("click", removeItemFromCart);
    tableData.appendChild(button);
    line.appendChild(tableData);
    tableData = document.createElement("td");
    tableData.textContent = item.quantity;
    line.appendChild(tableData);
    tableData = document.createElement("td");
    tableData.textContent = item.product;
    line.appendChild(tableData);
    //add our line
    tableBody.appendChild(line);
  }
}

function removeItemFromCart(event) {
  event.preventDefault();

  let itemName = event.target.id;
  let button = document.getElementById(itemName);
  console.log(itemName);
  button.disabled = true;
  button.removeEventListener("click", removeItemFromCart);
  //state.cart.removeItem(itemName);
  //state.cart.saveToLocalStorage();
  //renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
