let number1 = 0, number2, operator;
let displayValue = 0;
let operationFlag = false, number2Flag = false, equalsFlag = false, dividedByZeroFlag = false;
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('.numbers');
const symbols = document.querySelectorAll('.symbols');
const equals = document.querySelectorAll('.equals');
const clc = document.querySelectorAll('.clear');
const dot = document.querySelectorAll('.dot');
display.textContent = displayValue; 
dot.disabled = true;

numbers.forEach(number => number.addEventListener('click', e => {
    number2Flag = resetFlag(number2Flag);
    equalsFlag = resetFlag(equalsFlag);
    dividedByZeroFlag = resetFlag(dividedByZeroFlag);
    if(displayValue == 0  ) display.textContent = '';
    if(displayValue === '0.') {
        number1 = displayValue;
        display.textContent = '0.';
    }
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
    dot.disabled = true;
}));

equals.forEach(symbol => symbol.addEventListener('click', e => {
    dot.disabled = true;
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

dot.forEach(symbol => symbol.addEventListener('click', () => {
    if(dot.disabled) {
        displayValue = displayValue + '.';
        display.textContent = displayValue;
        dot.disabled = false;
    }
    if(equalsFlag) {
        displayValue = '0.';
        display.textContent = displayValue;
        dot.disabled = false;
    }
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
    return parseFloat((Number(a) + Number(b)).toFixed(3));
}

function subtract(a, b) {
    return parseFloat((Number(a) - Number(b)).toFixed(3));
}

function multiply(a, b) {
    return parseFloat((Number(a) * Number(b)).toFixed(3));
}

function divide(a, b) {
    dividedByZeroFlag = (number2 == 0) ? true : false;
    return parseFloat((Number(a) / Number(b)).toFixed(3));
}

function restart() {
    equalsFlag = false;
    operationFlag = false;
    number2Flag = false;
    dividedByZeroFlag = false;
    dot.disabled = true;
    number1 = 0;
    number2 = 0;
    operator = '';
    displayValue = 0;
    display.textContent = 0;
}

function ifDividedByZero() {
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

function resetFlag(flag) {
    if (flag) {
        display.textContent = '';
        return false;
    }
}