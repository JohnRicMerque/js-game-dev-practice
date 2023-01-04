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
            this.speed = 0; // horizontal speed
            this.vy = 0; // vertical speeed
            this.weight = 1;
        }
        draw(context){
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,  this.x, this.y, this.width, this.height)
        }
        update(input){
            // horizontal motion
            this.x += this.speed;
            if (input.keys.indexOf('ArrowRight') > -1){ // index of here checks if a key is in the array
                this.speed = 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1){
                this.speed = -5;
            } else if ((input.keys.indexOf('ArrowUp') > -1) && this.onGround()){ // jump only when player is on ground
                this.vy -= 32;
            } else {
                this.speed = 0;
            }
            
            // horizontal boundaries
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width

            // vertical motion
            this.y += this.vy;
            if (!this.onGround()){
                this.vy += this.weight;
            } else {
                this.vy = 0;
            }

            // vertical boundaries
            if (this.y >= this.gameHeight - this.height){
                this.y = this.gameHeight - this.height
            }
        }
        onGround(){
            return this.y >= this.gameHeight - this.height;
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
        player.update(input)
        requestAnimationFrame(animate)
    }

    animate(0);
})