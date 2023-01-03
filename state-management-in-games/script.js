import Player from './player.js';
import InputHandler from './input.js';
import { drawStatusText } from './utils.js';  // non default export note {}

window.addEventListener('load', function(){
    const loading = this.document.getElementById('loading');
    loading.style.display = 'none'; // after all elements are loaded, remove loading h1 tag

    const canvas = document.getElementById('canvas1'); // canvas setup
    const ctx = canvas.getContext('2d')
    canvas.width = this.window.innerWidth;
    canvas.height = window.innerHeight;

    const player = new Player(canvas.width, canvas.height); // class instantiate
    const input = new InputHandler();

    function animate(){ // animation loop
        ctx.clearRect(0,0,canvas.width,canvas.height); // clear canvas every frame
        player.update(input.lastKey) // argument here is string last key like "PRESSED ArrowLeft"
        player.draw(ctx)
        drawStatusText(ctx, input, player);
        requestAnimationFrame(animate)
    }
    animate()
}) 