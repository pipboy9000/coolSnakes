let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

ctx.fillStyle = "black"
ctx.strokeStyle = "#29ff7e"
ctx.lineWidth = 4;

ctx.fillRect(0, 0, width, height);

//start position
let x = width / 2;
let y = height / 2;

let angle = (Math.floor(Math.random() * 9) - 4) * 0.7853981634;

let minSegementLength = 30;
let randSegmentLength = 100;
let colorChangeRate = 50;
let fade = 0.07;
let minJointRadius = 20;
let randJointRadius = 50;
let minJointAngle = 0.7853981634;
let randJointAngle = 0;

function drawNextSegment() {

    //fade last
    ctx.fillStyle = "rgba(0,0,0," + fade + ")";
    ctx.fillRect(0, 0, 800, 800);

    let dist = +minSegementLength + Math.random() * randSegmentLength;

    let hue = performance.now() / colorChangeRate % 360

    ctx.strokeStyle = `hsl(${hue},100%,70%`;

    //line
    let nextX = x + Math.cos(angle) * dist;
    let nextY = y + Math.sin(angle) * dist;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nextX, nextY);
    ctx.stroke();

    // let nextAngle = (angle + Math.ceil(Math.random() * 3) * 0.7853981634) % (Math.PI * 2);
    let nextAngle = angle + (Math.random() * randJointAngle) + minJointAngle;

    let cornerRad = Math.random() * randJointRadius + minJointRadius;

    let cornerCenterX = nextX + (Math.cos(angle + Math.PI / 2)) * cornerRad;
    let cornerCenterY = nextY + (Math.sin(angle + Math.PI / 2)) * cornerRad;

    ctx.beginPath();
    ctx.arc(cornerCenterX, cornerCenterY, cornerRad, angle - Math.PI / 2, nextAngle - Math.PI / 2, false);
    ctx.stroke();

    //set to arc endpoint
    x = cornerCenterX + Math.cos(nextAngle - Math.PI / 2) * cornerRad;
    y = cornerCenterY + Math.sin(nextAngle - Math.PI / 2) * cornerRad;

    angle = nextAngle;

    if (x > width || x < 0 || y > height || y < 0) {
        x = width / 2;
        y = height / 2;
        angle = (Math.floor(Math.random() * 9) - 4) * 0.7853981634;
    }
}

function render(d) {

    drawNextSegment();

    requestAnimationFrame(render)
}

render();


//input functions
function setMinSegmentLength(val) {
    minSegementLength = +val;
}

function setRandSegmentLength(val) {
    randSegmentLength = +val;
}

function setColorChangeRate(val) {
    colorChangeRate = 100 - +val
}

function setFade(val) {
    fade = +val / 255;
}

function setMinJointRadius(val) {
    minJointRadius = +val;
}

function setRandJointRadius(val) {
    randJointRadius = +val;
}

function setMinJointAngle(val) {
    minJointAngle = +val;
}

function setRandJointAngle(val) {
    randJointAngle = +val;
}