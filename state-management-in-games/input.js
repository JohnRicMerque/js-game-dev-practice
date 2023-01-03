export default class InputHandler {
    constructor(){
        this.lastKey = '';
        window.addEventListener('keydown', function(e){
            console.log(e.key)
            switch(e.key){
                case "ArrowLeft":
                    this.lastKey = "PRESS left";
            }
        })
        window.addEventListener('keyup', function(e){
            switch(e.key){
                case "ArrowLeft":
                    this.lastKey = "RELEASE left";
            }
        })
    }
}