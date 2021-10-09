const numbers = document.querySelectorAll(".number"); 
const operation = document.querySelectorAll(".operation");
const input = document.querySelector(".calculator-input");
const previousExpression = document.querySelector(".last-expression-text");

let expressionOutput = "";
let result = ""; 

function clear() {
    previousExpression.value = ""; 
    expressionOutput = ""; 
    input.value = ""; 
}

function add(numberOne, numberTwo) {
    //console.log(expressionOutput);
   // console.log("IN ADD!");
    //console.log(numberOne + "|" + numberTwo);
    return +numberOne + +numberTwo; 
}

function subtract(numberOne, numberTwo) {
    //console.log(expressionOutput);
    return +numberOne - +numberTwo; 
}

function equal(expression) {

    let numOne = "";
    let numTwo = ""; 
    let ops = ""; 
    let nextNumber = false;
    let finalValue = 0; 

    for(let i = 0; i < expression.length; i++) {
        if ( expression.charAt(i) === "+" || expression.charAt(i) === "-" ) {
            ops = expression.charAt(i); 
            nextNumber = true; 
        } else if ( !nextNumber ) {
            numOne += expression.charAt(i); 
        } else if ( nextNumber ) {
            numTwo += expression.charAt(i); 
        }
    }

    if ( ops.localeCompare("+") === 0 ) {
        finalValue = add(+numOne, +numTwo); 
    } else if ( ops.localeCompare("-") === 0 ) {
        finalValue = subtract(+numOne, +numTwo); 
    }

    return finalValue.toString();
}

function checkExpression(operator, expression) {
    // Case 1: 1 + 2 
    // Case 2:   + 2 
    // Case 3: 2 + = 

    let numOne = "";
    let numTwo = ""; 
    let ops = operator; 
    let nextNumber = false;
    let fullExpression = false; 

    for(let i = 0; i < expression.length; i++) {
        if ( expression.charAt(i) === "+" || expression.charAt(i) === "-" ) {
            nextNumber = true; 
        } else if ( expression.charAt(i) === "=" ) {
            // Full expression, do nothing
            //console.log(previousExpression.value); 
            //return -2; 
            fullExpression = true; 
            break; 
        } else if ( !nextNumber ) {
            numOne += expression.charAt(i); 
        } else if ( nextNumber ) {
            numTwo += expression.charAt(i); 
        } 
    }

    console.log("In checkExpression()"); 
    console.log(`${numOne} ${operator} |${numTwo.charCodeAt(0)}|`);
    console.log(`${expression}`);

    if ( numOne.localeCompare("") !== 0 && numTwo.localeCompare("") === 0 ) { 
        // numOne has value, but numTwo is empty
        return 0; 
    } else if ( numOne.localeCompare("") === 0 && numTwo.localeCompare("") !== 0 ) {
        // numOne is empty, but numTwo has value
        return 2; 
    } else if ( numOne.localeCompare("") === 0 && numTwo.localeCompare("") === 0 ) {
        // Both are empty 
        return 3; 
    } else if ( numOne.localeCompare("") !== 0 && numTwo.localeCompare(" ") === 0 ) {
        // numOne has value, but numTwo is " ". The case: 0 + + 
        // Solution: Return -1 and do nothing
        //console.log("------" + expression);
        return -1; 
    } else if ( fullExpression ) { // Avoids NaN 
        return -2; 
    }

    return 1; // Both have values


}

function numberListeners() {
    for(let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function(num) {

            //let check = checkExpression()
            expressionOutput += num.target.textContent; 
            
            //console.log(expressionOutput); 
            input.value = expressionOutput; 
            //console.log(num.target.textContent); 
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
                    let resEqual = checkExpression("=", expressionOutput);
                    
                    
                    console.log("resEqual: " + resEqual); 
                    if ( resEqual === 1 ) {
                        result = equal(expressionOutput); 
                        expressionOutput += ` = ${result}`;
                        previousExpression.value = expressionOutput;
                        input.value = result; 
                        expressionOutput = `${result}`; 
                    }

                    break; 
                case "+": 
                    let resPlus = checkExpression("+", expressionOutput); 
                    console.log("resPlus: " + resPlus); 

                    if ( resPlus === 3 ) {
                        expressionOutput += `0 + `;
                        input.value = expressionOutput; 
                    } else if ( resPlus === 0 ) {
                        expressionOutput += ` + `;
                        input.value = expressionOutput;  
                    } else if ( resPlus === 1 ) { // Both values, continue adding
                        let check = checkExpression("+", expressionOutput); 
                        if ( check === 1 ) { // 2 values are typed and + is clicked
                            result = equal(expressionOutput); 
                            expressionOutput = `${result} + `; 
                            previousExpression.value = expressionOutput; 
                            input.value = expressionOutput;
                            expressionOutput = "";
                        }
                       // result = ""; 
                    } else if ( resPlus == -2 ) { // Just add the operator to continue the program
                        // Fixes the bug of NaN when pressing "=" button when there is already a result
                        expressionOutput = `${result} + `; 
                        input.value = expressionOutput; 
                    }

                    break; 
                case "-": 
                    let resMinus = checkExpression("-", expressionOutput); 

                    if ( resMinus === 3 ) {
                        expressionOutput += `0 - `;
                        input.value = expressionOutput; 
                    } else if ( resMinus === 0 ) {
                        expressionOutput += ` - `;
                        input.value = expressionOutput;  
                    } else if ( resMinus === 1 ) { // Both values, continue adding
                        let check = checkExpression("-", expressionOutput); 
                        if ( check === 1 ) { // 2 values are typed and + is clicked
                            result = equal(expressionOutput); 
                            expressionOutput = `${result} - `; 
                            previousExpression.value = expressionOutput; 
                            input.value = expressionOutput;
                        }
                       // result = ""; 
                    } else if ( resMinus == -2 ) { // Just add the operator to continue the program
                        // Fixes the bug of NaN when pressing "=" button when there is already a result
                        expressionOutput = `${result} - `; 
                        input.value = expressionOutput; 
                    }
                    
                    break; 
                default: 
                    console.log(`|${expressionOutput}|`);
                    expressionOutput = " " + num.target.textContent + " "; 
                    input.value = expressionOutput; 
                        //console.log(expressionOutput); 
                    //console.log(num.target.textContent); 

            }

            
        });
    }
}
// [1, +, 7]
//console.log(input); 


//console.log(numbers); 
//console.log(operation); 

numberListeners(); 
operationListeners(); 