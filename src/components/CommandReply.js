class CommandReply extends HTMLElement {
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
    `;
  }

  setCommand(command) {
    this.command = command;
    this.reply = (this.command === "") ? "" : "Respuesta del comando";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CommandReply.styles}</style>
    <div class="container">
      ${this.reply}
    </div>`;
  }
}

customElements.define("command-reply", CommandReply);
