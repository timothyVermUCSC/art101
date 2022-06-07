var notes = {114: 'l', 148: 'u', 184: 'l', 230: 'u', 263: 'r', 286: 'd', 315: 'l', 352: 'u', 385: 'r', 429: 'd', 463: 'l', 488: 'u', 516: 'l', 538: 'u', 559: 'r', 582: 'd', 605: 'l', 627: 'u', 643: 'd', 654: 'l', 665: 'u', 688: 'r', 713: 'l', 731: 'u', 744: 'r', 767: 'd', 788: 'l', 810: 'u', 824: 'l', 833: 'd', 856: 'u', 869: 'r', 893: 'l', 924: 'd', 954: 'r', 977: 'd', 996: 'l', 1015: 'u', 1040: 'd', 1063: 'r', 1087: 'u', 1111: 'l', 1144: 'r', 1166: 'd', 1188: 'l', 1211: 'u', 1236: 'd', 1262: 'r', 1289: 'l', 1312: 'u', 1358: 'u', 1385: 'u', 1411: 'u', 1438: 'u', 1463: 'u', 1487: 'u', 1512: 'l', 1534: 'd', 1582: 'l', 1626: 'd', 1660: 'r', 1687: 'u', 1717: 'l', 1756: 'd', 1787: 'r', 1827: 'u', 1863: 'd', 1914: 'l', 1964: 'r', 1985: 'd', 2013: 'l', 2028: 'u', 2037: 'r', 2059: 'd', 2070: 'l', 2089: 'u', 2116: 'd', 2135: 'r', 2157: 'l', 2182: 'u', 2212: 'l', 2228: 'd', 2252: 'u', 2261: 'l', 2290: 'd', 2315: 'r', 2351: 'l', 2374: 'u', 2393: 'd', 2412: 'r', 2436: 'u', 2460: 'l', 2483: 'd', 2509: 'l', 2535: 'd', 2560: 'l', 2583: 'd', 2606: 'u', 2630: 'l',2655: "d",2684:"r"}
var lefts = []
var ups = []
var downs = []
var rights = []
var frameCounter = 0;
var score = 0;
var combo = 0;
var started = false;


function addLeft(){
    var newNote = document.createElement("div");
    newNote.setAttribute("class","leftNote");
    newNote.style.top = "500px"
    lefts.push(newNote);
    document.getElementById("game").appendChild(newNote);
}

function addRight(){
    var newNote = document.createElement("div");
    newNote.setAttribute("class","rightNote");
    newNote.style.top = "500px"
    rights.push(newNote);
    document.getElementById("game").appendChild(newNote);
}

function addUp(){
    var newNote = document.createElement("div");
    newNote.setAttribute("class","upNote");
    newNote.style.top = "500px"
    ups.push(newNote);
    document.getElementById("game").appendChild(newNote);
}

function addDown(){
    var newNote = document.createElement("div");
    newNote.setAttribute("class","downNote");
    newNote.style.top = "500px"
    downs.push(newNote);
    document.getElementById("game").appendChild(newNote);
}

function updateTop(n, i){
    var top = n.style.top;
    top = top.substring(0,top.length - 2);
    return (Number(top) + i).toString() + "px";
}

function getTop(n){
    var top = n.style.top;
    top = top.substring(0,top.length - 2);
    return Number(top)
}

function updateFrame(){
    var newNote = notes[frameCounter];
    if(newNote != undefined){
        switch (newNote){
            case 'l':
                addLeft();
                break;
            case 'r':
                addRight();
                break;
            case 'u':
                addUp();
                break;
            case 'd':
                addDown();
                break;
            default:
                break;
        }
    }
    var markedForRemoval = [];
    for(const l of [lefts,rights,ups,downs]){
        for(const n of l){
            n.style.top = updateTop(n,-4);
            if(getTop(n) < 0){
                markedForRemoval.push(l);
            }
        }
    }

    for(const r of markedForRemoval){
        console.log("Bruh");
        r.shift().style.display = "none";
    }


    frameCounter++;
}

function addScore(d){
    combo++;
    if(d<5){
        document.getElementById("reaction").innerHTML = "Perfect!"
        document.getElementById("reaction").style.color = "green";
        score += 3 * combo;
    }else if(d<20){
        document.getElementById("reaction").innerHTML = "Good!"
        document.getElementById("reaction").style.color = "blue";
        score += 2 * combo;
    }else{
        document.getElementById("reaction").innerHTML = "Ok."
        document.getElementById("reaction").style.color = "yellow";
        score += combo;
    }
    if(score > 1000){
        document.getElementById("link").style.display = "block"
    }
}

function getDisplacement(n){
    if(n == undefined){
        return 100;
    }
    return Math.abs(getTop(n) - 30);
}

function whiff(){
    combo = 0;
    document.getElementById("reaction").innerHTML = "Oof!"
    document.getElementById("reaction").style.color = "red";
}

window.onkeydown = function(e){
    var key = e.key;
    if(key == "ArrowLeft"){
        var diff = getDisplacement(lefts[0]);
        if(diff < 50){
            lefts.shift().style.display = "none";
            addScore(diff);
        }else{
            whiff();
        }
    }
    if(key == "ArrowRight"){
        var diff = getDisplacement(rights[0]);
        if(diff < 50){
            rights.shift().style.display = "none";
            addScore(diff);
        }else{
            whiff();
        }
    }
    if(key == "ArrowUp"){
        var diff = getDisplacement(ups[0])
        if(diff < 50){
            ups.shift().style.display = "none";
            addScore(diff);
        }else{
            whiff();
        }
    }
    if(key == "ArrowDown"){
        var diff = getDisplacement(downs[0]);
        if(diff < 50){
            downs.shift().style.display = "none";
            addScore(diff);
        }else{
            whiff();
        }
    }

    if(key == " "){
        if(!started){
            song.play()
            setInterval(updateFrame, 1000/60);
            document.getElementById("reaction").innerHTML = "";
            started = true;
        }
    }
    document.getElementById("score").innerHTML = score;
    document.getElementById("combo").innerHTML = combo;
    console.log(score);
}
var song = new Audio("./ddrsong.wav")
