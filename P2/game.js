const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const info = document.getElementById("info");


const player = {
  x: 100,
  y: 100,
  width: 60,        
  height: 60,       
  speed: 5,
  color: "crimson"  
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  info.textContent =
    "x = " + player.x + " | y = " + player.y + " | speed = " + player.speed;
}

function keepInside() {
  if (player.x < 0) player.x = 0;
  if (player.y < 0) player.y = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") player.x += player.speed;
  if (event.key === "ArrowLeft")  player.x -= player.speed;
  if (event.key === "ArrowUp")    player.y -= player.speed;
  if (event.key === "ArrowDown")  player.y += player.speed;
  if (event.key === "1") player.speed = 1;
  if (event.key === "2") player.speed = 5;
  if (event.key === "3") player.speed = 20;
  if (event.key === "4") player.speed = 50;

  if (event.key.startsWith("Arrow")) event.preventDefault();

  keepInside();
  draw();
});

draw();