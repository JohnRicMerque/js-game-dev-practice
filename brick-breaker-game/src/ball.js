export default class Ball {
    constructor(game) {
        this.image = document.getElementById("img_ball");
        this.size = 20;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.position = {
            x: 10,
            y: 10
        }
        this.speed = {
            x: 4,
            y: 2
        };

    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size); // (position x, position y, width, height)
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // checks if ball hits wall on left or right
        if(this.position.x > this.gameWidth - this.size|| this.position.x < 0) {
            this.speed.x = -this.speed.x
        }
        
        // checks if ball hits wall on top or bottom
        if(this.position.y > this.gameHeight - this.size|| this.position.y < 0) {
            this.speed.y = -this.speed.y
        }

        //check collision with paddle
        let bottomOfBall = this.position.y + this.size;
        let topOfPaddle = this.game.paddle.position.y;
        let leftSideOfPaddle = this.game.paddle.position.x;
        let rightSideOfPaddle = this.game.paddle.position.x + this.game.paddle.width;

        if (bottomOfBall >= topOfPaddle &&
            this.position.x >= leftSideOfPaddle &&
            this.position.x <= rightSideOfPaddle) 
            {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;

            // for ball speed up
            if(Math.abs(this.speed.y) < 10 ) {this.speed.y *= 1.5};
        }
    }
}