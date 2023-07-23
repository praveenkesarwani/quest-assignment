const readline = require("readline");

// Function to parse a mixed fraction string into an object
function parseMixedFraction(mixedFractionStr) {
  const regex = /^(-?\d+)&(\d+)\/(\d+)$/;
  const match = mixedFractionStr.match(regex);

  if (!match) {
    throw new Error("Invalid mixed fraction format");
  }

  const whole = parseInt(match[1]);
  const numerator = parseInt(match[2]);
  const denominator = parseInt(match[3]);

  if (denominator === 0) {
    throw new Error("Denominator cannot be zero");
  }

  return { whole, numerator, denominator };
}

// Function to parse an improper fraction string into an object
function parseImproperFraction(improperFractionStr) {
  const parts = improperFractionStr.split("/");
  if (parts.length === 2) {
    const numerator = parseInt(parts[0]);
    const denominator = parseInt(parts[1]);

    if (denominator === 0) {
      throw new Error("Denominator cannot be zero");
    }
    return { whole: 0, numerator, denominator };
  } else if (parts.length === 1) {
    // The fraction is a whole number
    return { whole: 0, numerator: parseInt(parts[0]), denominator: 1 };
  } else {
    throw new Error("Invalid improper fraction format");
  }
}

// Function to parse any valid fraction string into an object
function parseFraction(fractionStr) {
  if (fractionStr.includes("&")) {
    return parseMixedFraction(fractionStr);
  } else {
    return parseImproperFraction(fractionStr);
  }
}

// Function to convert a fraction object into a mixed fraction string
function toMixedFractionString(fraction) {
  const { whole, numerator, denominator } = fraction;
  const negativesCount = [whole, numerator, denominator].filter((num) => num < 0).length;
  const isNegative = negativesCount % 2 !== 0;
  if (numerator == 0) return whole;
  if (whole === 0) return `${isNegative ? "-" : ""}${Math.abs(numerator)}/${Math.abs(denominator)}`;

  // Add the negative sign if it's a negative fraction
  return `${isNegative ? "-" : ""}${whole}&${Math.abs(numerator)}/${Math.abs(denominator)}`;
}

// Function to add two fractions
function addFractions(fraction1, fraction2) {
  const numerator1 = fraction1.whole * fraction1.denominator + fraction1.numerator;
  const numerator2 = fraction2.whole * fraction2.denominator + fraction2.numerator;
  const numeratorSum = numerator1 * fraction2.denominator + numerator2 * fraction1.denominator;
  const denominatorSum = fraction1.denominator * fraction2.denominator;

  return simplifyFraction({ whole: 0, numerator: numeratorSum, denominator: denominatorSum });
}

// Function to subtract two fractions
function subtractFractions(fraction1, fraction2) {
  const numerator1 = fraction1.whole * fraction1.denominator + fraction1.numerator;
  const numerator2 = fraction2.whole * fraction2.denominator + fraction2.numerator;
  const numeratorDiff = numerator1 * fraction2.denominator - numerator2 * fraction1.denominator;
  const denominatorDiff = fraction1.denominator * fraction2.denominator;

  return simplifyFraction({ whole: 0, numerator: numeratorDiff, denominator: denominatorDiff });
}

// Function to multiply two fractions
function multiplyFractions(fraction1, fraction2) {
  const numeratorProduct = (fraction1.whole * fraction1.denominator + fraction1.numerator) * (fraction2.whole * fraction2.denominator + fraction2.numerator);
  const denominatorProduct = fraction1.denominator * fraction2.denominator;

  return simplifyFraction({ whole: 0, numerator: numeratorProduct, denominator: denominatorProduct });
}

// Function to divide two fractions
function divideFractions(fraction1, fraction2) {
  if (fraction2.numerator === 0) {
    throw new Error("Cannot divide by zero");
  }

  const numeratorDividend = fraction1.whole * fraction1.denominator + fraction1.numerator;
  const numeratorQuotient = numeratorDividend * fraction2.denominator;
  const denominatorQuotient = fraction1.denominator * (fraction2.whole * fraction2.denominator + fraction2.numerator);

  return simplifyFraction({ whole: 0, numerator: numeratorQuotient, denominator: denominatorQuotient });
}

// Function to simplify a fraction
function simplifyFraction(fraction) {
  const gcd = greatestCommonDivisor(fraction.numerator, fraction.denominator);
  const simplifiedNumerator = fraction.numerator / gcd;
  const simplifiedDenominator = fraction.denominator / gcd;

  const whole = Math.floor(Math.abs(simplifiedNumerator) / Math.abs(simplifiedDenominator));
  const numerator = simplifiedNumerator % simplifiedDenominator;

  return { whole, numerator, denominator: simplifiedDenominator };
}

// Function to calculate greatest common divisor using Euclidean algorithm
function greatestCommonDivisor(a, b) {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
}

// Function to perform an arithmetic operation on two fractions
function performOperation(operator, fraction1, fraction2) {
  switch (operator) {
    case "+":
      return addFractions(fraction1, fraction2);
    case "-":
      return subtractFractions(fraction1, fraction2);
    case "*":
      return multiplyFractions(fraction1, fraction2);
    case "/":
      return divideFractions(fraction1, fraction2);
    default:
      throw new Error("Invalid operator");
  }
}

// Function to parse input and calculate
function calculateFraction(input) {
  const regex = /\s+/; // Regular expression to match one or more spaces
  try {
    if (input.split(regex).length < 3) throw new Error("Invald Input, Operands and operators shall be separated by one or more spaces.");
    const [operand1, operator, operand2] = input.split(regex);
    const fraction1 = parseFraction(operand1);
    const fraction2 = parseFraction(operand2);

    const result = performOperation(operator, fraction1, fraction2);
    const resultStr = toMixedFractionString(result);
    return "= " + resultStr;
  } catch (error) {
    return "Error: " + error.message;
  }
}

// Function to start the interactive command-line interface
function startCLI() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.setPrompt("? ");
  rl.prompt();

  rl.on("line", (input) => {
    if (input.toLowerCase().trim() === "exit") {
      rl.close();
      return;
    }

    const result = calculateFraction(input);
    console.log(result);

    rl.prompt();
  });

  rl.on("close", () => {
    console.log("Exiting...");
    process.exit(0);
  });
}

// Start the command-line interface
startCLI();

// Export function for testing
module.exports = {
  calculateFraction,
};
