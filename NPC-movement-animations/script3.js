/** @type {HTMLCanvasElement} */ 
// for Vscode to suggest canvas methods

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

const numberOfEnemies = 20;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
    constructor(){
        this.image = new Image()
        this.image.src = "./images/enemy3.png";
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;

        

        // here we divide width and height by 2.5 to retain aspect ratio while also scaling image size lower
        this.width = this.spriteWidth/2.5;
        this.height = this.spriteHeight/2.5;

        // here enemy objects will pop out randomly inside the canvas, - this.width is put to avoid animation bleeding out the canvas
        this.x = Math.random() * (canvas.width - this.width); 
        this.frame = 0;
        this.y = Math.random() * (canvas.height - this.width);
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 2; // how fast they circulate
        this.curve = Math.random() * 200 + 50; // the space in the center
    }

    update(){
        // for cicular motion
        this.x = this.curve * Math.sin(this.angle * Math.PI/180) + canvas.width/2 - this.width/2;
        this.y = this.curve * Math.cos(this.angle * Math.PI/180) + canvas.height/2 - this.height/2;
        this.angle += this.angleSpeed; 

        //resets the x position on the right if its on the far left
        if (this.x + this.width < 0) this.x = canvas.width;

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