const keySound = new Audio("assets/sounds/key.mp3");

class CommandInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        margin: 0;
        padding: 0;
      }

      .container {
        font-family: var(--font-code);
        font-size: 1rem;
        color: #fff;
        min-width: 1px;
        min-height: 16px;
        outline: 0;
        pointer-events: none;
        background: none;
        border: 0;
        display: inline;
      }
    `;
  }

  connectedCallback() {
    this.render();
    const container = this.shadowRoot.querySelector(".container");
    container.focus();
    container.addEventListener("blur", () => container.focus());

    container.addEventListener("keydown", (ev) => {
      keySound.currentTime = 0;
      keySound.play();

      if (ev.code === "Enter") {
        ev.preventDefault();
        this.onEnter();
      }
    });
  }

  onEnter() {
    const container = this.shadowRoot.querySelector(".container");
    const command = container.textContent;
    console.log("ENTER detectado");
    container.removeAttribute("contentEditable");
    const event = new CustomEvent("NEW_COMMMAND", { detail: { command }, composed: true });
    this.dispatchEvent(event);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CommandInput.styles}</style>
    <div class="container" contenteditable></div>`;
  }
}

customElements.define("command-input", CommandInput);
