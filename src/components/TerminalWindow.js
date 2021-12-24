import { html, render } from "lit-html";
import "./CommandLine.js";
import "./CommandReply.js";

class TerminalWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.title = "Manz.dev Terminal";
  }

  static get styles() {
    return /* css */`
      :host {
        --width: 700px;
        --height: 500px;
        --titlebar-height: 35px;
        --font: "EnterCommand";
        --font-code: "Victor Mono";
        font-size: 27px;
      }

      .container {
        width: var(--width);
        height: var(--height);
        border: 1px solid #444;
        margin: 2em auto;
        box-shadow: 14px 14px 10px #0006;
        font-family: var(--font);
      }

      .titlebar {
        height: var(--titlebar-height);
        background: #444;
        display: flex;
        justify-content: space-between;
        user-select: none;
      }

      .icon img {
        image-rendering: pixelated;
        width: 40px;
        height: 40px;
        clip-path: inset(0 0 5px 0);
      }

      .title {
        display: flex;
        align-items: center;
      }

      .buttons {
        display: flex;
        width: 70px;
        justify-content: space-around;
        align-items: center;
        margin-right: 0.4em;
      }

      .buttons button {
        border: 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: var(--color);
        box-shadow: 0 0 5px 0 #0009 inset;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .buttons button:nth-child(1) { --color: lime; }
      .buttons button:nth-child(2) { --color: gold; }
      .buttons button:nth-child(3) { --color: red; }

      .terminal {
        width: 100%;
        height: calc(100% - var(--titlebar-height));
        background-color: #111;
        background-image: linear-gradient(145deg, transparent 75%, #171717 75% 85%, transparent 85%);
        color: #eee;
        box-sizing: border-box;
        padding: 10px;
        overflow-y: scroll;

        /* Firefox */
        scrollbar-width: auto;
        scrollbar-color: #444 #222;
      }

      .terminal::after {

      }

      /* Chromium */
      ::-webkit-scrollbar {
        width: 18px;
        background: darkred;
      }

      ::-webkit-scrollbar-track {
        /*-webkit-box-shadow: inset 0 0 6px red;*/
        background: #222;
      }

      ::-webkit-scrollbar-thumb {
        background: #444;
        /*-webkit-box-shadow: inset 0 0 6px darkred;*/
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.addEventListener("NEW_COMMMAND", (ev) => this.onNewCommand(ev.detail));
  }

  onNewCommand(data) {
    console.log("NEW_COMMMAND detectado");
    const container = this.shadowRoot.querySelector(".terminal");

    if (data.command === "clear") {
      container.innerHTML = "";
    } else {
      const commandReply = document.createElement("command-reply");
      commandReply.setCommand(data.command);
      container.appendChild(commandReply);
    }

    const commandLine = document.createElement("command-line");
    container.appendChild(commandLine);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${TerminalWindow.styles}</style>
    <div class="container">
      <div class="titlebar">
        <div class="icon">
          <img src="/assets/manzdev-go.png" alt="Icon">
        </div>
        <div class="title">${this.title}</div>
        <div class="buttons">
          <button class="minimize"></button>
          <button class="maximize"></button>
          <button class="close"></button>
        </div>
      </div>
      <div class="terminal">
        <command-line></command-line>
      </div>
    </div>`;
  }
}

customElements.define("terminal-window", TerminalWindow);
