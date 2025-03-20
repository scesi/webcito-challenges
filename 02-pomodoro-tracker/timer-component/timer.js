class TimerComponent extends HTMLElement {
  constructor() {
    super();
    this.remainingTime = parseInt(this.getAttribute("time")) || 0;
    this.totalTime = this.remainingTime;
    this.attachShadow({ mode: "open" });
    this.switch = this.getAttribute("switch") == "true";
    this.interval = null;
    this.width = this.getAttribute("width") || "100";
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = /*HTML*/ `
      <article>
        <div class="progress"></div>
        <div class="center">
        <h2>${this.remainingTime}</h2>
        </div>
      </article>
      <style>
        article {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: red;
          width: ${this.width}px;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
        }

        .center {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: white;
          width: ${this.width - 10}px;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          z-index:100;
        }

        .progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: red;
          transition: transform 1s linear;
        }

        h2 {
          position: relative;
          z-index: 110;

        }
      </style>
    `;
    return template;
  }

  updateDisplay() {
    if (this.shadowRoot) {
      this.shadowRoot.querySelector("h2").textContent = this.remainingTime;
      const progress = this.shadowRoot.querySelector(".progress");
      
      if (progress) {
        let percentage = (this.remainingTime / this.totalTime) * 360;
        
        progress.style.background = `conic-gradient(red ${percentage}deg, white ${percentage}deg)`;
      }
    }
  }
  

  startTimer() {
    if (this.remainingTime === 0) return "finish";

    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.updateDisplay();
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
    if (this.switch) {
      this.startTimer();
    }
  }

  disconnectedCallback() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

customElements.define("my-timer", TimerComponent);
