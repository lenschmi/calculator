
//Define mathematical functions
function add(a, b){return +a + +b};

function subtract(a, b){return +a - +b};

function multiply(a, b){return +a * +b};

function divide(a, b){return +a/+b};

function operate(op, a, b){
    switch(op){
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return NaN;
    }
}

//Variables to hold the input string to be operated on and the output after an operation
let result = "";
let inputOne = "";
let inputTwo = "";
let operandOne = "";
let operandTwo = "";

const screenInput = document.querySelector("div#screen");

function runComputation(){
    result = operate(operandOne, inputOne, inputTwo);
    screenInput.textContent = result;
    if (operandTwo === "="){
        operandOne = "";
    } else{
        operandOne = operandTwo;
    }
    operandTwo = "";
    inputOne = "";
    inputTwo = "";
}

//Set-up event listeners for numerical buttons
const numButtons = document.querySelectorAll("button.num-button");
numButtons.forEach(button => button.addEventListener("click", getNumber));
function getNumber(e){
    let num = e.target.id;
    if (operandOne === ""){
        inputOne+=num;
        screenInput.textContent = inputOne;
    } else{
        if (inputOne === "") {inputOne = result};
        inputTwo+=num;
        screenInput.textContent = inputTwo;
    }
}

//Set-up event listener for decimal point button
const decButton = document.querySelector("button#decimal");
decButton.addEventListener("click", addDecimalPoint);
function addDecimalPoint(e){
    if (operandOne === ""){
        if (!inputOne.includes(".")){
            inputOne+=".";
            screenInput.textContent = inputOne;
        } 
    } else{
        if (!inputTwo.includes(".")){
            inputTwo+=".";
            screenInput.textContent = inputTwo;
        }  
    }
}


//Set-up event listener for negative symbol button
const negButton = document.querySelector("button#neg");
negButton.addEventListener("click", makeNegative);
function makeNegative(e){
    if (operandOne === ""){
        if (inputOne === "" && result !== ""){
            inputOne = result;
            inputOne = inputOne*-1 + "";
            screenInput.textContent = inputOne;
        } else if (inputOne != ""){
            inputOne = inputOne*-1 + "";
            screenInput.textContent = inputOne;
        }
    } else if (inputTwo !== ""){
        inputTwo = inputTwo*-1 + "";
        screenInput.textContent = inputTwo;
    }
}

//Set-up event listener for operation buttons
const opButtons = document.querySelectorAll("button.op-button");
opButtons.forEach(button => button.addEventListener("click", getOperation));
function getOperation(e){
    let op = e.target.id;
    let currOp = "";
    switch(op){
        case "add":
            currOp = "+";
            break;
        case "subtract":
            currOp = "-";
            break;
        case "multiply":
            currOp = "*";
            break;
        case "divide":
            currOp = "/";
            break;
        default:
            break;
    }
    if ((inputOne !== "" || result != "") && operandOne === ""){
        operandOne = currOp;
        if (inputOne === ""){
            inputOne = result;
            result = "";
        }
    } else if(inputOne !== "" && operandOne !== "" && inputTwo !== ""){
        operandTwo = currOp;
    }

    if (operandTwo !== ""){
        runComputation();
    }

}

//Set-up event listener for back-space button
const backButton = document.querySelector("button#undo");
backButton.addEventListener("click", undoEntry);
function undoEntry(e){

}

//Set-up event listener for equals button
const equalsButton = document.querySelector("button#equals");
equalsButton.addEventListener("click", runOperation);
function runOperation(e){
    if (operandOne !== "" && inputOne !== "" && inputTwo !== ""){
        operandTwo = "=";
        runComputation();
    }
}

//Set-up event listener for clear button
const clearButton = document.querySelector("button#clear");
clearButton.addEventListener("click", clearScreen);
function clearScreen(e){
    result = "";
    inputOne = "";
    inputTwo = "";
    operandOne = "";
    operandTwo = "";

    screenInput.textContent = "0";
}

//Set-up keyboard event listeners
//(+/-)  and Cl the only button do not have keyboard support


//TODO:
//Deal with long numbers so that they don't overflow the screen - can't go over 16 characters
//Undo button not implemented
//Keyboard support
