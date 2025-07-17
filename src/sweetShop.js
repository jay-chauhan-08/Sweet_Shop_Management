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

   // Deletes a sweet by ID.
  deleteSweet(id) {
    const index = this.inventory.findIndex(s => s.id === id);
    if (index === -1) return false;
    this.inventory.splice(index, 1);
    return true;
  }

  // Filters sweets by name/category/price range.
  searchSweets(filter = {}) {
    return this.inventory.filter(sweet => {
      const matchesName = filter.name ? sweet.name.includes(filter.name) : true;
      const matchesCategory = filter.category ? sweet.category === filter.category : true;
      const matchesPrice = filter.minPrice != null && filter.maxPrice != null
        ? sweet.price >= filter.minPrice && sweet.price <= filter.maxPrice
        : true;
      return matchesName && matchesCategory && matchesPrice;
    });
  }
}

// Export for Node or Browser
if (typeof module !== 'undefined') {
  module.exports = SweetShop;
} else {
  window.SweetShop = SweetShop;
}