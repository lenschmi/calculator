
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
    //The calculator will allow you to enter numbers greater than Number.MAX_SAFE_INTEGER, but will not operate on them
    //Setting the max number here to allow for older browsers that do not support Number.MAX_SAFE_INTEGER
    const MAX_NUMBER = 9007199254740991;

    //If either inputOne or inputTwo is outside of the allowed range display NaN and clear all inputs, operands and result
    if (Math.abs(inputOne) > MAX_NUMBER || Math.abs(inputTwo) > MAX_NUMBER){
        screenInput.textContent = "NaN";
        inputOne = "";
        inputTwo = "";
        operandOne = "";
        operandTwo = "";
        result = "";
    } else{
        //Calculate the result and display NaN if it is too large
        result = operate(operandOne, inputOne, inputTwo);
        if (Math.abs(result) > MAX_NUMBER){
            screenInput.textContent = "NaN";
            inputOne = "";
            inputTwo = "";
            operandOne = "";
            operandTwo = "";
            result = "";
            return;
        }

        //Display the result in 16 or less characters
        let intResult = Math.trunc(result);
        let intResultLength = intResult.toString().length;
        if(intResultLength >= 15 || intResult === result){
            screenInput.textContent = intResult;
        } else{
            let numDecimals = 15-intResultLength;
            screenInput.textContent = parseFloat(result.toFixed(numDecimals));
        }

        //Update operand and input
        if (operandTwo === "="){
            operandOne = "";
            inputOne = "";
        } else{
            operandOne = operandTwo;
            inputOne = result;
        }
        operandTwo = "";
        inputTwo = "";
    }
}

//Set-up event listeners for numerical buttons
const numButtons = document.querySelectorAll("button.num-button");
numButtons.forEach(button => button.addEventListener("click", getNumber));
function getNumber(e){
    //The calculator will not let you enter a number that is more than 16 digits
    let num = e.target.id;
    if (operandOne === ""){
        if (inputOne.length <= 15){
            inputOne+=num;
            screenInput.textContent = inputOne;
        }
    } else{
        if (inputOne === "") {inputOne = result};
        if (inputTwo.length <= 15){
            inputTwo+=num;
            screenInput.textContent = inputTwo;
        }
    }
}

//Set-up event listener for decimal point button
const decButton = document.querySelector("button#decimal");
decButton.addEventListener("click", addDecimalPoint);
function addDecimalPoint(e){
    if (operandOne === ""){
        if (!inputOne.includes(".") && inputOne.length <= 15){
            inputOne+=".";
            screenInput.textContent = inputOne;
        } 
    } else{
        if (!inputTwo.includes(".") && inputTwo.length <= 15){
            inputTwo+=".";
            screenInput.textContent = inputTwo;
        }  
    }
}


//Set-up event listener for negative symbol button
const negButton = document.querySelector("button#neg");
negButton.addEventListener("click", makeNegative);
function makeNegative(e){
    if (operandOne === "" && inputOne != ""){
        inputOne = inputOne*-1 + "";
        screenInput.textContent = inputOne;
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
    //Cannot undo after an operation has been completed.
    //Cannot undo a clear

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
//(+/-)  and Cl buttons do not have keyboard support
window.addEventListener("keydown", function(e){
    const key = document.querySelector(`button[data-key="${e.key}"]`);
    if (!key) return;
    console.log(key.textContent);
    key.click();
});


//TODO:
//Undo button not implemented
