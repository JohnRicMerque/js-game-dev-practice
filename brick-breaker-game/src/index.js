// module imports
import Game from './game.js';

// canvas setup
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 800
const GAME_HEIGHT = 600

// set color
ctx.fillStyle = "#0f0"

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

game.start();

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime; // delta time is the time interval between each frame 
    lastTime = timestamp; 

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); 
    
    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
 

// NOTES 

// make rectangle (x, y, width, height)
// ctx.fillRect(20, 20, 100, 100);

// set color again to change
// ctx.fillStyle = "#ff0"
// ctx.fillRect(200, 20, 50, 50);

// to clear previous elements every frame (x, y, dimensions of canvas)
// ctx.clearRect(0, 0, 800, 600)