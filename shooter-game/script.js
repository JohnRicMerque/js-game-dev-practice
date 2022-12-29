const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// created second canvas to house the colored hit boxes for color collision detection
const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let score = 0; // houses scoring
let gameOver = false;
ctx.font = '50px Impact';

let timeToNextRaven = 0; // accumulate ms values between frames until it reaches interval value and trigger next frame
let ravenInterval = 500; // value in miliseconds, everytime it accumulates enough to reach 500ms it triggers next raven and resets 0
let lastTime = 0; // holds value of timestamp

let ravens = []; // houses all raven objects

class Raven {
    constructor(){
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random()* 0.6 + 0.4; // to randomize raven size
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
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)] // create random colors rgb
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
        this.hasTrail = Math.random() > 0.5; // returns random true or false value because Math.random returns random number between 0 and 1

    }
    update(deltaTime){
        // for ravens to bounce of ones they reach uppermost and lowermost part of canvas
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY *= -1;
        }

        // for raven motion and direction
        this.x -= this.directionX;
        this.y += this.directionY;

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

            if (this.hasTrail) {
                for (let i = 0; i < 5; i++){
                    particles.push(new Particles(this.x, this.y, this.width, this.color)) // add particles using raven attributes in ths code block where we increment each frame to move sprite, to trail it to that raven
                }
            }
        }
        if (this.x < 0 - this.width) gameOver = true; // game over condition


    }
    draw(){
        // for colored hit box on ravens
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height); 

        // for the raven sprite
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width,this.height);
    }
}

let explosions = []; // houses all explosion objects

class Explosions {
    constructor(x, y, size){
        this.image = new Image();
        this.image.src = './images/boom.png'
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = './images/boom.wav'
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.markedForDeletion = false;

    }
    update(deltaTime){
        if (this.frame === 0) this.sound.play(); // play audio every start of each explosion sprite animation
        this.timeSinceLastFrame += deltaTime;
        if (this.timeSinceLastFrame > this.frameInterval){ // increase frame index if time since last frame reaches the given interval
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame > 5 ) this.markedForDeletion = true; // after one cyle for the sprite animation, mark for deletion
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.size, this.size)
    } 
}

let particles = []; // houses all particle objects

class Particles {
    constructor(x, y, size, color) {
        this.size = size
        this.x = x + this.size/2 + Math.random() * 50 - 25; // add division of this.size to make particles position like a trail
        this.y = y + this.size/3;
        this.radius = Math.random() * this.size/10;
        this.maxRadius = Math.random() * 20 + 35;
        this.markedForDeletion = false;
        this.speedX = Math.random() * 1 + 0.5;
        this.color = color;
    }
    update(){
        this.x += this.speedX;
        this.radius += 0.5;
        if (this.radius > this.maxRadius - 5) this.markedForDeletion = true; // -5 is to fix blinking trails
    }
    draw(){
        ctx.save();
        ctx.globalAlpha = 1 - this.radius/this.maxRadius; // for opacity
        ctx.beginPath(); 
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore(); // we use ctx save to capture only this element, and restores canvas settings to the original after using ctx restore, this is to make sure modifications on this code block does not affect everything everytime on canvas
    }
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 50, 75)
}

function drawGameOver(){
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText('Game Over, your score is '+ score, canvas.width/2, canvas.height/2);
}

// scans the hitbox canvas
window.addEventListener('click', function(e){
    // get color data in clicking boxes
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1); 
    const pc = detectPixelColor.data;

    ravens.forEach(object => {
        // comparing color data in constructor with the one clicked, if same color delete the raven and add score
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) { // for each object check which raven has hitbox color same as the clicked and mark it for deletion
            object.markedForDeletion = true;
            score++;
            explosions.push(new Explosions(object.x, object.y, object.width)) // note that object here refers to every instance of raven in the ravens array;
        }
    })
})

function animate(timestamp){ // timestamp is a built in argument that calculates how much time elapsed while running frames
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height); // clearing all previous animation each loop

    let deltaTime = timestamp - lastTime; // this calculates time between frames

    lastTime = timestamp; 
    timeToNextRaven += deltaTime // adds that consistent time between frames refered as deltaTime to the variable timeToNextRaven

    if (timeToNextRaven > ravenInterval) { // when timeToNextRaven variable reaches the time we set to trigger raven in raven interval (500ms), we create the object
        ravens.push(new Raven());
        timeToNextRaven = 0;

        // to make larger ravens be drawn first and on top of the smaller ones
        ravens.sort(function(a,b){
            return a.width - b.width
        })
    };

    drawScore();

    [...particles, ...ravens, ...explosions].forEach(object => object.update(deltaTime)); // spread operator is used to have multiple array elements be run simultaneously 
    // NOTE THAT THE ORDER IN THIS CODE DETERMINES LAYERS, like which is on top of the other, particles is drawn first so that they are behind raven and explosion 
    [...particles, ...ravens, ...explosions].forEach(object => object.draw())

    // this deletes ravens outside canvas
    ravens = ravens.filter(object => !object.markedForDeletion) // reassign ravens array with the filtered array that returns only objects that is not marked for deletion, the same is true for explosions and particles below
    explosions = explosions.filter(object => !object.markedForDeletion)
    particles = particles.filter(object => !object.markedForDeletion)

    if (!gameOver) requestAnimationFrame(animate);
    else drawGameOver();
}

animate(0) // we set 0 to the timestamp argument because its first default value is undefined and it causes NaN values for our calculations