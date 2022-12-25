/** @type {HTMLCanvasElement} */ 
// for Vscode to suggest canvas methods

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

const numberOfEnemies = 50;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
    constructor(){
        this.image = new Image()
        this.image.src = "./images/enemy1.png";
        this.spriteWidth = 293;
        this.spriteHeight = 155;

        // here we divide width and height by 2.5 to retain aspect ratio while also scaling image size lower
        this.width = this.spriteWidth/2.5;
        this.height = this.spriteHeight/2.5;

        // here enemy objects will pop out randomly inside the canvas, - this.width is put to avoid animation bleeding out the canvas
        this.x = Math.random() * (canvas.width - this.width); 
        this.frame = 0;
        this.y = Math.random() * (canvas.height - this.width);
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    } // random number from 1 to 4

    update(){
        // for motion a random number from - 2.5 to 2.5 which is 5 in length difference will be added to the initial x and y values from the constructor
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;

        // for animating sprites using ternary operator, if this frame is greater than 4, reset it to zero else increment this.frame
        if (gameFrame % this.flapSpeed === 0){ // if game frame is divisible by flap speed which is a random number, this randomizes flap speed beacuse incrementing frame is only run when divisibility is true, and they are random dure to Math.random in flapspeed
            this.frame > 4? this.frame = 0: this.frame++;
        }
        
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height); // this frame x spritewith as x value makes sure the images are switched to the next sprite based on the frame attribute
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