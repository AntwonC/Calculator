// Getting the elements globally
const numbers = document.querySelectorAll(".number"); 
const operation = document.querySelectorAll(".operation");
const input = document.querySelector(".calculator-input");
const previousExpression = document.querySelector(".last-expression-text");
const decimalButton = document.querySelector("#decimal"); 

let expressionOutput = "";
let result = ""; 

function clear() {
    previousExpression.value = ""; 
    expressionOutput = ""; 
    input.value = ""; 
}

function deleteButton() {
    previousExpression.value = expressionOutput; 
    
    if ( input.value.length == 2 ) {
        input.value = expressionOutput.substring(0, 1); 
    } else if ( input.value.length <= 1) {
        input.value = "";
    } else {
        //console.log(expressionOutput.substring(0, expressionOutput.length-1));
        input.value = expressionOutput.substring(0, input.value.length-1);
    } 
    
}

function add(numberOne, numberTwo) {
    return +numberOne + +numberTwo; 
}

function subtract(numberOne, numberTwo) {
    return +numberOne - +numberTwo; 
}

function multiply(numberOne, numberTwo) {
    return (+numberOne) * (+numberTwo); 
}

function divide(numberOne, numberTwo) {
    if ( numberTwo === 0 ) {
        return "Why are you dividing by 0?"; 
    }
    return (+numberOne) / (+numberTwo); 
}

function equal(expression) {

    let numOne = "";
    let numTwo = ""; 
    let ops = ""; 
    let nextNumber = false;
    let finalValue = 0; 
    let isNegative = false; 
    let operatorCounter = 0; 
    let noSpaceExpression = expression.replace(/\s/g, ""); 

    if ( noSpaceExpression.charAt(0) === "-" ) {
        isNegative = true; 
    }

    for(let i = 0; i < noSpaceExpression.length; i++) {
        if ( isNegative ) {
            numOne += noSpaceExpression.charAt(i); 
            isNegative = false; 
        } else if ( noSpaceExpression.charAt(i) === "+" || noSpaceExpression.charAt(i) === "-" || noSpaceExpression.charAt(i) === "*" || noSpaceExpression.charAt(i) === "/") {
            ops = noSpaceExpression.charAt(i); 
            nextNumber = true; 
        } else if ( !nextNumber ) {
            numOne += noSpaceExpression.charAt(i); 
        } else if ( nextNumber ) {
            numTwo += noSpaceExpression.charAt(i); 
        }
    }


    if ( ops.localeCompare("+") === 0 ) {
        finalValue = add(numOne, numTwo); 
    } else if ( ops.localeCompare("-") === 0 ) {
        finalValue = subtract(+numOne, +numTwo); 
    } else if ( ops.localeCompare("*") === 0 ) {
        finalValue = multiply(+numOne, +numTwo); 
    } else if ( ops.localeCompare("/") === 0 ) {
        finalValue = divide(+numOne, +numTwo); 
    }

    return finalValue.toString();
}

function checkExpression(expression) {

    let numOne = "";
    let numTwo = ""; 
    let ops = ""; 
    let nextNumber = false;
    let fullExpression = false; 
    let isNegative = false;
    let operatorPresent = false; 
    let decimalExists = false; 
    let operatorIndex = 0; 
    let noWhiteSpaceExpression = expression.replace(/\s/g, ""); 

    if ( noWhiteSpaceExpression.charAt(0) === "-" ) {
        isNegative = true; 
    }


    for(let i = 0; i < noWhiteSpaceExpression.length; i++) {
        if ( noWhiteSpaceExpression.charAt(i) === "." ) {
            decimalExists = true; 
        } else if ( isNegative ) {
            isNegative = false;
            numOne += noWhiteSpaceExpression.charAt(i); 
        } 
         else if ( noWhiteSpaceExpression.charAt(i) === "+" || noWhiteSpaceExpression.charAt(i) === "-" || noWhiteSpaceExpression.charAt(i) === "*" || noWhiteSpaceExpression.charAt(i) === "/" ) {
            ops += noWhiteSpaceExpression.charAt(i);
            operatorIndex = i+1; 
            nextNumber = true; 
        } else if ( noWhiteSpaceExpression.charAt(i) === "=" ) {
            fullExpression = true; 
            break; 
        } else if ( !nextNumber ) {
            numOne += noWhiteSpaceExpression.charAt(i); 
        } else if ( nextNumber ) {
            numTwo += noWhiteSpaceExpression.charAt(i); 
        }
    }

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
        return -1; 
    } else if ( fullExpression ) { // Avoids NaN 
        return -2; 
    } 

    return 1; // Both have values


}

function checkDecimal(expression) {

    let numOne = "";
    let numTwo = ""; 
    let ops = ""; 
    let nextNumber = false;
    let fullExpression = false; 
    let isNegative = false;

    let opExists = false; 

    let noWhiteSpaceExpression = expression.replace(/\s/g, ""); 

    for(let i = 0; i < noWhiteSpaceExpression.length; i++) {
          if ( isNegative ) {
              isNegative = false;
              numOne += noWhiteSpaceExpression.charAt(i); 
          } else if ( noWhiteSpaceExpression.charAt(i) === "+" || noWhiteSpaceExpression.charAt(i) === "-" || noWhiteSpaceExpression.charAt(i) === "*" || noWhiteSpaceExpression.charAt(i) === "/" ) {
              ops += noWhiteSpaceExpression.charAt(i);
              opExists = true; 
              nextNumber = true; 
          } else if ( noWhiteSpaceExpression.charAt(i) === "=" ) {
              fullExpression = true; 
              break; 
          } else if ( !nextNumber ) {
              numOne += noWhiteSpaceExpression.charAt(i); 
          } else if ( nextNumber ) {
              numTwo += noWhiteSpaceExpression.charAt(i); 
          }
      }
      
      if ( numOne.includes(".") &&numTwo.localeCompare("") === 0 && opExists ){
          return -3; 
      } else if ( numOne.includes(".") && !numTwo.includes(".") && opExists ) {
          return -1;
      } else if ( numOne.includes(".") && numTwo.includes(".") ) {
          return 0; 
      } else if ( numOne.localeCompare("") === 0 && numTwo.localeCompare("") === 0 ) {
          // numOne and numTwo are both empty, but "." is clicked. 
          return -3;
      } else if ( !numOne.includes(".") && !numTwo.includes(".") ) {
          return -2; 
      } else if ( numOne.includes(".") && !numTwo.includes(".") && !opExists ) {
          return -5;
      }

      return 1; 


}

function negativeExpressions(expression) {
    let numOne = "";
    let numTwo = ""; 
    let ops = ""; 
    let nextNumber = false;
    let fullExpression = false; 
    let isNegativeOne = false;
    let isNegativeTwo = false;
    let express = expression.replace(/\s/g, ""); 

    for(let i = 0; i < express.length; i++) {
        if ( express.charAt(i) === "-" && numOne.localeCompare("") === 0 ) {
            isNegativeOne = true; 
            numOne += express.charAt(i); 
        } else if ( isNegativeOne && numOne.localeCompare("") !== 0 && (express.charAt(i) === "+" || express.charAt(i) === "-") ) {
            ops += express.charAt(i); 
        } else if ( !isNegativeOne && numOne.localeCompare("") !== 0 && (express.charAt(i) === "+" || express.charAt(i) === "-") ) {
            ops += express.charAt(i); 
        } else if ( isNegativeOne ) {
            numOne += express.charAt(i);  
        } else if ( !isNegativeOne && numOne.localeCompare("") === 0 ) {
            numOne += express.charAt(i); 
        } else {
            numTwo += express.charAt(i); 
        }
    }

    if ( isNegativeOne ) {
        return -4;
    }

}

function numberListeners() {
    for(let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function(num) {

            expressionOutput += num.target.textContent; 
            input.value = expressionOutput; 

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
                case "Delete":
                    deleteButton(); 
                    break;
                case "=": 
                    let resEqual = checkExpression(expressionOutput);

                    if ( resEqual === 1 ) {
                        result = equal(expressionOutput); 
                        
                        expressionOutput += ` = ${result}`;
                        previousExpression.value = expressionOutput;
                        input.value = result; 
                        expressionOutput = `${result}`; 
                    } 

                    break; 
                case "+": 
                    let resPlus = checkExpression(expressionOutput); 

                    if ( resPlus === 3 ) {
                        
                        expressionOutput += `0 + `;
                        input.value = expressionOutput; 
                    } else if ( resPlus === 0 ) {
                        expressionOutput += ` + `;
                        input.value = expressionOutput;  
                    } else if ( resPlus === 1 ) { // Both values, continue adding
                        let check = checkExpression(expressionOutput); 
                        if ( check === 1 ) { // 2 values are typed and + is clicked
                            result = equal(expressionOutput); 
                            expressionOutput = `${result} + `; 
                            previousExpression.value = expressionOutput; 
                            input.value = expressionOutput;
                            expressionOutput = `${result} + `;
                        }
                    } else if ( resPlus == -2 ) { // Just add the operator to continue the program
                        // Fixes the bug of NaN when pressing "=" button when there is already a result
                        expressionOutput = `${result} + `; 
                        input.value = expressionOutput; 
                    }

                    break; 
                case "-": 
                    let resMinus = checkExpression(expressionOutput); 

                    if ( resMinus === 3 ) {
                        expressionOutput += `0 - `;
                        input.value = expressionOutput; 
                    } else if ( resMinus === 0 ) {
                        expressionOutput += ` - `;
                        input.value = expressionOutput;  
                    } else if ( resMinus === 1 ) { // Both values, continue adding
                        let check = checkExpression(expressionOutput); 
                        if ( check === 1 ) { // 2 values are typed and + is clicked
                            result = equal(expressionOutput); 
                            expressionOutput = `${result} - `; 
                            previousExpression.value = expressionOutput; 
                            input.value = expressionOutput;
                        }
                    } else if ( resMinus == -2 ) { // Just add the operator to continue the program
                        // Fixes the bug of NaN when pressing "=" button when there is already a result
                        expressionOutput = `${result} - `; 
                        input.value = expressionOutput; 
                    }
                    
                    break; 
                case "*": 
                    let resMultiply = checkExpression(expressionOutput); 

                    if ( resMultiply === 3 ) {
                        expressionOutput += `0 * `;
                        input.value = expressionOutput; 
                    } else if ( resMultiply === 0 ) {
                        expressionOutput += ` * `;
                        input.value = expressionOutput;  
                    } else if ( resMultiply === 1 ) { // Both values, continue adding
                        let check = checkExpression(expressionOutput); 
                        if ( check === 1 ) { // 2 values are typed and + is clicked
                            result = equal(expressionOutput); 
                            expressionOutput = `${result} * `; 
                            previousExpression.value = expressionOutput; 
                            input.value = expressionOutput;
                        }
                        // Fixes the bug of NaN when pressing "=" button when there is already a result
                        expressionOutput = `${result} * `; 
                        input.value = expressionOutput; 
                    }
                    
                    break;     
                case "/": 
                    let resDivide = checkExpression(expressionOutput); 

                    if ( resDivide === 3 ) {
                        expressionOutput += `0 / `;
                        input.value = expressionOutput; 
                    } else if ( resDivide === 0 ) {
                        expressionOutput += ` / `;
                        input.value = expressionOutput;  
                    } else if ( resDivide === 1 ) { // Both values, continue adding
                        let check = checkExpression(expressionOutput); 
                        if ( check === 1 ) { // 2 values are typed and + is clicked
                            result = equal(expressionOutput); 
                            expressionOutput = `${result} / `; 
                            previousExpression.value = expressionOutput; 
                            input.value = expressionOutput;
                        }
                    } else if ( resDivide == -2 ) { // Just add the operator to continue the program
                        // Fixes the bug of NaN when pressing "=" button when there is already a result
                        expressionOutput = `${result} / `; 
                        input.value = expressionOutput; 
                    }
                    
                    break;  
                case ".": 
                    let resDecimal = checkDecimal(expressionOutput); 

                    if ( resDecimal === 1 ) {
                        expressionOutput += ".";
                        input.value = expressionOutput; 
                    } else if ( resDecimal === -2 ) {
                        expressionOutput += ".";
                        input.value = expressionOutput; 
                       
                    } else if ( resDecimal === -1 ) {
                        expressionOutput += "."; 
                        input.value = expressionOutput; 
                     
                    } else if ( resDecimal === -3 ) {
                        expressionOutput += "0.";
                        input.value = expressionOutput; 
                        
                    }

                    break; 
                default: 
                    expressionOutput = " " + num.target.textContent + " "; 
                    input.value = expressionOutput; 
            }  
        });
    }
}
// Function calls to listen to keys being clicked
numberListeners(); 
operationListeners(); 