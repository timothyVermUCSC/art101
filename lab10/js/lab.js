/*
 * Author: Brent Chou, Timothy Vermeersch (brechou@ucsc.edu, tdvermee@ucsc.edu)
 * Created: 10 May
 * License: Public Domain
 * https://timothyvermucsc.github.io/art101/lab10/index.html
 * art101/lab10/lab.js
 */


// Takes a param name and returns that name as a alphabetically sorted string
function sortName(name){
  var spaces = document.getElementById("spaces").checked;
  var caseSensitive =  document.getElementById("case-sensitive").checked;
  var words = [];
  var nameChars = []
  //Checks if case sensitive was checked and converts to lowercase if not
  if(!caseSensitive){
    name = name.toLowerCase();
    console.log(name);
  }
  //Checks if the name should keep spacing between first, middle, and last
  if(spaces){
    //Seperates the names into seperate strings
    words = name.split(" ");
  }else{
    words = [name];
  }

  //Loops over each name given and sorts it alphabetically
  for(var i = 0; i<words.length; i++){
    nameChars = nameChars.concat([...words[i]].sort().concat(" "));
  }
  return nameChars.join("");
}

// An event driven function that prompts the user for a name and calls sortName
// with the given name
function fixName(){
  //Grabs the inputed name
  var name = document.getElementById("user-name").value;
  var fixedName = sortName(name);
  document.getElementById("output").innerHTML = "<p>" + fixedName + "</p>";
  return;
}
