/*
 * Author: Brent Chou, Timothy Vermeersch (brechou@ucsc.edu, tdvermee@ucsc.edu)
 * Created: 30 May
 * License: Public Domain
 * https://timothyvermucsc.github.io/art101/lab16/index.html
 * art101/lab16/lab.js
 */
 var curComic = 0;

function getComic(id){
  var ep = "https://getxkcd.now.sh/api/comic?num=latest";
  if(id != -1){
    ep = "https://getxkcd.now.sh/api/comic?num=" + id.toString();
  }
  $.ajax({
    // The URL for the request (from the api docs)
    url: ep,
    // The data to send (will be converted to a query string)
    data: {},
    // Whether this is a POST or GET request
    type: "GET",
    // The type of data we expect back
    dataType : "json",
    // What do we do when the api call is successful
    //   all the action goes in here
    success: updateComic,
    // What we do if the api call fails
    error: function (jqXHR, textStatus, errorThrown) {
        // do stuff
        //Decrements the curComic var in case it is going past the newest
        curComic--;
        console.log("Error:", textStatus, errorThrown);
    }
})
}

function updateComic(comicObj){
  console.log(comicObj);
  //Used to get the newest comic number on first requests
  curComic = comicObj.num;
  //Updates the html attributes for the comic
  $("#comic").attr("src",comicObj.img);
  $("#comic").attr("alt",comicObj.alt);
  $("#comic").attr("title",comicObj.title);
}

function next(){
  //Increments the cur comic var
  curComic++;
  getComic(curComic);
}

function prev(){
  //Decrements the cur comic var
  curComic--;
  getComic(curComic);
}

getComic(-1);
