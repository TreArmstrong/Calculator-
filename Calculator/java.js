// Variables to store calculator values
let currentInput = '';
// Set it to an empty string '' initializes the current input to be empty at the start of the calculator operation before any user input.
let firstOperand = null;
// Set to null so computer can identify if the first number has been set yet : It remains null until a number is entered as the first operand. 
let operator = null;
let waitingForSecondOperand = false;
// I set it to false, it indicates that the calculator is not waiting for the second operand initially. It changes to true after an operator(ex + or -) is selected to signal that the next input should be the second operand.

// Function to update the calculator screen
function updateDisplay() {
    const display = document.getElementById('display');
    display.value = currentInput;
}

// Function to handle number and decimal input
function inputDigit(digit) {
    if (waitingForSecondOperand) {
        currentInput = digit;
        waitingForSecondOperand = false;
    } else {
        currentInput += digit;
    }
    updateDisplay();
}

// Function to handle operator input and trigger calculation
function inputOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);
  // Checking to see if there is a second operator if not computer needs to wait
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }
  // Handles setting the first operand and performing the calculation once there are two operands and an operator selected.
    if (firstOperand === null) {
        firstOperand = inputValue;
        //If the first operand is already set and an operator is chosen, it proceeds to calculate the result using the performCalculation() 
    } else if (operator) {
        const result = performCalculation();
        currentInput = String(result);
        firstOperand = result;
        updateDisplay();
    }
  
    waitingForSecondOperand = true;
    operator = nextOperator;
}

// Function to perform the calculation
function performCalculation() {
    const inputValue = parseFloat(currentInput);
    // parse float coverts from string to number to be calculated when
    let result = 0;
    
    if (operator === '/' && inputValue === 0) {
        // Handle division by zero
        // For example, display an error message or prevent the operation
        return 'Error: Division by zero';
    }
    
    switch (operator) {
        case '+':
            result = firstOperand + inputValue;
            break;
        case '-':
            result = firstOperand - inputValue;
            break;
        case 'x':
            result = firstOperand * inputValue;
            break;
        case '/':
            result = firstOperand / inputValue;
            break;
    }
    
    return result;
}

// function toggleSign() {
//     if (currentInput !== '' && currentInput !== '0') {
//         currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : `-${currentInput}`;
//         updateDisplay();
//     }
// }





// Function to clear the calculator
function clearCalculator() {
    currentInput = '';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

// Event listeners for button clicks
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        inputDigit(button.textContent);
    });
});

document.querySelectorAll('.arithemticOperators').forEach(button => {
    button.addEventListener('click', () => {
        inputOperator(button.textContent);
    });
});

document.getElementById('clear').addEventListener('click', clearCalculator);
document.querySelector('.decimal').addEventListener('click', () => {
    inputDigit('.');
});

// document.querySelector('.integer').addEventListener('click', toggleSign);

document.addEventListener("keydown", function(event) {
    const key = event.key;

    // Handle numeric key input
    if (/[0-9]/.test(key)) {
        inputDigit(key);
    } else if (key === "/" || key === "x" || key === "-" || key === "+") {
        inputOperator(key);
    } else if (key === "=" || key === "Enter") {
        event.preventDefault(); // Prevent form submission on Enter key
        performCalculation();
    } else if (key === "c" || key === "C") {
        clearCalculator();
    } else if (key === ".") {
        inputDigit(".");
    }
    console.log("Key Pressed: " + key); // Debugging output for key presses
});
// Output to check if calculate is defined
console.log("Checking if calculate is defined: ", typeof performCalculation);







// Update the display initially
updateDisplay();
