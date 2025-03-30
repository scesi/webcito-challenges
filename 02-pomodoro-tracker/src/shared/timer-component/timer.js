import { parseTimeToInt, parseIntToTime } from "./utils/time-parser.js";
import { playSound } from "./utils/notification.js";

class TimerComponent extends HTMLElement {
  constructor() {
    super();
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href =
      "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap";
    document.head.appendChild(font);
    this.remainingTime = parseTimeToInt(this.getAttribute("time")) || 0;
    this.totalTime = this.remainingTime;
    this.attachShadow({ mode: "open" });
    this.switch = this.getAttribute("switch") === "true";
    this.timecolor = this.getAttribute("timecolor") || "red";
    this.width = parseInt(this.getAttribute("width")) || 100;
    this.interval = null;
    this.isPaused = false;
    this.isFinished = false;
  }

  static get observedAttributes() {
    return ["time", "switch"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "time" && oldValue !== newValue) {
      this.setTime(newValue);
    }
    if (name === "switch") {
      if (newValue === "true") {
        this.startTimer();
      } else {
        this.pauseTimer();
      }
    }
    if (name === "timecolor") {
      this.timecolor = newValue;
      this.updateDisplay();
    }
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = /*HTML*/ `
      <article>
        <div class="progress">
          <svg width="${this.width}" height="${this.width}"> 
            <circle 
              r="${this.width / 2}"
              cx="50%"
              cy="50%"
              fill="none"
              stroke="${this.timecolor}"
              stroke-width="10"
              stroke-dasharray="0 100" 
              pathlength="100" 
              stroke-linecap="round"
            ></circle>
            <circle 
              r="${this.width / 2}"
              cx="50%"
              cy="50%"
              fill="none"
              stroke="${this.timecolor}"
              stroke-width="10" 
              stroke-dasharray="100 100" 
              pathlength="100" 
              stroke-linecap="round" 
              opacity="0.3"
            ></circle>
          </svg>
          <h2>${parseIntToTime(this.remainingTime)}</h2>
        </div>
      </article>
      ${this.getStyle()}
    `;
    return template;
  }

  getStyle() {
    return /* CSS */ `
      <style>
        article {
          font-family: 'Roboto', sans-serif;
        }

        svg {
          width: ${this.width + 10}px;
          height: ${this.width + 10}px;
          display: block;
        }
        circle {
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          transition: stroke-dasharray 1s linear;
        }
        h2 {
          position: absolute;
          text-align: center;
          font-size: 2.5rem;
          font-family: Arial, sans-serif;
          color: ${this.timecolor};
        }
        .progress {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${this.width + 20}px;
          height: ${this.width + 20}px;
        }
      </style>
    `;
  }

  updateDisplay() {
    if (!this.circle || !this.timeDisplay) return;
    const progress =
      ((this.totalTime - this.remainingTime) * 100) / this.totalTime;
    this.circle.setAttribute("stroke-dasharray", `${progress} 100`);
    this.timeDisplay.textContent = parseIntToTime(this.remainingTime);
  }

  setTime(value) {
    this.remainingTime = parseTimeToInt(value);
    this.totalTime = this.remainingTime;
    this.pauseTimer();
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.updateDisplay();
  }

  pauseTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.isPaused = true;
    }
  }

  startTimer() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.updateDisplay();
      } else {
        this.isFinished = true;
        clearInterval(this.interval);
        this.interval = null;
        this.updateDisplay();
        this.dispatchEvent(
          new CustomEvent("timer-finished", { bubbles: true })
        );
        playSound();
      }
    }, 1000);
  }

  render() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    this.circle = this.shadowRoot.querySelector("circle");
    this.timeDisplay = this.shadowRoot.querySelector("h2");
    this.updateDisplay();
  }

  connectedCallback() {
    this.render();
    if (this.switch) {
      this.startTimer();
    }
  }
}

customElements.define("my-timer", TimerComponent);
