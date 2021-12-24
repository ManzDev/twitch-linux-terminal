import "./CommandInput.js";

class CommandLine extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        font-family: var(--font-code);
        font-size: 1rem;
        color: #fff;
        user-select: none;
      }

      .container {
        grid-template-columns: 1fr 1fr;
        word-break: break-all;
        box-sizing: border-box;
      }

      .prompt {
        display: inline;
        margin-right: 1ch;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CommandLine.styles}</style>
    <div class="container">
      <div class="prompt">manz@MANZ.DEV ~ $</div>
      <command-input></command-input>
    </div>`;
  }
}

customElements.define("command-line", CommandLine);
