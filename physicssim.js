// var ctx = document.getElementById("canvas").getContext("2d");

// //Create Var
// var circ = new Circle(100, 100, 20);

// //Define the circle
// function Circle(x, y, r) {
//     "use strict";
//     this.x = (x === null) ? 0 : x;
//     this.y = (y === null) ? 0 : y;
//     this.r = (r === null) ? 0 : r;
    
//     this.fill = function(ctx) {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
//         ctx.fill();
//     }
// }

// //Draw the circle as object
// circ.fill(ctx);

// ------------------

var canvas = document.getElementById("canvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "red";

var state = {
    x: width/2,
    y: height/2
}

function move(dt){
     
}

function update(progress){
    // Update the state of the game
    state.x += progress;

    if(state.x > width){
        state.x -= width;
    }

}

function draw(){
    // Draw the state of the game
    ctx.clearRect(0, 0, width, height)

    ctx.fillRect(state.x - 5, state.y - 5, 10, 10)
}

function loop(timestamp){
    var progress = timestamp - lastRender;

    update(progress);
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);