document.addEventListener('DOMContentLoaded', function(){ // run all code when all elements have been loaded

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 800;

    class Game {
        constructor(ctx, width, height){ // to avoid using global variables, use parameters
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 500; // time (ms) interval before adding new enemy
            this.enemyTimer = 0; // timer resets to 0 when reaches 400
            this.enemyTypes = ['worm', 'ghost']; 
        }
        update(deltaTime){
            this.enemies = this.enemies.filter(object => !object.markedForDeletion) // deletes enemy elements passing out the canvas by reassigning values of the array to house only objects that are not marked for deletion (false value)
            if (this.enemyTimer > this.enemyInterval){
                this.#addNewEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach(object => object.update(deltaTime));
        }
        draw(){
            this.enemies.forEach(object => object.draw(this.ctx))

        }
        #addNewEnemy(){ // if method starts with hash it is a private class method and can only be called within the class (here, Game class)
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)] // to randomize enemy types -  select randomly from enemyTypes Array by randomizing index from 0 to length of array and estimating floor to remove decimals 

            if (randomEnemy == 'worm') {
                this.enemies.push(new Worm(this)); // this inside enemy refers to the Game class
            } else if (randomEnemy == 'ghost'){
                this.enemies.push(new Ghost(this));
            }

            this.enemies.sort(function(a,b){ // so that enemy elements with higher vertical value (y) are on top of those with lower to have that 2d space effect
                return a.y - b.y; 
            })

        }
    }

    class Enemy {
        constructor(game) {
            this.game = game;
            this.markedForDeletion = false
        }
        update(deltaTime){
            this.x -= this.speed * deltaTime; // we use delta time here we multiply but it will make sure same pacing is done to enemy objects
            if (this.x < 0 - this.width) this.markedForDeletion = true;
        }
        draw(ctx){
            ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
    }

    class Worm extends Enemy{ // subclassing, worm inherits from parent class Enemy
        constructor(game){
            super(game) // takes all constructor properties from the parent class (Game
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.width = this.spriteWidth/2;
            this.height = this.spriteHeight/2;
            this.x = game.width;
            this.y = this.game.height - this.height; // makes worm only on ground
            this.image = worm; // this syntax utilizes the images in the html DOM, by calling its id no need for selector
            this.speed = Math.random() * 0.1 + 0.1;
        }

    }

    class Ghost extends Enemy{ // subclassing, worm inherits from parent class Enemy
        constructor(game){
            super(game) // takes all constructor properties from the parent class (Game
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            this.width = this.spriteWidth/2;
            this.height = this.spriteHeight/2;
            this.x = game.width;
            this.y = Math.random() * this.game.height * 0.7; // multiplying 0.8 here makes ghost only appear on 80% of the canvas from above
            this.image = ghost; // this syntax utilizes the images in the html DOM, by calling its id no need for selector
            this.speed = Math.random() * 0.3 + 0.1;
            this.angle = 0;
            this.curve = Math.random() * 3;
        }
        update(deltaTime){
            super.update(deltaTime); // super is parent class, we are calling its update method here (Enemy class)
            this.y += Math.sin(this.angle) * this.curve;
            this.angle += 0.04 // for random wavy motion
        }
        draw(){
            ctx.save();
            ctx.globalAlpha = 0.7; // this is like fill style but for opacity, here we use ctx save and restore to only apply codeblocks in the middle, and reset when its done. so ghosts are the only elements with opacity modified
            super.draw(ctx) // super is parent class, we are calling its draw method here (Enemy class)
            ctx.restore();
        }

    }

    const game = new Game(ctx, canvas.width, canvas.height);


    let lastTime = 1;
    
    function animate(timeStamp){
        ctx.clearRect(0,0,canvas.width,canvas.height) // clear canvas every frame

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        game.update(deltaTime);
        game.draw();

        requestAnimationFrame(animate); // call animate function this makes animation loops
    }
    
    animate(0);
});

// an improved code structure that avoids global variables code repitition, uses deltaTime, private methods, class inheritance or sub classing