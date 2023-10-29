
// js/01-color-switcher.js

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }
  
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');
  const body = document.body;
  
  let colorChangeInterval = null;
  
  startButton.addEventListener('click', () => {
    if (!colorChangeInterval) {
      startButton.disabled = true;
      colorChangeInterval = setInterval(() => {
        const randomColor = getRandomHexColor();
        body.style.backgroundColor = randomColor;
      }, 1000);
    }
  });
  
  stopButton.addEventListener('click', () => {
    if (colorChangeInterval) {
      clearInterval(colorChangeInterval);
      colorChangeInterval = null;
      startButton.disabled = false;
    }
  });
  