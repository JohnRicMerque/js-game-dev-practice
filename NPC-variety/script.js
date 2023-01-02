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
            this.enemyInterval = 1000; // time (ms) interval before adding new enemy
            this.enemyTimer = 0; // timer resets to 0 when reaches 400 
        }
        update(deltaTime){
            this.enemies = this.enemies.filter(object => !object.markedForDeletion) // deletes enemy elements passing out the canvas by reassigning values of the array to house only objects that are not marked for deletion (false value)
            if (this.enemyTimer > this.enemyInterval){
                this.#addNewEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach(object => object.update());
        }
        draw(){
            this.enemies.forEach(object => object.draw(this.ctx))

        }
        #addNewEnemy(){ // if method starts with hash it is a private class method and can only be called within the class (here, Game class)
            this.enemies.push(new Enemy(this)); // this inside enemy refers to the Game class

        }
    }

    class Enemy {
        constructor(game) {
            this.game = game;
            this.x = game.width;
            this.y = Math.random() * this.game.height;
            this.width = 100;
            this.height = 100;
            this.markedForDeletion = false
        }
        update(){
            this.x--;
            if (this.x < 0 - this.width) this.markedForDeletion = true;
        }
        draw(ctx){
            ctx.fillRect(this.x, this.y, this.width, this.height)
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