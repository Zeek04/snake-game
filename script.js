const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0}
let food = { x: 100, y: 100}
let gameRunning = true;

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
} else{
    snake.pop();
}

