'use strict';
const refs = {
    background: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}
let timeInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', startBtnAction);
refs.stopBtn.addEventListener('click', stopBtnAction);

function startBtnAction() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    timeInterval = setInterval(() => { refs.background.style.backgroundColor = getRandomHexColor(); }, 1000);
};
function stopBtnAction() {
    clearInterval(timeInterval);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
};