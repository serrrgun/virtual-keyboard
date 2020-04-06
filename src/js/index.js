/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

const Keyboard = {

  elements: {
    container: null,
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    // create main element
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // setup main element

    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.append(this.createKeys());
    this.elements.container = document.querySelector('.container');
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // add to DOM

    this.elements.main.append(this.elements.keysContainer);
    this.elements.container.append(this.elements.main);
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift ',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl',
    ];

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'Del', 'Enter', 'Shift '].indexOf(key) !== -1;

      // get attrtibutes for key

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      const getDeleteKey = this.properties.value.substring(0, this.properties.value.length - 1);

      switch (key) {
        case 'Backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.properties.value = getDeleteKey;
            this.triggerEvent('oninput');
          });

          break;

        case 'Del':
          keyElement.classList.add('keyboard__key--del');
          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.properties.value = getDeleteKey;
            this.triggerEvent('oninput');
          });

          break;

        case 'CapsLock':
          keyElement.classList.add('keyboard__key--caps');
          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--caps-active', this.properties.capsLock);
          });

          break;

        case 'Enter':
          keyElement.classList.add('keyboard__key--middle-wide');
          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'Space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.textContent = ' ';

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });

          break;

        case 'Shift':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = key;


          keyElement.addEventListener('click', () => {
            this.triggerEvent('oninput');
          });

          break;

        case 'Shift ':
          keyElement.classList.add('keyboard__key--middle-wide');
          keyElement.textContent = key;


          keyElement.addEventListener('click', () => {
            this.triggerEvent('oninput');
          });

          break;

        case 'Tab':
          keyElement.classList.add('keyboard__key--easy-wide');
          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });

          break;

        default:

          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvent('oninput');
          });

          break;
      }

      fragment.append(keyElement);

      if (insertLineBreak) {
        fragment.append(document.createElement('br'));
      }
    });

    return fragment;
  },

  triggerEvent(handlerName) {
    console.log('Handler Name:', handlerName);
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    const letter = new RegExp('^[A-zА-яЁё]$');

    this.elements.keys.forEach((key) => {
      if (letter.test(key.textContent)) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    });
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
