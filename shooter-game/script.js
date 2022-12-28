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
        this.width = 100;
        this.height = 50;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
    }
    update(){
        this.x -= this.directionX;
    }
    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
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

    [...ravens].forEach(object => object.update()); // spread operator is used to have multiple elements be run simultaneously
    [...ravens].forEach(object => object.draw())

    requestAnimationFrame(animate)
}

animate(0) // we set 0 to the timestamp argument because its first value is undefined and it causes NaN values for our calculations