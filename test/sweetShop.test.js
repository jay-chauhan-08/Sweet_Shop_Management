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

// const { expect } = require("chai");
const SweetShop = require("../src/sweetShop");

describe("SweetShop Management System", () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
  });

  it("should add a sweet", () => {
    const sweet = shop.addSweet("Gulab Jamun", "Milk-Based", 10, 50);
    expect(sweet).toMatchObject({ name: "Gulab Jamun", category: "Milk-Based", price: 10, quantity: 50 });
  });

  it("should delete a sweet by ID", () => {
    const sweet = shop.addSweet("Kaju katli", "Nut-based", 50, 20);
    const deleted = shop.deleteSweet(sweet.id);
    expect(deleted).toBe.true;
  });

  it("should return all sweets", () => {
    shop.addSweet("Ladoo", "Nut-Based", 25, 30);
    shop.addSweet("Barfi", "Milk-Based", 35, 25);
    const sweets = shop.getAllSweets();
     expect(sweets).toHaveLength(2)
  });

  it("should search sweets by category", () => {
    shop.addSweet("Kaju Katli", "Nut-Based", 50, 20);
    shop.addSweet("Gulab Jamun", "Milk-Based", 10, 50);
    const results = shop.searchSweets({ category: "Milk-Based" });
    expect(results[0].name).toEqual("Gulab Jamun");
  });

  it("should sort sweets by price descending", () => {
    shop.addSweet("Barfi", "Milk-Based", 30, 20);
    shop.addSweet("Kaju Katli", "Nut-Based", 50, 20);
    const sorted = shop.sortSweets("price", "desc");
    expect(sorted[0].price).toEqual(50);
  });

   it("should purchase sweet if stock available", () => {
    const sweet = shop.addSweet("Gajar Halwa", "Vegetable-Based", 30, 15);
    const success = shop.purchaseSweet(sweet.id, 5);
    expect(success).toBe.true;
    expect(sweet.quantity).toEqual(10);
  });

   it("should not purchase sweet if stock is insufficient", () => {
    const sweet = shop.addSweet("Rasgulla", "Milk-Based", 25, 2);
    const success = shop.purchaseSweet(sweet.id, 5);
    expect(success).toBe.false;
  });
});