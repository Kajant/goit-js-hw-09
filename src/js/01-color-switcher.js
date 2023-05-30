'use strict';
const background = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timeInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
stopBtn.disabled = true;

startBtn.addEventListener('click', startBtnAction);
stopBtn.addEventListener('click', stopBtnAction);

function startBtnAction() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timeInterval = setInterval(() => { background.style.backgroundColor = getRandomHexColor(); }, 1000);
};
function stopBtnAction() {
    clearInterval(timeInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
};