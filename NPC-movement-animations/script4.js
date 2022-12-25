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
        this.image.src = "./images/enemy4.png";
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 213;
        this.spriteHeight = 213;

        // here we divide width and height by 2.5 to retain aspect ratio while also scaling image size lower
        this.width = this.spriteWidth/2.5;
        this.height = this.spriteHeight/2.5;

        // here enemy objects will pop out randomly inside the canvas, - this.width is put to avoid animation bleeding out the canvas
        this.x = Math.random() * (canvas.width - this.width); 
        this.frame = 0;
        this.y = Math.random() * (canvas.height - this.height);
        this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height); 
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 50); 

    }

    update(){

        if (gameFrame % this.interval === 0){ // means will run every (value of this.interval)th frame which indicates how fast they change position
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height); 
        }

        // distances between current and new position
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;

        // the divided value here will determine motion and not abrupt pop out because it gradually decrements position until next 60th frame, this determines speed of the motion of sprites
        this.x -= dx/20;
        this.y -= dy/20;

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