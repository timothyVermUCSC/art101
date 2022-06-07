var p1Up = false;
var p1Down = false;
var p1Position = 150;
var p2Position = 150;
var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var b = document.getElementById("ball");
var resetting = false;
var p1Score = 0;
var p2Score = 0;
var ball = {
    x: 200,
    y: 150,
    xDirection: 6,
    yDirection: 2
}

function abs(i) {
    return i < 0 ? i * -1 : i;
}

document.getElementById("pongGame").onclick = function(){
    setInterval(updatePosition, 1000 / 60);
    console.log("start pong");
}

function updatePosition() {
    var p1Center = p1Position + 25;
    var p2Center = p2Position + 25;
    console.log("Ball position", ball.x, ball.y);
    var bCenter = ball.y + 10;
    if (p1Up && !p1Down && p1Position > 5) {
        p1Position -= 3;
    }
    if (p1Down && !p1Up && p1Position < 245) {
        p1Position += 3;
    }
    ball.x += ball.xDirection;
    ball.y += ball.yDirection;
    if (ball.x > 380) {
        ball.xDirection = 0;
        ball.yDirection = 0;
        if (!resetting) {
            p1Score += 1;
            if(p1Score > 6){
                document.getElementById("hidden70").hidden = false;
                alert("You won")
                p1Score = 0;
                p2Score = 0;
            }
            document.getElementById("p1s").innerHTML = p1Score;
            setTimeout(reset, 3000);
            resetting = true;
        }
    } else if (ball.x < 0) {
        console.log("Hello");
        ball.xDirection = 0;
        ball.yDirection = 0;
        if (!resetting) {
            p2Score += 1;
            if(p2Score > 7){
                alert("You lost")
                p1Score = 0;
                p2Score = 0;
            }
            document.getElementById("p2s").innerHTML = p2Score;
            setTimeout(reset, 3000);
            resetting = true;
        }
    } else if (ball.x > 25 && ball.x < 31) {
        var diff = p1Center - bCenter;
        if (abs(diff) < 40) {
            angle = (diff / -8);
            ball.yDirection = angle;
            ball.xDirection *= -1;
        }
    } else if (ball.x > 349 && ball.x < 355) {
        var diff = p2Center - bCenter;
        if (abs(diff) < 40) {
            angle = (diff / -8);
            ball.yDirection = angle;
            ball.xDirection *= -1;
        }
    }
    console.log(bCenter, p2Center);
    if (ball.xDirection <= 0) {
        if(p2Center - 150 > 10){
            p2Position -= 1
        }else if( 150 - p2Center > 10){
            p2Position += 1;
        }
    } else {
        if (bCenter - p2Center > 20) {
            p2Position += 3;
        } else if (p2Center - bCenter > 20) {
            p2Position -= 3;
        }
    }
    if (ball.y > 280 || ball.y < 0) {
        ball.yDirection *= -1;
    }
    p2.style.top = p2Position + "px";
    p1.style.top = p1Position + "px";
    b.style.top = ball.y + "px";
    b.style.left = ball.x + "px";

}

function reset() {
    ball.x = 200;
    ball.y = 150;
    setTimeout(start, 3000)
}

function start() {
    console.log("Starting");
    resetting = false;
    ball.xDirection = 6;
    ball.yDirection = 2;
}

document.onkeydown = function (e) {
    e = e || window.event;
    console.log(e);
    if (e.key == "w") {
        p1Up = true;
    }
    if (e.key == "s") {
        p1Down = true;
    }
    var key = e.key;
    if(key == "ArrowLeft" ){
        player.rVelocity = -2;
    }

    if(key == "ArrowRight"){
        player.rVelocity = 2;
    }
    if(key == "ArrowUp"){
        player.thrust = true;
    }
    if(key == "r"){
        player = {
            xVelocity: 0,
            yVelocity: 0,
            x: 100,
            y: 300,
            rotation: 0,
            rVelocity: 0,
            thrust: false,
            alive: true,
        }
        cpu = {
            xVelocity: 0,
            yVelocity: 0,
            x: 300,
            y: 100,
            rotation: 0,
            rVelocity: 0,
            thrust: true,
            alive: true,
        }
        playerDOM.style.width = "5px";
        playerDOM.style.borderRadius = "0px";
        playerDOM.style.width = "5px";
        playerDOM.style.borderRadius = "0px";
        clearInterval(updater)
        updater = setInterval(update,1000/60);
    }
};

document.onkeyup = function (e) {
    e = e || window.event;
    console.log(e);
    if (e.key == "w") {
        p1Up = false;
    }
    if (e.key == "s") {
        p1Down = false;
    }
    var key = e.key;
    if(key == "ArrowLeft" || key == "ArrowRight"){
        player.rVelocity = 0;
    }
    if(key == "ArrowUp"){
        player.thrust = false;
    }
};

var player = {
    xVelocity: 0,
    yVelocity: 0,
    x: 100,
    y: 300,
    rotation: 0,
    rVelocity: 0,
    thrust: false,
    alive: true,
}
var cpu = {
    xVelocity: 0,
    yVelocity: 0,
    x: 300,
    y: 100,
    rotation: 0,
    rVelocity: 0,
    thrust: true,
    alive: true,
}
var playerDOM= document.getElementById("playerShip");
var cpuDOM = document.getElementById("cpuShip");

var updater;

document.getElementById("spacewar").onclick = function(){
    updater = setInterval(update,1000/60)
}


function updatePositions(){
    if(player.alive){
        if(player.thrust){
            player.yVelocity -= Math.cos(player.rotation * Math.PI/180) / 20;
            player.xVelocity += Math.sin(player.rotation * Math.PI/180) / 20;
        }
        player.x += player.xVelocity;
        player.y += player.yVelocity;
        player.xVelocity = closerToZero(player.xVelocity, 0.01);
        player.yVelocity = closerToZero(player.yVelocity, 0.01);
        player.rotation += player.rVelocity;
        playerDOM.style.top = player.y + "px";
        playerDOM.style.left = player.x + "px";
        playerDOM.style.transform = "rotate(" + player.rotation + "deg)";
    }
    if(cpu.alive){
        if(cpu.thrust){
            cpu.yVelocity -= Math.cos(cpu.rotation * Math.PI/180) / 20;
            cpu.xVelocity += Math.sin(cpu.rotation * Math.PI/180) / 20;
        }
        cpu.x += cpu.xVelocity;
        cpu.y += cpu.yVelocity;
        cpu.xVelocity = closerToZero(cpu.xVelocity, 0.01);
        cpu.yVelocity = closerToZero(cpu.yVelocity, 0.01);
        cpu.rotation += cpu.rVelocity;
        cpuDOM.style.top = cpu.y + "px";
        cpuDOM.style.left = cpu.x + "px";
        cpuDOM.style.transform = "rotate(" + cpu.rotation  + "deg)";
    }
}

function closerToZero(num, fac){
    if(Math.abs(num) < fac){
        return 0;
    }
    if(num > 0){
        return num - fac;
    }
    return num + fac;
}

function update(){
    updateGravity();
    updatePositions();
    checkForStar();
    checkOutOfBounds();
    rotateCpu();
    checkCollision();
    if(player.alive && !cpu.alive){
        alert("You win. Press R to play again.");
        document.getElementById("hidden60").hidden = false;
        clearInterval(updater);
    }
    if(!player.alive){
        alert("You lose :(. Press R to play again.");
        clearInterval(updater);
    }
}

function updateGravity(){
    var xDisplace = player.x - 200;
    var yDisplace = 200 - player.y;
    var playerDistance = Math.sqrt((xDisplace ** 2) + (yDisplace ** 2));
    var angle = Math.atan2(yDisplace,xDisplace)
    player.xVelocity -= Math.cos(angle) * (3/playerDistance);
    player.yVelocity += Math.sin(angle) * (3/playerDistance);

}

function checkForStar(){
    if(Math.abs(player.x - 200) < 5 && Math.abs(player.y - 200) < 10){
        player.alive = false;
        playerDOM.style.width = "15px";
        playerDOM.style.borderRadius = "15px";
    }
}

function checkOutOfBounds(){
    var xDisplace = player.x - 200;
    var yDisplace = 200 - player.y;
    var playerDistance = Math.sqrt((xDisplace ** 2) + (yDisplace ** 2));
    if(playerDistance > 200){
        player.alive = false;
        playerDOM.style.width = "15px";
        playerDOM.style.borderRadius = "15px";
    }

    xDisplace = cpu.x - 200;
    yDisplace = 200 - cpu.y;
    cpuDistance = Math.sqrt((xDisplace ** 2) + (yDisplace ** 2));
    if(cpuDistance > 200){
        cpu.alive = false;
        cpuDOM.style.width = "15px";
        cpuDOM.style.borderRadius = "15px";
    }
}

function rotateCpu(){
    var xDisplace = player.x - cpu.x;
    var yDisplace = cpu.y - player.y;
    var radiusX = cpu.x - 200;
    var radiusY = 200 - cpu.y;
    var starDistance = Math.sqrt((radiusX ** 2) + (radiusY ** 2));
    cpu.rotation = Math.atan2(yDisplace,xDisplace)
    cpu.rotation = -1 * (cpu.rotation * 180/Math.PI - 90)
    if(starDistance < 70){
        if(cpu.x < 200){
            cpu.rotation = 45;
        }else{
            cpu.rotation = -45;
        }
    }
    if(starDistance > 150){
        var angle = Math.atan2(radiusX,radiusY)
        cpu.rotation = (angle * 180/Math.PI) + 180;
        console.log("Centered");
    }
}

function checkCollision(){
    if(Math.abs(player.x - cpu.x) < 5){
        if(Math.abs(player.y - cpu.y) < 5){
            player.alive = false;
            playerDOM.style.width = "15px";
            playerDOM.style.borderRadius = "15px";
        }
    }
}