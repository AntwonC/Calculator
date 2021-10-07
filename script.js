const numbers = document.querySelectorAll(".number"); 
const operation = document.querySelectorAll(".operation");
const input = document.querySelector(".calculator-input");
const previousExpression = document.querySelector(".last-expression-text");

let expressionOutput = "";
let result = 0; 

function clear() {
    previousExpression.value = ""; 
    expressionOutput = ""; 
    input.value = ""; 
}

function add(numberOne, numberTwo) {
    //console.log(expressionOutput);
    return +numberOne + +numberTwo; 
}

function subtract(numberOne, numberTwo) {
    //console.log(expressionOutput);
    return +numberOne - +numberTwo; 
}


function equal() {
    let numOne = ""; 
    let numTwo = ""; 
    let ops = ""; 
    let nextNumber = false;
    let finalValue = 0; 
    // 10 + 1
    for(let i = 0; i < expressionOutput.length; i++) {
        if ( expressionOutput.charAt(i) === '+' || expressionOutput.charAt(i) === '-' ) {
            ops = expressionOutput.charAt(i); 
            nextNumber = true; 
        } else if ( !nextNumber ) {
            numOne += expressionOutput.charAt(i); 
        } else if ( nextNumber ) {
            numTwo += expressionOutput.charAt(i); 
        } 
    }

    console.log("|" + ops + "|"); 
    if ( ops.localeCompare("+") === 0 ) {
        finalValue = add(+numOne, +numTwo); 
    } else if ( ops.localeCompare("-") === 0 ) {
        finalValue = subtract(+numOne, +numTwo); 
    }

    console.log(numOne + " " + numTwo); 

    previousExpression.value = expressionOutput; 
    input.value = finalValue.toString(); 
    expressionOutput = ""; 

    return;
    //return finalValue; 
   // console.log(expressionOutput); 
}

function numberListeners() {
    for(let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function(num) {
            expressionOutput += num.target.textContent; 
            //console.log(expressionOutput); 
            input.value = expressionOutput; 
            console.log(num.target.textContent); 
        });
    }
}

function operationListeners() {
    for(let i = 0; i < operation.length; i++) {
        operation[i].addEventListener("click", function(num) {

            switch(num.target.textContent) {
                case "Clear": 
                    clear(); 
                    break; 
                case "=": 
                    equal(); 
                    break;
                case "-": 
                    expressionOutput += `0 ${num.target.textContent} `; 
                    input.value = `${expressionOutput}`; 
                    console.log("case -: " + expressionOutput); 
                    break;
                default: 
                    expressionOutput += " " + num.target.textContent + " "; 
                    input.value = expressionOutput; 
                        //console.log(expressionOutput); 
                    console.log(num.target.textContent); 

            }

            
        });
    }
}
// [1, +, 7]
console.log(input); 


console.log(numbers); 
console.log(operation); 

numberListeners(); 
operationListeners(); 