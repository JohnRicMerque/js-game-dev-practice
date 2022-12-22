//  instantiating canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// c.fillRect(0, 0, canvas.width, canvas.height) //canvas bg

const gravity = 0.2

class Sprite {
    constructor({position, velocity}) { // the parameter is one object with compound properties
        this.position = position // 'this' here refers to the instance of the object
        this.velocity = velocity
        this.height = 150
    }

    draw() { // function draws rectangle to the canvas
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() { //updates position, redraws element
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) { // for elements to not surpass ground
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}

const player = new Sprite({
    position: { 
        x: 0, // object as an argument for Sprite, x and y are like cartesian coordinates for the canvas
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    }
})

const enemy = new Sprite({ // argument is a nested object
    position: { 
        x: 400,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    }
})

console.log(player)

const keys = { // to fix keyup being run when simultaneously running keyup and keydown
    a: { // since a variable can only have one value this code makes the pressed command be the one implemented when you simultaneously click both key commands
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }


}

let lastKey; // to fix movement when simultaneously running a and d keys, made sure to track last key

function animate() {
    window.requestAnimationFrame(animate) // animates every frame
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0

    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -1
    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 1
    }
}

animate()

window.addEventListener('keydown', (event) => { // keydown when keys are pressed
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastKey = 'd' // since a variable can only have one value this code makes the pressed command be the one implemented when you simultaneously click both key commands
        break

        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
        break

        case 'w':
            player.velocity.y = -10
        break
    }
    console.log(event.key)
})

window.addEventListener('keyup', (event) => { // keyup when keys are unpressed
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
        break

        case 'a':
            keys.a.pressed = false
        break

        case 'w':
            keys.w.pressed = false
        break
    }
    console.log(event.key)
})