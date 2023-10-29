// js/02-timer.js
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function convertMs(ms) {
  const s = 1000, m = s * 60, h = m * 60, d = h * 24;
  return { d: Math.floor(ms / d), h: Math.floor(ms % d / h), m: Math.floor(ms % h / m), s: Math.floor(ms % m / s) };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const [daysElement, hoursElement, minutesElement, secondsElement] = ['days', 'hours', 'minutes', 'seconds'].map(id => document.querySelector(`[data-${id}]`));

let timerInterval;

function updateTimer() {
  const selectedDate = new Date(datetimePicker.value);
  const currentDate = new Date();
  const timeDifference = selectedDate - currentDate;
  
  clearInterval(timerInterval);
  if (selectedDate > currentDate) {
    timerInterval = setInterval(() => {
      const timeLeft = selectedDate - new Date();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timeLeft = 0;
      }

      const { d, h, m, s } = convertMs(timeLeft);
      [daysElement, hoursElement, minutesElement, secondsElement].forEach((el, i) => el.textContent = addLeadingZero([d, h, m, s][i]));
    }, 1000);
  }
}

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

startButton.addEventListener('click', updateTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    updateTimer();
  },
};

flatpickr(datetimePicker, options);
