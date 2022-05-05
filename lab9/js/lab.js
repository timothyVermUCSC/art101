/*
 * Author: Brent Chou, Timothy Vermeersch (brechou@ucsc.edu, tdvermee@ucsc.edu)
 * Created: 4 May
 * License: Public Domain
 * https://timothyvermucsc.github.io/art101/lab9/index.html
 * art101/lab9/lab.js
 */

var outputEl = document.getElementById("output");
var new1El = document.createElement("p");

new1El.innerHTML = "something new.";

var new2El = document.createElement("h1");

new2El.innerHTML = "something else.";

outputEl.appendChild(new1El);
outputEl.appendChild(new2El);

new1El.style.color = "salmon";
new1El.style.fontFamily = "Roboto";

new2El.style.color = "blue";
outputEl.style.backgroundColor = "greenyellow";
