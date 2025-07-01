const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 150;

let drawing = false;
let wentOutOfBounds = false;
let shapeType = "";
let drawnPoints = [];

// Randomly pick a shape
const shapes = ["circle", "triangle", "star"];
shapeType = shapes[Math.floor(Math.random() * shapes.length)];

let shapePath; // Path2D object

function drawShape() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Outer cookie
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#c97f00";
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.closePath();

  // Create inner shape path
  shapePath = new Path2D();
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 4;

  if (shapeType === "circle") {
    shapePath.arc(centerX, centerY, radius - 20, 0, 2 * Math.PI);
  } else if (shapeType === "triangle") {
    shapePath.moveTo(centerX, centerY - (radius - 20));
    shapePath.lineTo(centerX - (radius - 20), centerY + (radius - 20));
    shapePath.lineTo(centerX + (radius - 20), centerY + (radius - 20));
    shapePath.closePath();
  } else if (shapeType === "star") {
    const spikes = 5;
    const outerRadius = radius - 20;
    const innerRadius = outerRadius / 2;
    let rot = Math.PI / 2 * 3;
    let step = Math.PI / spikes;

    let x = centerX + Math.cos(rot) * outerRadius;
    let y = centerY + Math.sin(rot) * outerRadius;
    shapePath.moveTo(x, y);

    for (let i = 0; i < spikes; i++) {
      x = centerX + Math.cos(rot) * outerRadius;
      y = centerY + Math.sin(rot) * outerRadius;
      shapePath.lineTo(x, y);
      rot += step;

      x = centerX + Math.cos(rot) * innerRadius;
      y = centerY + Math.sin(rot) * innerRadius;
      shapePath.lineTo(x, y);
      rot += step;
    }

    shapePath.closePath();
  }

  ctx.stroke(shapePath);
}

drawShape();

// Handle mouse down
canvas.addEventListener("mousedown", () => {
  if (document.getElementById("result").textContent) return;
  drawing = true;
  wentOutOfBounds = false;
  drawnPoints = [];
});

// Handle mouse up (game finish)
canvas.addEventListener("mouseup", () => {
  if (!drawing) return;
  drawing = false;

  const resultBox = document.getElementById("result");

  if (wentOutOfBounds) {
    resultBox.textContent = "You broke the shape! Game Over.";
  } else {
    resultBox.textContent = "Success! You completed the shape!";
  }

  // Show exit button
  const exitBtn = document.getElementById('exitBtn');
  exitBtn.style.display = "inline-block";
});

// Handle mouse move (tracking)
canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  drawnPoints.push({ x, y });

  // Accurate stroke check using isPointInStroke
  if (!ctx.isPointInStroke(shapePath, x, y)) {
    wentOutOfBounds = true;
  }

  // Draw trace point
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
});

// Exit button logic
const exitBtn = document.getElementById('exitBtn');
exitBtn.addEventListener('click', () => {
  window.location.href = 'index.html'; // Change to your desired exit page
});
