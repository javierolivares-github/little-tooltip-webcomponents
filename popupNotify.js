const template = document.createElement('template');
template.innerHTML = `

  <style>

    .tooltip-container {
      display: inline-block;
      position: relative;
      z-index: 2;
    }

    .cancel {
      display: none;
    }

    svg {
      width: 1em;
      cursor: pointer;
    }

    .notify-container {
      position: absolute;
      bottom: 125%;
      z-index: 9;
      width: 300px;
      background: white;
      box-shadow: 5px 5px 10px rgba(0,0,0,0.1);
      font-size: .8em;
      border-radius: .5em;
      padding: 1em;
      transform: scale(0);
      transform-origin: bottom left;
      transition: transform 500ms cubic-bezier(0.860, 0.000, 0.070, 1.000);
    }

  </style>

  <div class="tooltip-container">
    <svg class="alert" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#3290FF"/>
      <path d="M10 5H14L12.5 15H11.5L10 5Z" fill="white"/>
      <circle cx="12" cy="18" r="1" fill="white"/>
    </svg>

    <svg class="cancel" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#3290FF"/>
      <rect x="6" y="8.57944" width="2" height="14" transform="rotate(-49.2447 6 8.57944)" fill="white"/>
      <rect x="16.5302" y="7" width="2" height="14" transform="rotate(48.4445 16.5302 7)" fill="white"/>
    </svg>

    <div class="notify-container">
      <slot name="message" />
    </div>
  </div>


`;

class PopupNotify extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  tooltip(expandState) {
    const tooltip = this.shadowRoot.querySelector('.notify-container');
    const alert = this.shadowRoot.querySelector('.alert');
    const cancel = this.shadowRoot.querySelector('.cancel');

    if(expandState == true) {
      tooltip.style.transform = 'scale(1)';
      alert.style.display = 'none';
      cancel.style.display = 'block';
      expandState = false;
    } else {
      tooltip.style.transform = 'scale(0)';
      cancel.style.display = 'none';
      alert.style.display = 'block';
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.alert').addEventListener('click', () => {
      this.tooltip(true);
    })
    this.shadowRoot.querySelector('.cancel').addEventListener('click', () => {
      this.tooltip(false);
    })

    if(this.getAttribute('tip_background')) {
      this.shadowRoot.querySelector('.notify-container').style.background = this.getAttribute('tip_background');
    }
    if(this.getAttribute('tip_color')) {
      this.shadowRoot.querySelector('.notify-container').style.color = this.getAttribute('tip_color');
    }
  }
};

window.customElements.define('popup-notify', PopupNotify);