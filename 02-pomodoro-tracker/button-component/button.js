class ButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.text = this.getAttribute("text") || "Button";
    this.type = this.getAttribute("type") || "normalbtn";
    this.isDisabled = this.hasAttribute("disabled");
    this.action = this.getAttribute("action") || "click";

    this.attachShadow({ mode: "open" });
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = /* HTML */ `
      <button class="${this.type}" ${this.isDisabled ? "disabled" : ""}>
        ${this.text}
      </button>
      ${this.getStyle()}
    `;
    return template;
  }

  getStyle() {
    return /* CSS */ `
    <style>
    .dangerbtn {
        display: flex;
        min-width: 100px;
        max-width: 250px;
        font-size: 1rem;
        font-weight: 500;
        color: #F94409;
        padding: 12px 24px;
        justify-content: center;
        align-items: center;
        gap: 16px;
        border: none;
        border-radius: 8px;
        background: var(--Button, #172030);
        box-shadow: 9px 9px 16px 0px rgba(0, 0, 0, 0.24), -4px -4px 16px 0px rgba(73, 73, 73, 0.40);
    }
    .normalbtn {
        display: flex;
        min-width: 100px;
        max-width: 250px;
        font-size: 1rem;
        font-weight: 500;
        color: var(--Text, #ffffff);
        padding: 12px 24px;
        justify-content: center;
        align-items: center;
        gap: 16px;
        border: none;
        border-radius: 8px;
        background: var(--Button, #172030);
        box-shadow: 9px 9px 16px 0px rgba(0, 0, 0, 0.24), -4px -4px 16px 0px rgba(73, 73, 73, 0.40);
    }
    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
  </style>
  `;
  }

  render() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));

    this.button = this.shadowRoot.querySelector("button");

    if (this.button && !this.isDisabled) {
      this.button.addEventListener(this.action, () => {
        this.dispatchEvent(new CustomEvent("button-click", { bubbles: true }));
      });
    }
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["disabled"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "disabled") {
      this.isDisabled = newValue !== null;
      this.render();
    }
  }
}

customElements.define("button-component", ButtonComponent);
