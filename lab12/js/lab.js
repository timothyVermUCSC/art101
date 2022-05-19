/*
 * Author: Brent Chou, Timothy Vermeersch (brechou@ucsc.edu, tdvermee@ucsc.edu)
 * Created: 16 May
 * License: Public Domain
 * https://timothyvermucsc.github.io/art101/lab12/index.html
 * art101/lab12/lab.js
 */

//This function returns the name of the house for a given name
function sortingHat(str){
  var length = str.length;
  var mod = length % 4;
  //Matches mod value to house name
  if(mod == 0){
    return "Gryffindor";
  }else if(mod == 1){
    return "Ravenclaw";
  }else if(mod == 2){
    return "Slytherin";
  }else{
    return "Hufflepuff";
  }
}

//Event handler for get placement button
function sortByName(){
  var name = document.getElementById("input").value;
  var house = sortingHat(name);
  var output = $("#output");
  //Creates new elment with placement
  var paragraph = $("<p></p>").text =  "The Sorting Hat has sorted you into " + house;
  //Removes previous output
  output.empty();
  //Adds new output
  output.append(paragraph);
  //Matches house to text color
  if(house == "Gryffindor"){
    output.css("color","red");
  }else if(house == "Ravenclaw"){
    output.css("color","blue");
  }else if(house == "Slytherin"){
    output.css("color","green");
  }else{
    output.css("color","gold");
  }
  return;
}
