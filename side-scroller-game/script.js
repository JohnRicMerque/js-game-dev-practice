window.addEventListener('load', function(){ // waits for all assets to load before executing callback function

    // canvas setup 
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d')
    canvas.width = 800;
    canvas.height = 720;

    class InputHandler {
        constructor(){
            this.keys = []; // houses all keys pressed and released
            window.addEventListener('keydown', function(e){
                console.log(e)
            })
        }
    }

    class Player {

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

    function animate(){

    }
})