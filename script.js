const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let image = new Image;
image.src = 'image.png';

let space = new Image;
space.src = 'space.jpg';

let atlas = {
    ball: {x: 3, y: 587, width: 38, height: 38},
    yellow: {x: 174, y: 36, width: 42, height: 20},
    red: {x: 0, y: 36, width: 42, height: 20},
    green: {x: 174, y: 0, width: 42, height: 20},
    pink: {x: 116, y: 36, width: 42, height: 20},
    platform: {x: 108, y: 176, width: 210, height: 18}
}
const game = new Game({width: 500, height: 500, game: canvas});

const limits = [
    new Rectangle({x: 0, y: -10, width: canvas.width, height: 10}),
    new Rectangle({x: canvas.width, y: 0, width: 10, height: canvas.height}),
    new Rectangle({x: 0, y: canvas.height, width: canvas.width, height: 10}),
    new Rectangle({x: -10, y: 0, width: 10, height: canvas.height}),
]

document.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowLeft') {
        game.platform.leftKey = true;
    } else if (e.key == 'ArrowRight') {
        game.platform.rightKey = true;
    }
})

document.addEventListener('keyup', function(e) {
    if (e.key == 'ArrowLeft') {
        game.platform.leftKey = false;
    } else if (e.key == 'ArrowRight') {
        game.platform.rightKey = false;
    } else if (e.key == 'Enter' && game.isPlayflag == false) {
        game.init();
    }
})



function clearCanvas () {
    context.drawImage(space, 0, 0, space.width, space.height);
}

game.platform.draw();

function toggleItem (arr, el) {
    if (arr.includes(el)) {
        const index = arr.indexOf(el);
        arr.splice(index, 1);
        game.ball.angle = Math.PI * 2 - game.ball.angle;
    } else {
        arr.push(el);
    }
}


function getRandom (array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

function drawResult () {
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(255, 255, 255, 0.75)';
    context.fill();

    context.fillStyle = 'black';
    context.font = '50px Monaco';
    context.textAlign = 'center';
    context.fillText('Game over', canvas.width / 2, canvas.height / 2 - 50);

    context.fillStyle = 'black';
    context.font = '20px Monaco';
    context.textAlign = 'center';
    context.fillText('Press Enter to continue', canvas.width / 2, canvas.height / 2 - 20);
}