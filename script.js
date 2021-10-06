const numbers = document.querySelectorAll(".number"); 
const operation = document.querySelectorAll(".operation");
const input = document.querySelector(".calculator-input");

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
            expressionOutput += " " + num.target.textContent + " "; 
            //console.log(expressionOutput); 
            input.value = expressionOutput; 
            console.log(num.target.textContent); 
        });
    }
}

console.log(input); 

let expressionOutput = ""; 

console.log(numbers); 
console.log(operation); 

numberListeners(); 
operationListeners(); 