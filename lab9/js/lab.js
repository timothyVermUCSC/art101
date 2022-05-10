/*
 * Author: Brent Chou, Timothy Vermeersch (brechou@ucsc.edu, tdvermee@ucsc.edu)
 * Created: 4 May
 * License: Public Domain
 * https://timothyvermucsc.github.io/art101/lab9/index.html
 * art101/lab9/lab.js
 */

//Gets element with id output from html page
var outputEl = document.getElementById("output");
//Create a new html paragraph element object
var new1El = document.createElement("p");

//Sets the new p's value
new1El.innerHTML = "something new.";

//New html header 1 element object
var new2El = document.createElement("h1");

//Sets new h1's value
new2El.innerHTML = "something else.";

//Adds new elements to the element taken from the page
outputEl.appendChild(new1El);
outputEl.appendChild(new2El);

//Styles elements
new1El.style.color = "salmon";
new1El.style.fontFamily = "Roboto";
new2El.style.color = "blue";
outputEl.style.backgroundColor = "greenyellow";
