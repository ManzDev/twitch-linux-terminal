import"./vendor.5571b015.js";const m=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}};m();const l=new Audio("assets/sounds/key.mp3");class s extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render();const e=this.shadowRoot.querySelector(".container");e.focus(),e.addEventListener("blur",()=>e.focus()),e.addEventListener("keydown",o=>{l.currentTime=0,l.play(),o.code==="Enter"&&(o.preventDefault(),this.onEnter())})}onEnter(){const e=this.shadowRoot.querySelector(".container"),o=e.textContent;console.log("ENTER detectado"),e.removeAttribute("contentEditable");const r=new CustomEvent("NEW_COMMMAND",{detail:{command:o},composed:!0});this.dispatchEvent(r)}render(){this.shadowRoot.innerHTML=`
    <style>${s.styles}</style>
    <div class="container" contenteditable></div>`}}customElements.define("command-input",s);class a extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${a.styles}</style>
    <div class="container">
      <div class="prompt">manz@MANZ.DEV ~ $</div>
      <command-input></command-input>
    </div>`}}customElements.define("command-line",a);class d extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}setCommand(e){this.command=e,this.reply=this.command===""?"":"Respuesta del comando"}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${d.styles}</style>
    <div class="container">
      ${this.reply}
    </div>`}}customElements.define("command-reply",d);class c extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"}),this.title="Manz.dev Terminal"}static get styles(){return`
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
    `}connectedCallback(){this.render(),this.addEventListener("NEW_COMMMAND",e=>this.onNewCommand(e.detail))}onNewCommand(e){console.log("NEW_COMMMAND detectado");const o=this.shadowRoot.querySelector(".terminal");if(e.command==="clear")o.innerHTML="";else{const t=document.createElement("command-reply");t.setCommand(e.command),o.appendChild(t)}const r=document.createElement("command-line");o.appendChild(r)}render(){this.shadowRoot.innerHTML=`
    <style>${c.styles}</style>
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
    </div>`}}customElements.define("terminal-window",c);
