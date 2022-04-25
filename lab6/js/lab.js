/*
 * Author: Brent Chou, Timothy Vermeersch (brechou@ucsc.edu, tdvermee@ucsc.edu)
 * Created: 25 April
 * License: Public Domain
 * https://tdvermee.github.io/art101/lab6/index.html
 * art101/lab6/lab.js
 */

// Define Variables
myTransport = ["Honda Civic", "Walking", "Metro Bus", "Rides From Friends"];

myMainRide = {
    make: "Honda",
    model: "Civic",
    color: "Metallic Grey",
    year: "2019",
    age: function() {
        return 2022 - age;
    }
}


document.writeln("Kinds of transportation I use: ", myTransport, "</br>");
document.writeln("My Main Ride: <pre>", JSON.stringify(myMainRide, null, '\t'), "</pre>");

function showOut(){
  document.getElementById("output").style.display = "block";
  document.getElementById("show").style.display = "none";
}
