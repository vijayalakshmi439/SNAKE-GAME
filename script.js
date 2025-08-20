const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");

const rows = 20;
const cols = 20;
let cells = [];
let snake = [{ x: 10, y: 10 }];
let direction = "RIGHT";
let food = { x: 5, y: 5 };
let score = 0;
let game;

function createBoard() {
  board.innerHTML = "";
  cells = [];
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      board.appendChild(cell);
      row.push(cell);
    }
    cells.push(row);
  }
}

function draw() {
  // clear board
  for (let row of cells) {
    for (let cell of row) {
      cell.className = "cell";
    }
  }

  // draw snake
  for (let part of snake) {
    cells[part.y][part.x].classList.add("snake");
  }

  // draw food
  cells[food.y][food.x].classList.add("food");
}

function moveSnake() {
  const head = { ...snake[0] };

  if (direction === "UP") head.y--;
  if (direction === "DOWN") head.y++;
  if (direction === "LEFT") head.x--;
  if (direction === "RIGHT") head.x++;

  // Game over condition
  if (
    head.x < 0 ||
    head.x >= cols ||
    head.y < 0 ||
    head.y >= rows ||
    snake.some(part => part.x === head.x && part.y === head.y)
  ) {
    clearInterval(game);
    alert("Game Over! Final Score: " + score);
    return;
  }

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.innerText = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };
  } else {
    snake.pop(); // remove tail
  }

  snake.unshift(head); // new head
  draw();
}

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function startGame() {
  snake = [{ x: 10, y: 10 }];
  direction = "RIGHT";
  food = { x: 5, y: 5 };
  score = 0;
  scoreDisplay.innerText = "Score: " + score;
  createBoard();
  draw();
  clearInterval(game);
  game = setInterval(moveSnake, 200);
}

document.addEventListener("keydown", changeDirection);
