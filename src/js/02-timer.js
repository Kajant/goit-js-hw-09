'use strict';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';

const timeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysCounter = document.querySelector('span[data-days]');
const hoursCounter = document.querySelector('span[data-hours]');
const minutesCounter = document.querySelector('span[data-minutes]');
const secondsCounter = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

let timerId = null;

startBtn.addEventListener('click', () => {
    Notify.info("It's the final countdown!");
  timerId = setInterval(countdown, 1000);
  startBtn.disabled = true;
});

const flatpickrTime = flatpickr(timeInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
        return Notify.warning('Please choose a date in the future!');
        startBtn.disabled = true;
    }
    startBtn.disabled = false;
  },
});

function countdown() {
  const timeLeft = flatpickrTime.selectedDates[0] - new Date();

  if (timeLeft < 1000) {
    startBtn.disabled = false;
    Notify.success("This is the end.");
    clearInterval(timerId);
  }

  const timeMarks = convertMs(timeLeft);
  daysCounter.textContent = addLeadingZero(timeMarks.days);
  hoursCounter.textContent = addLeadingZero(timeMarks.hours);
  minutesCounter.textContent = addLeadingZero(timeMarks.minutes);
  secondsCounter.textContent = addLeadingZero(timeMarks.seconds);
}

// startBtn.disabled = true;

// let timerId = null;

// startBtn.addEventListener('click', startCounting)

// function startCounting () {
//     timerId = setInterval(countDown, 1000);
//     Notify.info("It's the final countdown!")
// };

// const flatpickrTime = flatpickr(timeInput, {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     onClose(selectedDates) {
//         if (selectedDates[0] < new Date()) {
//             Notify.warning("Please choose a date in the future");
//             startBtn.disabled = true;
//         } startBtn.disabled = false;
//     }
// });

// function countDown() {
//     const timeLeft = flatpickrTime.selectedDates[0] - new Date();
//     if (timeLeft < 0) {
//         return Notify.success("This is the end.");
//         clearInterval(timerId);
//     } 
//         const timeMarks = convertMs(timeLeft);
//         daysCounter.textContent = addLeadingZero(timeMarks.days);
//         hoursCounter.textContent = addLeadingZero(timeMarks.hours);
//         minutesCounter.textContent = addLeadingZero(timeMarks.minutes);
//         secondsCounter.textContent = addLeadingZero(timeMarks.seconds);
//         startBtn.disabled = true;
// }

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};
function convertMs(ms) {
// Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

// Remaining days
  const days = Math.floor(ms / day);
// Remaining hours
  const hours = Math.floor((ms % day) / hour);
// Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
// Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}