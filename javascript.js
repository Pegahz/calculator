let number1 = 0, number2, operator;
let displayValue = 0;
let operationFlag = false, number2Flag = false, equalsFlag = false, dividedByZeroFlag = false;
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('.numbers');
const symbols = document.querySelectorAll('.symbols');
const equals = document.querySelectorAll('.equals');
const clc = document.querySelectorAll('.clear');
display.textContent = displayValue; 

numbers.forEach(number => number.addEventListener('click', e => {
    number2Flag = checkFlag2Clear(number2Flag);
    equalsFlag = checkFlag2Clear(equalsFlag);
    dividedByZeroFlag = checkFlag2Clear(dividedByZeroFlag);
    if(displayValue == 0  ) display.textContent = '';
    displayValue = `${display.textContent}` + e.target.id;
    display.textContent = displayValue;
    if (operationFlag) {
        number2 = displayValue;
    } else {
        number1 = displayValue;
    }
}));

symbols.forEach(symbol => symbol.addEventListener('click', e => {
    if (operationFlag) {
        number1 = operate(number1, number2, operator);
        ifDividedByZero();
    }
    operator = e.target.id;
    operationFlag = true;
    number2Flag = true;
}));

equals.forEach(symbol => symbol.addEventListener('click', e => {
    equalsFlag = true;
    operate(number1, number2, operator);
    if(dividedByZeroFlag) {
        ifDividedByZero();
    } else if(operationFlag && !number2Flag) {
        number1 = operate(number1, number2, operator);
        operator = '';
        displayValue = number1;
        display.textContent = displayValue;
    } else {
        displayValue = number1;
        display.textContent = displayValue;
    }
}));

clc.forEach(symbol => symbol.addEventListener('click', e => {
    restart();
}));

function operate(number1, number2, operator) {
    switch(operator) {
        case '+':
            return add(number1, number2);
        case '-':
            return subtract(number1, number2);
        case '*': 
            return multiply(number1, number2);
        case '/':
            return divide(number1, number2);
        default:
            return number1;
    }
}

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b)
}

function divide(a, b) {
    dividedByZeroFlag = (number2 == 0) ? true : false;
    return Number(a) / Number(b);
}

function restart() {
    equalsFlag = false;
    operationFlag = false;
    number2Flag = false;
    number1 = 0;
    number2 = 0;
    operator = '';
    display.textContent = number1;
}

function ifDividedByZero() {//edit it.
    if(dividedByZeroFlag) {
            restart();
            displayValue = 'Divide by ZERO?';
            display.textContent = displayValue;
    } else {
            displayValue = number1;
            display.textContent = displayValue;
            operationFlag = false;
    }
}

function checkFlag2Clear(flag) {
    if (flag) {
        display.textContent = '';
        return false;
    }
}