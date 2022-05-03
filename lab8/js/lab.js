/*
 * Author: Brent Chou, Timothy Vermeersch (brechou@ucsc.edu, tdvermee@ucsc.edu)
 * Created: 2 May
 * License: Public Domain
 * https://timothyvermucsc.github.io/art101/lab8/index.html
 * art101/lab8/lab.js
 */

 var numList = [23, -32, 9, 5, -9, 0, 12, 13]

function absFactorial(x){
  //Checks if the value is negative
    if(x < 0){
        x *= -1;
    }
    //Checks if the recursion should continue
    if(x <= 1){
         return 1;
    }else{
         //Returns x * (x-1)!
         return x * absFactorial(x - 1);
    }
}

console.log("Original List: ", numList);
console.log("Absolute factorial of list items: ", numList.map(absFactorial));
console.log("Squares of list items: ", numList.map((x) => {return x * x;}))

function showJS(){
  //Puts out list modifications to the page
  document.getElementById("og").innerHTML = "Original List: " + numList.join(", ");
  document.getElementById("af").innerHTML = "Absolute Facorial of the list: " + numList.map(absFactorial).join(", ");
  document.getElementById("sq").innerHTML = "Absolute Facorial of the list: " + numList.map((x) => {return x * x;}).join(", ");
}
