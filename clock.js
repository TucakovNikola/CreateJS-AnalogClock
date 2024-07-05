const canvas = document.getElementById("clockCanvas");
const stage = new createjs.Stage(canvas);

canvas.style.position = "absolute";
canvas.style.left = "100px";
canvas.style.bottom = "100px";

const clockFace = new createjs.Shape();
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const clockRadius = 150;

clockFace.graphics.beginFill("#f0f0f0").drawCircle(centerX, centerY, clockRadius);

stage.addChild(clockFace);

const hourHand = new createjs.Shape();
const minuteHand = new createjs.Shape();
const secondHand = new createjs.Shape();

stage.addChild(hourHand, minuteHand, secondHand);

function updateClockHands() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourAngle = (360 / 12) * (hours % 12) + (30 / 60) * minutes;
    const minuteAngle = (360 / 60) * minutes + (6 / 60) * seconds;
    const secondAngle = (360 / 60) * seconds;

    updateHand(hourHand, hourAngle, clockRadius * 0.5);
    updateHand(minuteHand, minuteAngle, clockRadius * 0.7);
    updateHand(secondHand, secondAngle, clockRadius * 0.9);

    stage.update();
}

function updateHand(hand, angle, length) {
    const radians = angle * (Math.PI / 180);
    const handX = centerX + Math.cos(radians) * length;
    const handY = centerY + Math.sin(radians) * length;
    hand.graphics.clear().setStrokeStyle(4).beginStroke("#333")
        .moveTo(centerX, centerY).lineTo(handX, handY);
}

createjs.Ticker.addEventListener("tick", function () {
    updateClockHands();
});

updateClockHands();
