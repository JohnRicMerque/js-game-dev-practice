import { StandingLeft, StandingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight } from "./state.js";

export default class Player {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this), new SittingRight(this), new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this), new FallingLeft(this), new FallingRight(this)];
        this.currentState = this.states[1];
        this.image = document.getElementById('dogImage')
        this.width = 200;
        this.height = 181.83;
        this.x = this.gameWidth/2 - this.width/2;
        this.y = this.gameHeight - this.height;
        this.vy = 0;
        this.weight = 1; // gravity
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 6
        this.speed = 0;
        this.maxSpeed = 10; // dog speed
        this.fps = 30 // frame speed, how fast animation is
        this.frameTimer = 0; // houses increments in time
        this.frameInterval = 1000/this.fps // time interval that measures how long each frame should be run, relative to fps
    }
    draw(context, deltaTime){
        if (this.frameTimer > this.frameInterval){
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0; // animation sprite loop
            this.frameTimer = 0;
        } else this.frameTimer += deltaTime;   

        context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(input){ // argument here is string last key like "PRESSED ArrowLeft"
        this.currentState.handleInput(input) // this.currentState here is a state instance like new StandingLeft(this) handles input that will determine set State

        // horizontal movement
        this.x += this.speed;

        // horizontal boudaries
        if (this.x <= 0) this.x = 0;
        else if (this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width;

        // vertical movement
        this.y += this.vy
        if (!this.onGround()){ // if player is mid air
            this.vy += this.weight; // gravity effect
        } else {
            this.vy = 0
        }
        
        // vertical boundaries
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height

    }
    setState(state){ // state parameter here will be an index
        this.currentState = this.states[state] // select current state object based on the index in states array
        this.currentState.enter(); // changes the frameY which is essentially which sprite animation is used
    }
    onGround(){
        return this.y >= this.gameHeight - this.height
    }
}