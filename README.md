# Quest

Quest is a command-line program that takes operations on fractions as input and produces a fractional result. It allows users to perform addition, subtraction, multiplication, and division operations on fractions, including mixed numbers and negative numbers.

## Installation

To install Quest, you need to have Node.js and npm (Node Package Manager) installed on your machine. Then, you can run the following command to install the required dependencies:

```
npm install
```

## Usage

To use Quest, you can run the following command in your terminal:

```
npm start
```

The program will then prompt you to enter operations on fractions. The supported operations are `*, /, +, -` for multiplication, division, addition, and subtraction, respectively. Operands and operators must be separated by one or more spaces.

Example input format:

```
1/2 * 3&3/4
```

Example output format:

```
= 1&7/8
```

The program will continue to prompt for input until you type `exit`.

## Tests

To run the test cases for Quest, you can use the following command:

```
npm test
```

This will execute the test cases using Mocha and Chai.

## Dependencies

Quest uses the following dependencies:

- `chai`: ^4.3.7

## License

Quest is licensed under the ISC License. You can find the full license in the LICENSE file.

## Author

Praveen
