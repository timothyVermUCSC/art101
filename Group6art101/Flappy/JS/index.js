var bird = document.getElementById("bird");
var velocity = 0;
var position = 120;
var updater;
var obstacles = [];
var frameCounter = 0;
var score = 0;
var started = false;
var dead = false;

function updateFrame(){
    if(position >= 270){
        dead = true;
        position = 270;
        started = false;
        return;
    }
    if(position <= 0){
        dead = true;
    }
    velocity += 0.2;
    position += velocity;
    bird.style.top = position.toString() + "px";
    bird.style.transform = "rotate(" + velocity * 5 + "deg)";
    if(dead){
        return;
    }
    if(velocity > 0){
        bird.src = "flappy2.png";
    }else{
        bird.src = "flappy1.png";
    }
    if(frameCounter % 60 == 0){
        addObstacle();
    }
    var remove = false;
    for(const o of obstacles){
        var left = o.style.left.slice(0,-2);
        left -= 3;
        if(left < -50){
            remove = true;
        }
        if(left < 140 && left > 35){
            var top = Number(o.style.top.slice(0,-2));
            if(top < 0){
                if(left == 80){
                    score++;
                    if(score >= 3){
                        document.getElementById("link").style.display = "block";
                    }
                    document.getElementById("score").innerHTML = score;
                }
                if(Number(bird.style.top.slice(0,-2)) < (top + 400)){
                    dead = true;
                }
            }else{
                if(Number(bird.style.top.slice(0,-2)) > (top - 20)){
                    dead = true;
                }
            }
        }
        o.style.left = left.toString() + "px";
    }
    if(remove){
        document.getElementById("flappy").removeChild(document.getElementById("flappy").childNodes[3]);
        document.getElementById("flappy").removeChild(document.getElementById("flappy").childNodes[3]);
        obstacles.shift()
        obstacles.shift()
    }
    frameCounter++;
}

function reset(){
    for(const o of obstacles){
        document.getElementById("flappy").removeChild(document.getElementById("flappy").childNodes[3]);
    }
    position = 120;
    clearInterval(updater);
    updater = setInterval(updateFrame, 1000/60);
    obstacles = [];
    frameCounter = 0;
    score = 0;
    dead = false;
}

window.onkeydown = function(e){
    if(e.key = " "){
        if(!started){
            started = true;
            reset();
        }
        if(!dead){
            velocity = -4;
        }
        return false;
    }
}

function addObstacle(){
    var newHigh = document.createElement("div");
    var newLow = document.createElement("div");
    newHigh.setAttribute("id","obstacle");
    newLow.setAttribute("id","obstacle");
    var top = Math.floor(Math.random()*-160) - 230;
    newHigh.style.top = top.toString() + "px";
    newLow.style.top = (top + 520).toString() + "px";
    newHigh.style.left = "500px";
    newLow.style.left = "500px";
    document.getElementById("flappy").appendChild(newHigh);
    document.getElementById("flappy").appendChild(newLow);
    obstacles.push(newHigh);
    obstacles.push(newLow);
}