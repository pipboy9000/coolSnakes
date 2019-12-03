let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

ctx.fillStyle = "black"
ctx.strokeStyle = "#29ff7e"

ctx.fillRect(0, 0, 800, 800);

let x = 400;
let y = 400;
let z = 1;

let angle = Math.PI; //90 degrees

let state = 0; // 0: line 1:arc

function drawNextSegment() {
    //fade last
    ctx.fillStyle = "#00000010";
    ctx.fillRect(0, 0, 800, 800);

    //line
    let dist = Math.floor(Math.random() * 100);
    let nextX = x + Math.sin(angle) * dist;
    let nextY = y + Math.cos(angle) * dist;

    z += 1;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = z;
    ctx.lineTo(nextX, nextY);
    ctx.stroke();

    let nextAngle = angle + Math.random() * Math.PI * 2;
    let nextRadi = Math.random() * 10;

    ctx.beginPath();
    ctx.arc(nextX, nextY, nextRadi, nextAngle, angle, Math.random() >= 0.5);
    ctx.stroke();

    x = nextX;
    y = nextY;
    angle = nextAngle;

    if (x > 800 || x < 0 || y > 800 || y < 0) {
        x = 400;
        y = 400;
        z = 1;
    }

    console.log('end segment')
}

function render(d) {

    drawNextSegment();

    requestAnimationFrame(render)
}

render();