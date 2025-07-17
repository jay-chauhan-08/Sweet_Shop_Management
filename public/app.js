
const shop = new SweetShop();

function addSweet() {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value, 10);

  if (!name || !category || !price || !quantity) {
    alert("Please fill all fields and select a category.");
    return;
  }

  const sweet = shop.addSweet(name, category, price, quantity);
  console.log("Added sweet with ID:", sweet.id); 

  renderTable();
  clearInputs();
}

function renderTable(sweets = shop.getAllSweets()) {
  const table = document.getElementById("sweetTable");
  table.innerHTML = "";

  sweets.forEach((sweet, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${sweet.name}</td>
      <td>${sweet.category}</td>
      <td>${sweet.price}</td>
      <td>${sweet.quantity}</td>
      <td>
        <button onclick="promptPurchase('${sweet.id}')" ${sweet.quantity === 0 ? "disabled" : ""}>Buy</button>
        <button onclick="promptRestock('${sweet.id}')">Restock</button>
        <button onclick="deleteSweet('${sweet.id}')">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

function promptPurchase(id) {
  const quantity = parseInt(prompt("How many units do you want to buy?"), 10);

  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid number.");
    return;
  }

  const success = shop.purchaseSweet(id, quantity);

  if (!success) {
    alert("Not enough stock available.");
  } else {
    alert(`Successfully purchased ${quantity} unit(s).`);
  }

  renderTable();
}

function promptRestock(id) {
  const quantity = parseInt(prompt("Enter quantity to add:"), 10);

  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid positive number.");
    return;
  }

  const success = shop.restockSweet(id, quantity);

  if (success) {
    alert(`Successfully added ${quantity} unit(s) to inventory.`);
    renderTable();
  } else {
    alert("Sweet not found.");
  }
}

function deleteSweet(id) {
  const deleted = shop.deleteSweet(id);
  if (deleted) {
    console.log("Deleted sweet with ID:", id);
    renderTable();
  } else {
    alert("Sweet not found.");
  }
}


function clearInputs() {
  ["name", "category", "price", "quantity"].forEach(id => {
    document.getElementById(id).value = "";
  });
}


function searchSweets() {
  const name = document.getElementById("searchName").value.trim();
  if (!name) {
    renderTable(); // If empty, show all
    return;
  }

  const filter = { name };
  const filtered = shop.searchSweets(filter);
  renderTable(filtered);
}

function handleSearchInput(input) {
  if (input.value.trim() === "") {
    renderTable(); 
  }
}
