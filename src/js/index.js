/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

const Keyboard = {

  elements: {
    container: null,
    main: null,
    keysContainer: null,
    keys: [],
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    langRu: false,
  },

  keyLayout: {
    ru: [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
      'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
      'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift ',
      'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl',
    ],

    eng: [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift ',
      'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl',
    ],

    shiftRu: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '/', ','],

    shiftEng: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'],
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
    this.textArea = document.querySelector('#input');
    this.textArea.textContent = this.properties.value;

    // add to DOM

    this.elements.main.append(this.elements.keysContainer);
    this.elements.container.append(this.elements.main);

    // state
  },

  createKeys() {
    const fragment = document.createDocumentFragment();

    this.keyLayout.eng.forEach((key) => {
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
            this.textArea.textContent = this.properties.value;
          });

          break;

        case 'Del':
          keyElement.classList.add('keyboard__key--del');
          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.properties.value = getDeleteKey;
            this.textArea.textContent = this.properties.value;
          });

          break;

        case 'CapsLock':
          keyElement.classList.add('keyboard__key--caps');
          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--caps-active', this.properties.capsLock);
          });

          document.addEventListener('keydown', (event) => {
            if (event.key === 'CapsLock') {
              this.toggleCapsLock();
              keyElement.classList.toggle('keyboard__key--caps-active', this.properties.capsLock);
            }
          });


          break;

        case 'Enter':
          keyElement.classList.add('keyboard__key--middle-wide');
          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.textArea.textContent = this.properties.value;
          });

          break;

        case ' ':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.textContent = ' ';

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.textArea.textContent = this.properties.value;
          });

          break;

        case 'Shift':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = key;


          keyElement.addEventListener('click', () => {
            this.toggleShift();
            this.textArea.textContent = this.properties.value;
          });

          document.addEventListener('keydown', (evt) => {
            evt.preventDefault();

            if (evt.key === 'Shift') {
              this.toggleShift();
              this.textArea.textContent = this.properties.value;
            }
          });

          document.addEventListener('keyup', (evt) => {
            if (evt.key === 'Shift') {
              this.toggleShift();
              this.textArea.textContent = this.properties.value;
            }
          });

          break;

        case 'Shift ':
          keyElement.classList.add('keyboard__key--middle-wide');
          keyElement.textContent = key;


          keyElement.addEventListener('click', () => {
            this.toggleShift();
            this.textArea.textContent = this.properties.value;
          });

          break;

        case 'Tab':
          keyElement.classList.add('keyboard__key--easy-wide');
          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.textArea.textContent = this.properties.value;
          });

          break;

        default:

          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? keyElement.textContent.toUpperCase() : keyElement.textContent.toLowerCase();
            this.textArea.textContent = this.properties.value;
          });

          document.addEventListener('keydown', (evt) => {
            evt.preventDefault();

            if (evt.key === `Key${keyElement.textContent}`) {
              this.properties.value += this.properties.capsLock ? keyElement.textContent.toUpperCase() : keyElement.textContent.toLowerCase();
              this.textArea.textContent = this.properties.value;
            }
          });

          break;
      }

      fragment.append(keyElement);

      if (insertLineBreak) {
        fragment.append(document.createElement('br'));
      }
    });

    this.runOnKeys();

    return fragment;
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

  toggleShift() {
    this.properties.shift = !this.properties.shift;

    const letter = new RegExp("^[\\\\`=0-9,./'-\\[\\]]$");
    const arr = [];
    this.elements.keys.forEach((key) => {
      if (letter.test(key.textContent)) {
        arr.push(key);
      }
      return arr;
    });

    arr.forEach((key, index) => {
      if (this.properties.shift && !this.properties.langRu) {
        key.textContent = this.keyLayout.shiftEng[index];
      }

      if (this.properties.shift && this.properties.langRu) {
        key.textContent = this.keyLayout.shiftRu[index];
      }
    });

    this.elements.keys.forEach((key, index) => {
      if (!this.properties.shift && !this.properties.langRu) {
        key.textContent = this.keyLayout.eng[index];
      } else if (!this.properties.shift && this.properties.langRu) {
        key.textContent = this.keyLayout.ru[index];
      }
    });
    const letterUpper = new RegExp('^[A-zА-яЁё]$');

    this.elements.keys.forEach((key) => {
      if (letterUpper.test(key.textContent)) {
        key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    });
  },

  toggleLanguage() {
    this.properties.langRu = !this.properties.langRu;
    this.elements.keys.forEach((key, index) => {
      if (this.properties.langRu) {
        key.textContent = this.keyLayout.ru[index];
      } else {
        key.textContent = this.keyLayout.eng[index];
      }
    });
  },

  runOnKeys() {
    const pressed = new Set();
    const keysPress = ['ControlLeft', 'AltLeft'];

    document.addEventListener('keydown', (event) => {
      pressed.add(event.code);
      for (const code of keysPress) {
        if (!pressed.has(code)) {
          return;
        }
      }
      pressed.clear();

      this.toggleLanguage();
    });

    document.addEventListener('keyup', (event) => {
      pressed.delete(event.code);
    });
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
