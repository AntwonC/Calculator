# Calculator
Project: Calculator 
https://antwonc.github.io/Calculator/

![](https://imgur.com/KfxpPcs.png)


# Functions 
-------------------------------------------------------------------------------------------------
**clear()**

**Parameters:**<br> 
None

**Description:**<br>
<br> 
This function will clear the calculator input and reset it to an empty string. 
<br>  
-------------------------------------------------------------------------------------------------
**deleteButton()**

**Parameters:**<br> 
None

**Description:**<br>
<br> 
This function is NOT a clear button removes one character from the current input string. 
Two edge cases:
 1) where the length is less than one then it will be an empty input string
 2) length == 2, using substring function will make the string length to 1 in any case 
<br>  
-------------------------------------------------------------------------------------------------
**add(numberOne, numberTwo)**

**Parameters:**<br> 
numberOne: first value to add<br>
numberTwo: second value to add 

**Description:**<br>
<br> 
This function takes in two numbers and returns the sum using the plus operator. 
<br>  
-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
**subtract(numberOne, numberTwo)**

**Parameters:**<br> 
numberOne: first value to add<br> 
numberTwo: second value to add 

**Description:**<br>
<br> 
This function takes in two numbers and returns the difference using the plus operator to convert from string to integer, then using the subtraction operator.  
<br>  
-------------------------------------------------------------------------------------------------
**multiply(numberOne, numberTwo)**

**Parameters:**<br> 
numberOne: first value to add<br> 
numberTwo: second value to add 

**Description:**<br>
<br> 
This function takes in two numbers and returns the product using the plus operator to convert from string to integer, then using the multiplication operator.  
<br>  
-------------------------------------------------------------------------------------------------
**divide(numberOne, numberTwo)**

**Parameters:**<br> 
numberOne: first value to add<br> 
numberTwo: second value to add 

**Description:**<br>
<br> 
This function takes in two numbers and returns the quotient using the plus operator to convert from string to integer, then using the division operator. Check for division by 0.
<br>  
-------------------------------------------------------------------------------------------------
**equal(expression)**

**Parameters:**<br> 
expression: user input string  

**Description:**<br>
<br> 
This function takes the user expression and computes the result of it if it is a valid expression. Loops through the expression to check if it is a valid expression. Then calls upon add/subtract/
multiply/division to compute the expression. 

Returns a string of the computed value
<br>
-------------------------------------------------------------------------------------------------
**checkExpression(expression)**

**Parameters:**<br> 
expression: user input string  

**Description:**<br>
<br> 
This function takes the user expression and checks if the expression is valid. 

Five edge cases: 

1) only one operand
2) empty operands
3) one operand, but second operand is empty space 
4) using truthy value to avoid NaN 
5) operands are not empty

rReturns 1 if expression is valid
<br>
-------------------------------------------------------------------------------------------------
**checkDecimal(expression)**

**Parameters:**<br> 
expression: user input string  

**Description:**<br>
<br> 
This function checks the expression for decimal operands. Gets rid of the whitespace expresssion
using regular expression.  

Returns 1 if expression is valid 
<br>
-------------------------------------------------------------------------------------------------
**negativeExpressions(expression)**

**Parameters:**<br> 
expression: user input string  

**Description:**<br>
<br> 
This function checks if the expression is negative.

Returns truthy value if expression is negative
<br>
-------------------------------------------------------------------------------------------------
**numberListeners()**

**Parameters:**<br> 
None 

**Description:**<br>
<br> 
This function adds event listeners to the operands to register numbers.

Returns nothing
<br>
-------------------------------------------------------------------------------------------------
**operationListeners()**

**Parameters:**<br> 
None

**Description:**<br>
<br> 
This function adds event listeners to the operators to register signs. It uses a switch case for each operator and checks the expression.
<br>