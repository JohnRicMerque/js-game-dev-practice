/** @type {HTMLCanvasElement} */ 
// for Vscode to suggest canvas methods

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

const numberOfEnemies = 100;
const enemiesArray = [];

const enemyImage = new Image();
enemyImage.src = "./images/enemy1.png"

let gameFrame = 0;

class Enemy {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.speed = Math.random() * 4 - 2; // 4 numbers, starts with -2 so it returns random num from -2 to +2
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth/2.5;
        this.height = this.spriteHeight/2.5; 
        this.frame = 0;
    }
    update(){
        // for motion
        this.x += this.speed;
        this.y += this.speed;
        // for animating sprites using ternary operator, if this frame is greater than 4, reset it to zero else increment this.frame
        if (gameFrame % 2 === 0){ // if game frame is even only then increment, this slows down animation
            this.frame > 4? this.frame = 0: this.frame++;
        }
        
    }
    draw(){
        ctx.drawImage(enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height); // this frame x spritewith as x value makes sure the images are switched to the next sprite based on the frame attribute
    }
};

// appending Enemy Objects in the enemiesArray 
for (let i = 0; i < numberOfEnemies; i++){
    enemiesArray.push(new Enemy());
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    } ) // forEach calls a function for every item in the array, each item is refered here as "enemy"

    requestAnimationFrame(animate)
    gameFrame++;
}
animate();