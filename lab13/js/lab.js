/*
 * Author: Brent Chou, Timothy Vermeersch (brechou@ucsc.edu, tdvermee@ucsc.edu)
 * Created: 18 May
 * License: Public Domain
 * https://timothyvermucsc.github.io/art101/lab18/index.html
 * art101/lab18/lab.js
 */

// This function takes an integer that creates a string containing fizz, buzz,
// and Boom depending on if the integer is a multple of 3, 5, or 7 respectivly
function fizzBuzz(i){
  var str = "";
  if(i%3 == 0){
    str += "Fizz";
  }
  if(i%5 == 0){
    str += "Buzz";
  }
  if(i%7 == 0){
    str += "Boom";
  }
  //Checks if the string needs a !
  if(str!=""){
    return str + "!";
  }
  return str;
}

//This loop loops from 1-200 and feeds the iterator into the fizzBuzz function
//then append the result to the output div
for(var i = 1; i<=200; i++){
  var output = $("#output");
  var str = fizzBuzz(i);
  //Checks if any string should be outputed
  if(str != ""){
    //Create a new paragraph element
    var para = $("<p></p>").text = String(i) + ": " + str;
    var hr = $("<hr>")
    output.append(para);
    output.append(hr);
  }
}
