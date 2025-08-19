import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`
document.addEventListener("contextmenu", (e) => e.preventDefault()); // Disable right click

  document.onkeydown = function(e) {
    // Disable F12
    if (e.keyCode === 123) return false;

    // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
      return false;
    }

    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) return false;

    // Disable Ctrl+S (Save Page)
    if (e.ctrlKey && e.keyCode === 83) return false;

    // Disable Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+P
    if (e.ctrlKey && (e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 80)) {
      return false;
    }

    // Disable Ctrl+Shift+K (Firefox)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 75) return false;
  };
setupCounter(document.querySelector('#counter'))
