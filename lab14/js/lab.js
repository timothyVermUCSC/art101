/*
 * Author: Brent Chou, Timothy Vermeersch (brechou@ucsc.edu, tdvermee@ucsc.edu)
 * Created: 23 May
 * License: Public Domain
 * https://timothyvermucsc.github.io/art101/lab14/index.html
 * art101/lab14/lab.js
 */

function foo(str){
  var numericValue = 0;
  var place = 1;
  console.log(str)
  for(const char of str){
    console.log(char.charCodeAt(), char)
    numericValue += char.charCodeAt(0) * place;
    place *= 256;
  }
  console.log(str + " as an int is " + String(numericValue));
}
