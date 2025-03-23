import { parseTimeToInt, parseIntToTime } from "./utils/time-parser.js";

class TimerComponent extends HTMLElement {
  constructor() {
    super();
    this.remainingTime = parseTimeToInt(this.getAttribute("time")) || "00:00";
    this.totalTime = this.remainingTime;
    this.attachShadow({ mode: "open" });
    this.switch = this.getAttribute("switch") === "true";
    this.timecolor = this.getAttribute("timecolor") || "red";
    this.width = parseInt(this.getAttribute("width")) || 100;
    this.interval = null;
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = /*HTML*/ `
      <article>
        <div class="progress" >
          <svg width=${this.width} height=${this.width}> 
            <circle 
              r=${this.width / 2} 
              cx="50%" 
              cy="50%" 
              fill="none" 
              stroke=${this.timecolor} 
              stroke-width="10"
              stroke-dasharray="0 100" 
              pathlength=100 
              stroke-linecap=round
            ></circle>
            <circle 
              r=${this.width / 2} 
              cx="50%" 
              cy="50%" 
              fill="none" 
              stroke=${this.timecolor} 
              stroke-width="10" 
              stroke-dasharray="100 100" 
              pathlength=100 
              stroke-linecap=round 
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
        svg {
          width: ${this.width + 10}px;
          height: ${this.width + 10}px;
          display: block;
        }
        circle {
          width:150px;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          transition: stroke-dasharray 1s linear;
        }
        h2 {
          position: absolute;
          text-align: center;
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
    const progress =
      ((this.totalTime - this.remainingTime) * 100) / this.totalTime;
    console.log(progress);

    setTimeout(() => {
      this.circle.setAttribute("stroke-dasharray", `${progress} 100`);
    }, 100);

    setTimeout(() => {
      this.timeDisplay.textContent = parseIntToTime(this.remainingTime);
    }, 900);
  }

  setAttribute(name, value) {
    super.setAttribute(name, value);
    if (name === "switch" && value === "true") {
      this.startTimer();
    }
  }

  startTimer() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.updateDisplay();
      } else {
        clearInterval(this.interval);
        this.circle.setAttribute("stroke", "none");
        this.interval = null;
      }
    }, 1000);
  }

  render() {
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
