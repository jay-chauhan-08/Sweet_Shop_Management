/**
 * @fileoverview This module provides a TDD-driven sweet shop inventory management system using UUIDs for sweet IDs.
 */

// UUID v4 generator
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

class SweetShop {
  constructor() {
    this.inventory = [];
  }

  // Adds a new sweet to the inventory.
  addSweet(name, category, price, quantity) {
    const sweet = {
      id: uuidv4(), 
      name,
      category,
      price,
      quantity,
    };
    this.inventory.push(sweet);
    return sweet;
  }
  
  // Returns all sweets in inventory.
  getAllSweets() {
    return this.inventory;
  }
}