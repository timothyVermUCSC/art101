
var id = 1;

function getPokemon(name){
  $.ajax({
    // The URL for the request (from the api docs)
    url: "https://pokeapi.co/api/v2/pokemon/" + name.toString(),
    // The data to send (will be converted to a query string)
    data: {},
    // Whether this is a POST or GET request
    type: "GET",
    // The type of data we expect back
    dataType : "json",
    // What do we do when the api call is successful
    //   all the action goes in here
    success: updatePokemon,
    // What we do if the api call fails
    error: function (jqXHR, textStatus, errorThrown) {
        // do stuff
        console.log("Error:", textStatus, errorThrown);
    }
})
}

function updatePokemon(data){
  document.getElementById("pokeimg").src = data.sprites.front_default;
  document.getElementById("pokename").innerHTML = data.name;
  document.getElementById("poketype").innerHTML = data.types[0].type.name;
  for(var i = 1; i<data.types.length;i++){
    document.getElementById("poketype").innerHTML += ", " + data.types[i].type.name;
  }
  document.getElementById("pokeid").innerHTML = data.id;
  id = data.id;
  $("#search").attr("placeholder", data.name);
  console.log(JSON.stringify(data));
}

$("#pokeleft").click(() => {
  console.log(id);
  if(id > 1){
    id -= 1;
  }
  console.log(id);
  getPokemon(id);
})

$("#pokeright").click(() => {
    id += 1;
  getPokemon(id);
})

$("#search").click( () => {
  getPokemon($("#name").val());
})


getPokemon(1);
