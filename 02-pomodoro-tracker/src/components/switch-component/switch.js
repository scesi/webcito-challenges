class SwitchThemeComponent extends HTMLElement {
  constructor() {
    super();
    this.isChecked =
      this.hasAttribute("checked") ||
      window.matchMedia("(prefers-color-scheme: light)").matches === true
        ? true
        : false;
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["checked"];
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = /*HTML*/ `
      <div class="switch">
        <input type="checkbox" id="toggle" ${this.isChecked ? "checked" : ""}>
        <label for="toggle" class="slider"></label>
      </div>
      ${this.getStyles()}
    `;
    return template;
  }

  getStyles() {
    const moon =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 1200' xml:space='preserve'%3E%3Cpath  d='M0 0h1200v1200H0z' /%3E%3Cpath style='fill:%23ffc847' d='M790.266 200c38.61 64.527 60.807 140.005 60.807 220.669 0 237.705-192.698 430.403-430.403 430.403-80.665 0-156.142-22.197-220.67-60.806C275.166 915.89 412.557 1000 569.597 1000 807.302 1000 1000 807.302 1000 569.597c0-157.041-84.11-294.431-209.734-369.597' /%3E%3C/svg%3E";
    return /*CSS*/ `
    <style>
        .switch {
          position: relative;
          width: 50px;
          height: 25px;
        }

        input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color:rgb(9, 8, 92);
          border-radius: 25px;
          transition: 0.3s;
        }

        .slider::before {
          content: "";
          position: absolute;
          height: 20px;
          aspect-ratio: 1;
          left: 3px;
          bottom: 2.5px;
          background-color: white;
          border-radius: 50%;
          transition: 0.3s;
          background-color:rgb(255, 230, 0);
          background-image: url("${moon}");
          background-size: 150%;
          background-repeat: no-repeat;
          background-position: center;
        }

        input:checked + .slider {
          background-color: #5cbdfd;
        }

        input:checked + .slider::before {
          transform: translateX(25px);
          background-image: none;
        }
      </style>
    `;
  }

  render() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked") {
      this.isChecked = newValue !== null;
      const input = this.shadowRoot.querySelector("#toggle");
      if (input) {
        input.checked = this.isChecked;
      }
    }
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      .querySelector("#toggle")
      .addEventListener("change", (event) => {
        this.isChecked = event.target.checked;

        this.toggleChecked();
      });
  }

  toggleChecked() {
    if (this.isChecked) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }
}

customElements.define("switch-component", SwitchThemeComponent);
