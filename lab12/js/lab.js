/*
 * Author: Brent Chou, Timothy Vermeersch (brechou@ucsc.edu, tdvermee@ucsc.edu)
 * Created: 16 May
 * License: Public Domain
 * https://timothyvermucsc.github.io/art101/lab12/index.html
 * art101/lab12/lab.js
 */

function sortingHat(str){
  var length = str.length;
  var mod = length % 4;
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

function sortByName(){
  var name = document.getElementById("input").value;
  var house = sortingHat(name);
  var output = $("#output");
  var paragraph = $("<p></p>").text =  "The Sorting Hat has sorted you into " + house;
  output.empty();
  output.append(paragraph);
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
