export default class InputHandler {
    constructor(paddle) {
        document.addEventListener("keydown", event => {
            switch(event.key) {

              case "ArrowRight":
                paddle.moveRight();
                break

              case "ArrowLeft":
                paddle.moveLeft();
                break
            }
        })
        
        document.addEventListener("keyup", event => {
            switch(event.key) {

            // keyup means buttons are unpressed

              case "ArrowRight":
                if (paddle.speed > 0) // to stop only when paddle is moving right
                    paddle.stop();
                    break

              case "ArrowLeft":
                if (paddle.speed < 0)
                    paddle.stop(); // to stop only when paddle is moving left
                    paddle.stop();
                    break
            }
        }) 
    }
}