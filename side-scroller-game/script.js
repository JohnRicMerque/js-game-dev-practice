window.addEventListener('load', function(){ // waits for all assets to load before executing callback function

    // canvas setup 
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d')
    canvas.width = 800;
    canvas.height = 720;

    class InputHandler { // concept: adds pressed keys in keys array, deletes them when player removes hold of that key. esentially array only holds presently pressed keys
        constructor(){
            this.keys = []; // houses all keys pressed
            window.addEventListener('keydown', e => { // ES6 arrow function is used to inherit 'this' from parent class (lexical scoping)
                if ((   e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight')
                        && this.keys.indexOf(e.key) === -1){ // if key pressed and if key pressed is not present in the array yet execute code block below
                    this.keys.push(e.key)
                }
            });
            window.addEventListener('keyup', e => { 
                if (    e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight'){ 
                    this.keys.splice(this.keys.indexOf(e.key), 1) // deletes unhold keys
                }
            })

        }
    }

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage');
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
        }
        draw(context){
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,  this.x, this.y, this.width, this.height)
        }
        update(){
            this.x += this.speed; // horizontal motion
        }
    }

    class Background {

    }

    class Enemy {

    }

    function handleEnemies(){

    }

    function displayStatusText(){

    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);

    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        player.draw(ctx)
        player.update()
        requestAnimationFrame(animate)
    }

    animate(0);
})