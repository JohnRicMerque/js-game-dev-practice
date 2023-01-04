window.addEventListener('load', function(){ // waits for all assets to load before executing callback function

    // canvas setup 
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d')
    canvas.width = 800;
    canvas.height = 720;
    let enemies = []

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
            this.maxFrame = 8;
            this.frameY = 0;
            this.fps = 20; // how fast we swap between indiv animation frames in sprite sheet
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speed = 0; // horizontal speed
            this.vy = 0; // vertical speeed
            this.weight = 1;
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,  this.x, this.y, this.width, this.height)
        }
        update(input, deltaTime){
            // sprite animation
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0; 
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }

            // horizontal motion
            this.x += this.speed;

            // controls
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
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

            // vertical motion
            this.y += this.vy;
            if (!this.onGround()){ // if player not on ground
                this.vy += this.weight; // add vertical speed
                this.maxFrame = 5;
                this.frameY = 1; // changes sprite sheet 
            } else {
                this.vy = 0;
                this.frameY = 0; // reset sprite sheet and vertixal speed
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
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage')
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 7;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height); // two backgrounbds are drawn side by side to create an illusion of endless background. -this.speed accounts for small gap 
        }
        update(){
            this.x -= this.speed
            if (this.x < 0 - this.width){ // background scrolled offscreen
                this.x = 0; // reset background
            } 
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 160;
            this.height = 119;
            this.image = document.getElementById('enemyImage');
            this.x = gameWidth;
            this.y = gameHeight - this.height;
            this.frameX = 0;
            this.maxFrame = 5;
            this.fps = 20; // how fast we swap between indiv animation frames in sprite sheet
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speed = 8;
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
        }
        update(deltaTime){
            if (this.frameTimer > this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            } // animate spritesheet relative to deltaTime
            this.x -= this.speed; // move to the left
        }
    }

    function handleEnemies(deltaTime){
        if (enemyTimer > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width, canvas.height));
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx)
            enemy.update(deltaTime)
        })
    }

    function displayStatusText(){

    }

    // class instantiate
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height)

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0,0,canvas.width,canvas.height)
        background.draw(ctx)
        background.update()
        player.draw(ctx)
        player.update(input, deltaTime)
        handleEnemies(deltaTime)
        requestAnimationFrame(animate)
    }

    animate(0); // we pass 0 because this is outside request animation frame which has autogenerated timstamp argument
})