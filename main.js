document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div '));
    const width = 10;
    const soreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start');
    let nextRandom = 0;
    let timerId

    // drawing tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]


    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];


    let currentPosition = 4;
    let currentRotation = 0;


    // randomizing tetrominoes
    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random ][currentRotation];


// function to draw tetrominoes to the page
function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino');
    })
}


function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
    })
}


// tetromino moving down
    timerId = setInterval(moveDown, 500);

// assigning key codes to control tetrominoes
    function control (e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)




// function to move tetromino
    function moveDown () {
        undraw()
        currentPosition += width;
        draw();
        freeze()
    }

    function freeze () {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            // continue with another tetromino
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
        }
    }



    // alow tetromino to move left to the edge but not cross it
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -= 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }

        draw()
    }

    // alow tetromino to move right to the edge but not cross it
    function moveRight () {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

        if(!isAtRightEdge) currentPosition += 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }

        draw()
    }

    // alow tetromino to rotate around
    function rotate () {
        undraw()
        currentRotation++
        if(currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        draw()
    }

    // show next tetromino coming up

    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;

    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //ltetromino

        [0, displayWidth, displayWidth+1, displayWidth*2+1], // zTetromino

        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino

        [0, 1, displayWidth, displayWidth+1], //oTetromino

        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
    ]

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }


    startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 500)
            nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        }
    })




})