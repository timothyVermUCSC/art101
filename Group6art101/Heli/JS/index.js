var frameCounter = 0;
var heliAcceleration = 0.2;
var heliVelocity = 0;
var heliPosition = 150;
var previousHeight = -80;
var speed = 5;
var started = false;

var obstacles = [];

function updateFrame(){
    var heli = document.getElementById("heli");
    frameCounter++;
    document.getElementById("distance").innerHTML = frameCounter;
    if(frameCounter %5 == 0){
        alternateHeli()
    }
    if(frameCounter == 500){
        document.getElementById("link").style.display = "block";
    }
    heliVelocity += heliAcceleration;
    heliPosition += heliVelocity;
    heli.style.top = heliPosition + "px";

    var slice = false;
    var newAdded = false;
    for(const o of obstacles){
        var left = Number(o.style.left.slice(0,-2));
        o.style.left = (left - speed).toString() + "px";
        if(left == 480 && !newAdded){
            addObstacle();
            newAdded = true;
        }
        if(left == -50){
            slice = true;
        }
        if(left > 100 && left < 170){
            var high = Number(o.style.top.slice(0,-2));
            var low = high + 150;
            var heliHeight = Number(heli.style.top.slice(0,-2));
            if(high > 0){
                high -= 30;
            }
            console.log(heliHeight, high, low)
            if(heliHeight > high && heliHeight < low){
                clearInterval(updater);
                heli.src = "heli3.png"
            }
        }
    }
    if(slice){
        obstacles.slice()
        document.getElementById("game").removeChild(document.getElementById("game").childNodes[3]);
        obstacles.slice()
        document.getElementById("game").removeChild(document.getElementById("game").childNodes[3]);
    }
}

function alternateHeli(){
    var heli = document.getElementById("heli");
    var file = heli.src.slice(-9);
    
    if(file == "heli1.png"){
        heli.src = "heli2.png";
    }else{
        heli.src = "heli1.png";
    }
    
}

function addObstacle(){
    var newOb = document.createElement("div");
    var newLow = document.createElement("div");
    newOb.setAttribute("id","obstacle");
    newLow.setAttribute("id","obstacle");
    newOb.style.left = "500px";
    newLow.style.left = "500px";
    previousHeight += Math.floor(Math.random() * 30) - 15;
    if(previousHeight > 0){
        previousHeight = 0;
    }
    if(previousHeight < -130){
        previousHeight = -130
    }
    console.log(previousHeight)
    newOb.style.top = previousHeight.toString() + "px";
    newLow.style.top =(previousHeight+300).toString() + "px";
    document.getElementById("game").appendChild(newOb);
    document.getElementById("game").appendChild(newLow);
    obstacles.push(newOb);
    obstacles.push(newLow);
}


window.onkeydown = (e) => {
    if(e.key == " "){
        if(!started){
            updater = setInterval(updateFrame,1000/60);
            addObstacle();
            started = true;
            frameCounter = 0;
        }
        heliAcceleration = -0.2;
        return false;
    }
}

window.onkeyup = function(e){
    if(e.key == " "){
        heliAcceleration = 0.2;
    }
}

var updater;