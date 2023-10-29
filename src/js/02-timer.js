// js/02-timer.js
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let timerInterval;

datetimePicker.addEventListener('change', () => {
  const selectedDate = new Date(datetimePicker.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    window.alert('Please choose a date in the future');
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
});

startButton.addEventListener('click', () => {
  const selectedDate = new Date(datetimePicker.value);
  const currentDate = new Date();

  if (selectedDate > currentDate) {
    const timeDifference = selectedDate - currentDate;

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      const timeLeft = selectedDate - new Date();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timeLeft = 0;
      }

      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      daysElement.textContent = addLeadingZero(days);
      hoursElement.textContent = addLeadingZero(hours);
      minutesElement.textContent = addLeadingZero(minutes);
      secondsElement.textContent = addLeadingZero(seconds);
    }, 1000);
  }
});
