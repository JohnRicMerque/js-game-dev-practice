import Paddle from './paddle.js';
import InputHandler from './input.js'
import Ball from './ball.js'
import Brick from './brick.js';

export default class Game {

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight
    }

    start() {
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        // let brick = new Brick(this, {x: 20, y:20})

        let bricks = [];
        for(let i=0; i<10; i++) {
            bricks.push(new Brick(this, {x: i*52, y: 30}))
        }

        this.gameObjects = [this.ball, this.paddle, ...bricks];
        
        // to control the paddle
        new InputHandler(this.paddle);
    }

        //search
    update(deltaTime) {
        this.gameObjects.forEach(object => object.update(deltaTime))
    
    }

    draw(ctx) {
        this.gameObjects.forEach(object => object.draw(ctx))
    }

    
}