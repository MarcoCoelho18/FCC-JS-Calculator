
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btns button');

let currentInput = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            currentInput += value;
            display.value = currentInput;
        }

        if (button.classList.contains('operator')) {
            if (value === 'AC') {
                // Clear the calculator
                currentInput = '';
                operator = '';
                firstOperand = '';
                secondOperand = '';
                display.value = '';
            } else if (value === '=') {
                // Evaluate the expression
                if (operator && firstOperand && currentInput) {
                    secondOperand = currentInput;
                    const result = calculate(firstOperand, secondOperand, operator);
                    display.value = result;
                    currentInput = result;
                    operator = '';
                    firstOperand = '';
                    secondOperand = '';
                }
            } else if (value === '.') {
                // Handle decimal point
                if (!currentInput.includes('.')) {
                    currentInput += value;
                    display.value = currentInput;
                }
            } else {
                // Handle arithmetic operators (+, -, *, /)
                if (currentInput) {
                    operator = value;
                    firstOperand = currentInput;
                    currentInput = '';
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
        case 'X':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return 0;
    }
}