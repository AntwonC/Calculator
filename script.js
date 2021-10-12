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

function add(numberOne, numberTwo) {
    //console.log("IN ADD!");
    //console.log(`${expressionOutput} | ${-1+5}`);
    //console.log(numberOne + "|" + numberTwo);
    return +numberOne + +numberTwo; 
}

function subtract(numberOne, numberTwo) {
    //console.log(expressionOutput);
    return +numberOne - +numberTwo; 
}

function multiply(numberOne, numberTwo) {
    //console.log(expressionOutput);
    return (+numberOne) * (+numberTwo); 
}

function divide(numberOne, numberTwo) {
    //console.log(expressionOutput);
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
       // numOne += noSpaceExpression.charAt(0); 
    }

    for(let i = 0; i < noSpaceExpression.length; i++) {
        //console.log(`--|${numOne}| |${ops}| |${numTwo}|--`);
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

    console.log(`--|${numOne}| |${ops}| |${numTwo}|--`);
    if ( ops.localeCompare("+") === 0 ) {
        finalValue = add(numOne, numTwo); 
    } else if ( ops.localeCompare("-") === 0 ) {
        finalValue = subtract(+numOne, +numTwo); 
    } else if ( ops.localeCompare("*") === 0 ) {
        finalValue = multiply(+numOne, +numTwo); 
    } else if ( ops.localeCompare("/") === 0 ) {
        finalValue = divide(+numOne, +numTwo); 
    }

    console.log(`In equal(): ${expression.replace(/\s/g, "")}
                 finalValue: ${finalValue}` );
    return finalValue.toString();
}

function checkExpression(expression) {
    // Case 1: 1 + 2 
    // Case 2:   + 2 
    // Case 3: 2 + = 

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
    // 4-5
    console.log("----------------------------------------");
    console.log("In checkExpression()"); 
    console.log(`Expression: ${noWhiteSpaceExpression}`)

    if ( noWhiteSpaceExpression.charAt(0) === "-" ) {
        isNegative = true; 
    }

   // console.log(`${noWhiteSpaceExpression}`);
    for(let i = 0; i < noWhiteSpaceExpression.length; i++) {
      //  if ( noWhiteSpaceExpression.charAt(0) === '-' ) {
            //return 0;
        if ( noWhiteSpaceExpression.charAt(i) === "." ) {
            decimalExists = true; 
        } else if ( isNegative ) {
            isNegative = false;
            numOne += noWhiteSpaceExpression.charAt(i); 
        } //else if ( operatorCounter === 1 ) {
           // operatorCounter--;
            //return 10;
         else if ( noWhiteSpaceExpression.charAt(i) === "+" || noWhiteSpaceExpression.charAt(i) === "-" || noWhiteSpaceExpression.charAt(i) === "*" || noWhiteSpaceExpression.charAt(i) === "/" ) {
            ops += noWhiteSpaceExpression.charAt(i);
            //console.log(`i: ${i}`); 
            operatorIndex = i+1; 
            //operatorCounter++; 
            nextNumber = true; 
        } else if ( noWhiteSpaceExpression.charAt(i) === "=" ) {
            // Full expression, do nothing
            //console.log(previousExpression.value); 
            //return -2; 
            fullExpression = true; 
            break; 
        } else if ( !nextNumber ) {
            numOne += noWhiteSpaceExpression.charAt(i); 
        } else if ( nextNumber ) {
            numTwo += noWhiteSpaceExpression.charAt(i); 
        }
    }


  /*  if ( noWhiteSpaceExpression.includes("+", operatorIndex) || noWhiteSpaceExpression.includes("-", operatorIndex) ) {
        operatorPresent = true; 
        return -5; 
    } */
    console.log(`${operatorPresent} | ${operatorIndex}`); 
  //  console.log("In checkExpression()"); 
    console.log(`|${numOne}| ${ops} |${numTwo}|`);
    console.log("----------------------------------------");

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

function checkDecimal(expression) {

    let numOne = "";
    let numTwo = ""; 
    let ops = ""; 
    let nextNumber = false;
    let fullExpression = false; 
    let isNegative = false;

    let decimalExists = false; 

    let noWhiteSpaceExpression = expression.replace(/\s/g, ""); 

    for(let i = 0; i < noWhiteSpaceExpression.length; i++) {
        //  if ( noWhiteSpaceExpression.charAt(0) === '-' ) {
              //return 0;
          if ( noWhiteSpaceExpression.charAt(i) === "." ) {
              decimalExists = true; 
          } else if ( isNegative ) {
              isNegative = false;
              numOne += noWhiteSpaceExpression.charAt(i); 
          } else if ( noWhiteSpaceExpression.charAt(i) === "+" || noWhiteSpaceExpression.charAt(i) === "-" || noWhiteSpaceExpression.charAt(i) === "*" || noWhiteSpaceExpression.charAt(i) === "/" ) {
              ops += noWhiteSpaceExpression.charAt(i);
              //console.log(`i: ${i}`); 
              nextNumber = true; 
          } else if ( noWhiteSpaceExpression.charAt(i) === "=" ) {
              // Full expression, do nothing
              //console.log(previousExpression.value); 
              //return -2; 
              fullExpression = true; 
              break; 
          } else if ( !nextNumber ) {
              numOne += noWhiteSpaceExpression.charAt(i); 
          } else if ( nextNumber ) {
              numTwo += noWhiteSpaceExpression.charAt(i); 
          }
      }

      if ( decimalExists ) {
          return 1; 
      } else {
          return 0; 
      }


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
    // 4 - 5 = -1
    // numOne = 
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

    console.log("-----------------------------"); 
    console.log("IN NEGATIVE EXPRESSION");
    console.log(`${numOne} ${ops} ${numTwo}`);
    console.log("-----------------------------"); 

    if ( isNegativeOne ) {
        return -4;
    }

}

function numberListeners() {
    for(let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function(num) {

            expressionOutput += num.target.textContent; 
            let check = checkExpression(expressionOutput);

            console.log(expressionOutput); 
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
                    let resEqual = checkExpression(expressionOutput);
                    //let negative = negativeExpressions(expressionOutput); 
                    
                    console.log("resEqual: " + resEqual); 
                  //  console.log("negative: " + negative); 


                    if ( resEqual === 1 ) {
                        result = equal(expressionOutput); 
                        console.log(`In resEqual: ${result}`);
                        expressionOutput += ` = ${result}`;
                        previousExpression.value = expressionOutput;
                        input.value = result; 
                        expressionOutput = `${result}`; 
                    } 

                    break; 
                case "+": 
                    let resPlus = checkExpression(expressionOutput); 
                    console.log("resPlus: " + resPlus); 

                    if ( resPlus === 3 ) {
                        console.log(`Expression: |${expressionOutput.replace(/\s/g, "")}|`);
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
                       // result = ""; 
                    } else if ( resPlus == -2 ) { // Just add the operator to continue the program
                        // Fixes the bug of NaN when pressing "=" button when there is already a result
                        expressionOutput = `${result} + `; 
                        input.value = expressionOutput; 
                    }

                    break; 
                case "-": 
                    let resMinus = checkExpression(expressionOutput); 

                    console.log(`resMinus: ${resMinus}`);

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
                       // result = ""; 
                    } else if ( resMinus == -2 ) { // Just add the operator to continue the program
                        // Fixes the bug of NaN when pressing "=" button when there is already a result
                        expressionOutput = `${result} - `; 
                        input.value = expressionOutput; 
                    }
                    
                    break; 
                case "*": 
                    let resMultiply = checkExpression(expressionOutput); 

                    console.log(`resMultiply: ${resMultiply}`);

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
                       // result = ""; 
                    } else if ( resMultiply == -2 ) { // Just add the operator to continue the program
                        // Fixes the bug of NaN when pressing "=" button when there is already a result
                        expressionOutput = `${result} * `; 
                        input.value = expressionOutput; 
                    }
                    
                    break;     
                case "/": 
                    let resDivide = checkExpression(expressionOutput); 

                    console.log(`resDivide: ${resDivide}`);

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
                       // result = ""; 
                    } else if ( resDivide == -2 ) { // Just add the operator to continue the program
                        // Fixes the bug of NaN when pressing "=" button when there is already a result
                        expressionOutput = `${result} / `; 
                        input.value = expressionOutput; 
                    }
                    
                    break;  
                case ".": 
                    let resDecimal = checkDecimal(expressionOutput); 

                    console.log(`resDecimal: ${resDecimal}`);

                    if ( resDecimal === 1 ) {
                        expressionOutput += ".";
                        input.value = expressionOutput; 
                        decimalButton.disabled = true; 
                        
                    } else {
                        expressionOutput += ".";
                        input.value = expressionOutput; 
                        decimalButton.disabled = false; 
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