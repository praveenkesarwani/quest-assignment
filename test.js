const chai = require("chai");
const should = chai.should();
const { calculateFraction } = require("./index");

describe("calculateFraction", () => {
  it("should calculate addition correctly", () => {
    const result = calculateFraction("1/2 + 3&3/4");
    result.should.equal("= 4&1/4");
  });

  it("should calculate subtraction correctly", () => {
    const result = calculateFraction("2&3/8 - 9/8");
    result.should.equal("= 1&1/4");
  });

  it("should calculate multiplication correctly", () => {
    const result = calculateFraction("1/2 * 3&3/4");
    result.should.equal("= 1&7/8");
  });

  it("should calculate division correctly", () => {
    const result = calculateFraction("1&3/4 / 2");
    result.should.equal("= 7/8");
  });

  it("should calculate multiplication correctly with whole number result", () => {
    const result = calculateFraction("1/2 * 2");
    result.should.equal("= 1");
  });

  it("should calculate division correctly with whole number result", () => {
    const result = calculateFraction("3/4 / 3/4");
    result.should.equal("= 1");
  });

  it("should handle multiple spaces in input", () => {
    const result = calculateFraction("1/2   *     3&3/4");
    result.should.equal("= 1&7/8");
  });

  it("should handle invalid input commands", () => {
    const result = calculateFraction("2* 3");
    result.should.equal("Error: Invald Input, Operands and operators shall be separated by one or more spaces.");
  });

  it("should handle negative fractions", () => {
    const result = calculateFraction("-1/2 + -3/4");
    result.should.equal("= -1&1/4");
  });

  it("should handle zero numerator", () => {
    const result = calculateFraction("0 * 2&3/4");
    result.should.equal("= 0");
  });

  it("should handle zero denominator", () => {
    const result = calculateFraction("1&3/4 / 0");
    result.should.equal("Error: Cannot divide by zero");
  });

  it("should handle zero denominator input", () => {
    const result = calculateFraction("1&3/4 + 2/0");
    result.should.equal("Error: Denominator cannot be zero");
  });

  it("should handle invalid mixed fraction input", () => {
    const result = calculateFraction("1&&3/4 + 2");
    result.should.equal("Error: Invalid mixed fraction format");
  });

  it("should handle invalid improper fraction / whole input", () => {
    const result = calculateFraction("1&3/4 + 2//2");
    result.should.equal("Error: Invalid improper fraction format");
  });
});
