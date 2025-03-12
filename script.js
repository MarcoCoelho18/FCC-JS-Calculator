const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btns button');

let currentInput = '0'; // Start with "0" displayed
let operator = '';
let firstOperand = '';
let resultDisplayed = false; // Track if result is displayed

display.value = currentInput; // Ensure "0" is displayed on load

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            if (resultDisplayed) {
                currentInput = value;
                resultDisplayed = false;
            } else if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            display.value = currentInput; // Update display
        }

        if (button.classList.contains('operator')) {
            if (value === 'AC') {
                // Clear the calculator and reset display to "0"
                currentInput = '0';
                operator = '';
                firstOperand = '';
                display.value = currentInput;
            } else if (value === '=') {
                // Evaluate the expression
                if (operator && firstOperand !== '') {
                    const result = calculate(firstOperand, currentInput, operator);
                    display.value = result;
                    currentInput = result.toString(); // Store result for further calculations
                    operator = '';
                    firstOperand = '';
                    resultDisplayed = true;
                }
            } else if (value === '.') {
                // Handle decimal point
                if (!currentInput.includes('.')) {
                    currentInput += value;
                    display.value = currentInput;
                }
            } else {
                // Handle arithmetic operators (+, -, *, /)
                if (currentInput !== '') {
                    if (operator && !resultDisplayed) {
                        // Perform the previous operation immediately
                        const result = calculate(firstOperand, currentInput, operator);
                        display.value = result;
                        firstOperand = result.toString();
                        currentInput = '';
                    } else {
                        firstOperand = currentInput;
                        currentInput = '';
                    }
                    operator = value;
                    resultDisplayed = false;
                }
            }
        }
    });
});

// Function to perform calculations
function calculate(first, second, operator) {
    const num1 = parseFloat(first);
    const num2 = parseFloat(second);

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'X': // Handling multiplication as X
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Error'; // Prevent division by zero
        default:
            return 0;
    }
}