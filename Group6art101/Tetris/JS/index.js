var stuck = false;
var speed = 1000;
var score = 0;
var updater = setInterval(updateBoard,speed);
var left = [
    [1,0],
    [1,0],
    [1,1]
]

var right = [
    [0,2],
    [0,2],
    [2,2]
]

var line = [
    [3],
    [3],
    [3],
    [3]
]

var square = [
    [4,4],
    [4,4],
]

var fork = [
    [0,5,0],
    [5,5,5]
]

var squigLeft = [
    [6,6,0],
    [0,6,6]
]

var squigRight = [
    [0,7,7],
    [7,7,0]
]

var board = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
]

var curPiece = newPiece();

var pieces = {};

function rotatePiece(){
    var rV = [];
    for(var x = curPiece.piece[0].length - 1; x >= 0; x--){
        console.log("Dude");
        var curRow = []
        for(var y = 0; y < curPiece.piece.length; y++){
            console.log("Bruh");
            curRow.push(curPiece.piece[y][x]);
        }
        rV.push(curRow);
    }
    console.log(rV);
    return rV;
}



function copyPiece(p){
    var rV = [];
    for(var y = 0; y<p.length; y++){
        var newRow = [];
        for(var x = 0; x<p[0].length; x++){
            newRow.push(p[y][x]);
        }
        rV.push(newRow);
    }
    return rV;
}


function setup(){
    var board = document.getElementById("tetris");
    for(var y = 0; y<12; y++){
        for(var x = 0; x<9; x++){
            var newSquare = document.createElement("div");
            newSquare.className = "square";
            newSquare.id = x.toString() + "-" + y.toString();
            newSquare.setAttribute("onmouseover","clearSquare(this)");
            board.appendChild(newSquare);
        }
    }
}

function newPiece(){
    var i = Math.floor(Math.random() * 7) + 1;
    switch(i){
        case 1:
            return {piece: left, x: 4, y: -2};
            break;
        case 2:
            return {piece: right, x: 4, y: -2};
            break;
        case 3:
            return {piece: line, x: 4, y: -2};
            break;
        case 4:
            return {piece: square, x: 4, y: -2};
            break;
        case 5:
            return {piece: fork, x: 4, y: -2};
        case 6:
            return {piece: squigLeft, x: 4, y: -2};
            break;
        case 7:
            return {piece: squigRight, x: 4, y: -2};
        default:
            break;

    }
}

function clearSquare(obj){
    obj.style.backgroundColor = "white"
}

function collapseColumn(i){
    for(var y = i; y>1; y--){
        board[y] = [...board[y - 1]];
    }
    board[0] = [0,0,0,0,0,0,0,0,0];
}

function drawBoard(){
    var newBoard = copyPiece(board);
    var stuck = false;
    if(colliding(curPiece)){
        stuck = true;
        curPiece.y--;
    }
    for(var y = 0; y < curPiece.piece.length; y++){
        for(var x = 0; x < curPiece.piece[0].length; x++){
            if(curPiece.piece[y][x] != 0){
                var bX = curPiece.x + x;
                var bY = curPiece.y + y;
                if(bY>=0 && bY<12 && bX>=0 && bX<9){
                    newBoard[bY][bX] = curPiece.piece[y][x];
                }
            }
        }
    }
    for(var y = 0; y<12; y++){
        for(var x = 0; x<9; x++){
            var val = newBoard[y][x];
            var id = x.toString() + "-" + y.toString();
            var curSquare = document.getElementById(id);
            if(val == 0){
                rowsFull = false;
                curSquare.style.backgroundColor = "white";
                curSquare.style.border = "none";
                curSquare.style.width = "50px";
                curSquare.style.height = "50px";
                continue;
            }
            curSquare.style.border = "solid 1px black";
            curSquare.style.width = "48px"
            curSquare.style.height = "48px"
            if(val == 1){
                curSquare.style.backgroundColor = "red";
            }else if(val == 2){
                curSquare.style.backgroundColor = "green";
            }else if(val == 3){
                curSquare.style.backgroundColor = "blue";
            }else if(val == 4){
                curSquare.style.backgroundColor = "yellow";
            }else if(val == 5){
                curSquare.style.backgroundColor = "orange";
            }else if(val == 6){
                curSquare.style.backgroundColor = "cyan";
            }else{
                curSquare.style.backgroundColor = "magenta";
            }
        }
    }
    if(stuck){
        if(curPiece.y < 0){
            alert("You lose");
            clearInterval(updater);
        }
        var additonalScore = 0;
        board = newBoard;
        for(var y = 0; y<12; y++){
            collapse = true;
            for(var x = 0; x<9; x++){
                if(board[y][x] == 0){
                    collapse = false;
                }
            }
            if(collapse){
                additonalScore *= 2;
                additonalScore += 50;
                collapseColumn(y);
            }
        }
        score += additonalScore;
        document.getElementById("score").innerHTML = score;
        if(score >= 50){
            document.getElementById("link").style.display = "inline-flex";
        }
    }
    return stuck;
}


function updateBoard(){
    if(!drawBoard()){
        curPiece.y++;
    }else{
        curPiece = newPiece();
    }

}

function colliding(pieceObj){
    for(var y = 0; y < pieceObj.piece.length; y++){
        for(var x = 0; x < pieceObj.piece[0].length; x++){
            var bX = pieceObj.x + x;
            var bY = pieceObj.y + y;
            if(bY>=0 && bY<12 && bX>=0 && bX<9){
                if(pieceObj.piece[y][x] != 0 && board[bY][bX] != 0){
                    return true;
                }
            }else if(bY>11){
                return true;
            }
        }
    }
    return false;
}

setup();
drawBoard();

window.onkeydown = function(e){
    var key = e.key;
    if(key == "ArrowLeft"){
        if(curPiece.x > 0){
            curPiece.x--;
            if(colliding(curPiece)){
                curPiece.x++;
            }else{
                drawBoard();
            }
        }
    }
    if(key == "ArrowRight"){
        if(curPiece.x + curPiece.piece[0].length < 9){
            curPiece.x++;
            if(colliding(curPiece)){
                curPiece.x--;
            }else{
                drawBoard();
            }
        }
    }
    if(key == "ArrowDown"){
        updateBoard();
    }
    if(key == "ArrowUp"){
        var rotated = {
            piece:rotatePiece(),
            x: curPiece.x,
            y: curPiece.y
        }

        if(rotated.x + rotated.piece[0].length < 10){
            if(!colliding(rotated)){
                curPiece.piece = rotatePiece();
                drawBoard();
            }
        }
    }
    if(key == " "){
        board = [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
        ]
        score = 0;
        curPiece = newPiece();
    }
}
