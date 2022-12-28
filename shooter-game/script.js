const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextRaven = 0; // accumulate ms values between frames until it reaches interval value and trigger next frame
let ravenInterval = 500; // value in miliseconds, everytime it accumulates enough to reach 500ms it triggers next raven and resets 0
let lastTime = 0; // holds value of timestamp

let ravens = [];

class Raven {
    constructor(){
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random()* 0.4 + 0.4; // to randomize raven size
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier; // the size modifier was multiplied with the object width and height for scaling
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height); // this means any number from 0 to just above the size of a sprite image below in y axis so that no raven is cut below canvas ground
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = './images/raven.png'
        this.frame = 0; // sprite animation index frame
        this.maxFrame = 4; // last sprite animation index
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50; // time (ms) for each flap of raven wings


    }
    update(deltaTime){
        this.x -= this.directionX;
        if (this.x < 0 - this.width) // if the object is way past the canvas its marked for deletion in the array
        this.markedForDeletion = true;
        
        // utilzing delta time to unify speed across devices with different processing speed
        this.timeSinceFlap += deltaTime;
        if (this.timeSinceFlap > this.flapInterval) {
            // for sprite animation to cycle
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            // reset var
            this.timeSinceFlap = 0;
        }

    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width,this.height)
    }
}

const raven = new Raven();

function animate(timestamp){ // timestamp is a built in argument that calculates how much time elapsed while running frames
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let deltaTime = timestamp - lastTime; // this calculates time between frames

    lastTime = timestamp; 
    timeToNextRaven += deltaTime // adds that consistent time between frames refered as deltaTime to the variable timeToNextRaven

    if (timeToNextRaven > ravenInterval) { // when timeToNextRaven variable reaches the time we set to trigger raven in raven interval (500ms), we create the object
        ravens.push(new Raven());
        timeToNextRaven = 0;
    };

    [...ravens].forEach(object => object.update(deltaTime)); // spread operator is used to have multiple elements be run simultaneously
    [...ravens].forEach(object => object.draw())

    // this deletes ravens outside canvas
    ravens = ravens.filter(object => !object.markedForDeletion) // reassign ravens array with the filtered array that returns only objects that is not marked for deletion

    requestAnimationFrame(animate)
}

animate(0) // we set 0 to the timestamp argument because its first value is undefined and it causes NaN values for our calculations