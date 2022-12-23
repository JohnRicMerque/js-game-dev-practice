// Parallax effect is when foreground layer moves faster than background layer

// HTML Canvas environment
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 5; 

// importing and sourcing images
const backgroundLayer1 = new Image();
const backgroundLayer2 = new Image();
const backgroundLayer3 = new Image();
const backgroundLayer4 = new Image();
const backgroundLayer5 = new Image();

backgroundLayer1.src = './images/layer-1.png'
backgroundLayer2.src = './images/layer-2.png'
backgroundLayer3.src = './images/layer-3.png'
backgroundLayer4.src = './images/layer-4.png'
backgroundLayer5.src = './images/layer-5.png'

// SLIDER
const slider = document.getElementById("slider");
slider.value = gameSpeed

const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;

// change event triggers when a value is changed, e here is the event object, e.target is the selected target of the event which is the slider
slider.addEventListener('change', function(e){
    gameSpeed = e.target.value
    showGameSpeed.innerHTML = gameSpeed;
})

// let x = 0;
// let x2 = 2400;

// main animation loop

// what happens is the images are created twice side by side, one is positioned at 0 and the other one is positioned on 0 + sprite width to be horizontally beside the other. The canvas will display a small cutout of the image, and the image moves by changing x position.

// there are 2 variables for x positions to be decremented in each frame. This will move it to the left.

// the if else condition will make sure that if the image is 2400 on the left, it will reset the x position of the image and place it on the right again. This creates an endless moving background effect.

// function animate(){
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
//     ctx.drawImage(backgroundLayer4, x,0);
//     ctx.drawImage(backgroundLayer4, x2,0);

//     if (x < -2400) x = 2400 + x2 - gameSpeed; // 2400 is the width of sprite image in px

//     // to fix gap in the animation we add x2 - gameSpeed

//     else x-= gameSpeed; // to dynamically change scrolling speed based on gameSpeed variable value
//     if (x2 < -2400) x2 = 2400 + x - gameSpeed;
//     else x2-= gameSpeed;

//     requestAnimationFrame(animate)
// }

// animate()

// CODE REFACTOR

class Layer {
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * speedModifier
    }
    update() {
        this.speed = gameSpeed * this.speedModifier

        // reset position if reached -2400, then fix gaps by adding this.x - this.speed
        if (this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed
        }
        if (this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed 
        }

        // moves image to the left by decrementing x and x2 with the game speed
        this.x = Math.floor(this.x - this.speed); 
        this.x2 = Math.floor(this.x2 - this.speed);    
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this. width, this.height)
        ctx.drawImage(this.image, this.x2, this.y, this. width, this.height)
    }
}

const layer1 = new Layer(backgroundLayer1, 0.2)
const layer2 = new Layer(backgroundLayer2, 0.4)
const layer3 = new Layer(backgroundLayer3, 0.6)
const layer4 = new Layer(backgroundLayer4, 0.8)
const layer5 = new Layer(backgroundLayer5, 1)

const gameObjects = [layer1, layer2, layer3, layer4, layer5]

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // for each array element, which is here called object, call this callback function that uses update and draw method of the layer instance
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    })

    requestAnimationFrame(animate);
};

animate();