const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const scoreCount = document.getElementById('score')

canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0}
let food = { x: 100, y: 100}
let gameRunning = true;
let score = 0

function drawSnake(){
    ctx.fillStyle = "lime";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });
}

function drawFood(){
    ctx.fillStyle = 'red'
    ctx.fillRect(food.x, food.y, 20, 20);
}

function moveSnake(){

    if(!gameRunning) return;

    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    }

    if (newHead.x < 0 || newHead.y < 0 || newHead.x >= canvas.width || newHead.y >= canvas.height){
        gameOver();
        return;
    }
    
    if(snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)){
        gameOver()
        return;
    }
    
    snake.unshift(newHead);

    if(newHead.x === food.x && newHead.y === food.y){
        generateFood();
        score += 1;
        updateScore()
    } else{
        snake.pop();
    }
     
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
        y: Math.floor(Math.random() * (canvas.height / 20)) * 20
    };
}

// Change snake direction
function changeDirection(event) {
    const key = event.key;
    if (key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -20 };
    if (key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 20 };
    if (key === "ArrowLeft" && direction.x === 0) direction = { x: -20, y: 0 };
    if (key === "ArrowRight" && direction.x === 0) direction = { x: 20, y: 0 };
}

// Handle game over
function gameOver() {
    gameRunning = false;
    alert("Game Over! Press OK to restart.");
    resetGame();
}


// Reset the game
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: -20 };
    gameRunning = true;
    score = 0;
    updateScore()
    generateFood();
}

function updateScore(){
    scoreCount.innerText = "Score: " + score;
}

// Update the game state
function updateGame() {
    if (!gameRunning) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveSnake();
    drawSnake();
    drawFood();

    setTimeout(updateGame, 100);
}

// Listen for arrow key presses
window.addEventListener("keydown", changeDirection);

// Start the game
generateFood();
updateGame();