/*
 * Author: Brent Chou, Timothy Vermeersch (brechou@ucsc.edu, tdvermee@ucsc.edu)
 * Created: 11 May
 * License: Public Domain
 * https://timothyvermucsc.github.io/art101/lab11/index.html
 * art101/lab11/lab.js
 */


//
// Toggles the special calss in the parent of the object calling the function
function toggleSpecialClass(){
  $(this).parent().toggleClass("special");
}

$(document).ready(()=>{
  //Creates three buttons
  var cButton = $("<button></button>").text("jQuery button");
  var pButton = cButton.clone();
  var rButton = cButton.clone();
  //Attachs events
  cButton.click(toggleSpecialClass);
  pButton.click(toggleSpecialClass);
  rButton.click(toggleSpecialClass);
  //Adds buttons to document
  $("#challenges").append(cButton);
  $("#problems").append(pButton);
  $("#results").append(rButton);
})
