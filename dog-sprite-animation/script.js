// Reference : Sprite Animation in JavaScript by Franks Laboratory
// Youtube Link : https://www.youtube.com/watch?v=CY0HE277IBM&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=1&ab_channel=Frankslaboratory

let playerState = 'run'
const dropdown = document.getElementById('animations')
dropdown.addEventListener('change', function(e){ // to designate player state from the clicked option in the drop down
    playerState = e.target.value;
})

// CANVAS SETUP
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = './images/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 5;

const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
        
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'getHit',
        frames: 4
    }
];


// think of sprite image as a grid, and we're just zooming out individual images and sliding through every small image in a loop to make an animated motion effect

animationStates.forEach((state, index) => { 
    // this will loop through every object in the array "animationStates" and each object will be refered as "state" while "index" is the index of the object being passed 
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) { // create a loop incrementing in response to the number of frames of the objects
        let positionX = j * spriteWidth; // gets us every x position of all sprite cutout for one animation
        let positionY = index * spriteHeight; // gets us the constant y position for each animation
        frames.loc.push({x: positionX, y: positionY}) // then push objects with x and y positions of every sprite cutout for one animation strip to the initialized list "frames" 
    }
    spriteAnimations[state.name] = frames; // adds the variable frames (with the list of locations) to the spriteAnimations array and referenced it the name of the animation
}) 

function animate(){
    // this is the main animation loop and it runs all code blocks underneath through every frame
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clears the whole canvas for every frame iteration
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) s values determine what image is cut out from sprite, d values determine where it's displayed on the canvas and how big
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)

    gameFrame++;
    requestAnimationFrame(animate);
};

animate();
