/**
 * @description Unit tests for SweetShop Management System
 * 
 * This test suite was generated with the assistance of AI (ChatGPT by OpenAI)
 * as part of a learning and development exercise to demonstrate
 * Test-Driven Development (TDD) for a simple inventory system.
 *
 * These tests validate the core logic such as adding, deleting,
 * purchasing, restocking, searching, and sorting sweets.
 * 
 * Author: Jay Chauhan
 * Created: 16 July 2025
 */

const { expect } = require("chai");
const SweetShop = require("../src/sweetShop");

describe("SweetShop Management System", () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
  });

  it("should add a sweet", () => {
    const sweet = shop.addSweet("Gulab Jamun", "Milk-Based", 10, 50);
    expect(sweet).to.include({ name: "Gulab Jamun", category: "Milk-Based", price: 10, quantity: 50 });
  });
});