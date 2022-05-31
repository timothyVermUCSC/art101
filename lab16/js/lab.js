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
        console.log("Bruh");
        curComic--;
        console.log("Error:", textStatus, errorThrown);
    }
})
}

function updateComic(comicObj){
  console.log(comicObj);
  curComic = comicObj.num;
  $("#comic").attr("src",comicObj.img);
  $("#comic").attr("alt",comicObj.alt);
  $("#comic").attr("title",comicObj.title);
}

function next(){
  curComic++;
  getComic(curComic);
}

function prev(){
  curComic--;
  getComic(curComic);
}

getComic(-1);
