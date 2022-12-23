// Parallax effect is when foreground layer moves faster than background layer

// HTML Canvas environment
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 15 

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

let x = 0;
let x2 = 2400;

// main animation loop

// what happens is the images are created twice side by side, one is positioned at 0 and the other one is positioned on 0 + sprite width to be horizontally beside the other. The canvas will display a small cutout of the image, and the image moves by changing x position.

// there are 2 variables for x positions to be decremented in each frame. This will move it to the left.

// the if else condition will make sure that if the image is 2400 on the left, it will reset the x position of the image and place it on the right again. This creates an endless moving background effect.

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.drawImage(backgroundLayer4, x,0);
    ctx.drawImage(backgroundLayer4, x2,0);

    if (x < -2400) x = 2400 + x2 - gameSpeed; // 2400 is the width of sprite image in px

    // to fix gap in the animation we add x2 - gameSpeed

    else x-= gameSpeed; // to dynamically change scrolling speed based on gameSpeed variable value
    if (x2 < -2400) x2 = 2400 + x - gameSpeed;
    else x2-= gameSpeed;

    requestAnimationFrame(animate)
}

animate()