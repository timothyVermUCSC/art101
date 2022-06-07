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

var updater = setInterval(update,1000/60);


document.onkeydown = function(e){
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

}

document.onkeyup = function(e){
    var key = e.key;
    if(key == "ArrowLeft" || key == "ArrowRight"){
        player.rVelocity = 0;
    }
    if(key == "ArrowUp"){
        player.thrust = false;
    }
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
        document.getElementById("link").style.display = "block";
        alert("You win. Press R to play again.");
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