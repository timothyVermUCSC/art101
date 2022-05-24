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
    if (e.key == "ArrowUp" || e.key == "w") {
        p1Up = true;
    }
    if (e.key == "ArrowDown" || e.key == "s") {
        p1Down = true;
    }
};

document.onkeyup = function (e) {
    e = e || window.event;
    console.log(e);
    if (e.key == "ArrowUp" || e.key == "w") {
        p1Up = false;
    }
    if (e.key == "ArrowDown" || e.key == "s") {
        p1Down = false;
    }
};

