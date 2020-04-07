/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

const Keyboard = {

  elements: {
    container: null,
    main: null,
    textArea: null,
    mainKeys: null,
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
    this.elements.container = document.createElement('div');
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');
    this.elements.textArea = document.createElement('textarea');

    // setup main element
    this.elements.container.classList.add('container');
    this.elements.main.classList.add('keyboard');
    this.elements.textArea.classList.add('input');

    // add to DOM
    this.elements.main.append(this.createKeys());
    this.elements.main.append(this.elements.keysContainer);
    this.elements.container.append(this.elements.textArea);
    this.elements.container.append(this.elements.main);
    document.body.prepend(this.elements.container);

    this.elements.keys = this.elements.main.querySelectorAll('.keyboard__key');
  },

  pushToTextArea() {
    this.elements.textArea.textContent = this.properties.value;
  },

  createKeys() {
    const fragment = document.createDocumentFragment();

    this.keyLayout.ru.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'Del', 'Enter', 'Shift '].indexOf(key) !== -1;

      // get attrtibutes for key

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      const getDeleteKey = this.properties.value.substring(0, this.properties.value.length - 1);

      keyElement.addEventListener('mousedown', () => {
        keyElement.classList.add('keyboard__key--down');
      });

      keyElement.addEventListener('mouseup', () => {
        keyElement.classList.remove('keyboard__key--down');
      });

      switch (key) {
        case 'Backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.properties.value = getDeleteKey;
            this.pushToTextArea();
          });

          break;

        case 'Del':
          keyElement.classList.add('keyboard__key--del');
          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.properties.value = getDeleteKey;
            this.pushToTextArea();
          });

          break;

        case 'CapsLock':
          keyElement.classList.add('keyboard__key--caps');
          keyElement.textContent = key;

          keyElement.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--caps-active');
          });

          document.addEventListener('keyup', (evt) => {
            evt.preventDefault();
            keyElement.classList.remove('keyboard__key--down');
          });

          document.addEventListener('keydown', (evt) => {
            evt.preventDefault();
            if (evt.key === 'CapsLock') {
              this.toggleCapsLock();
              keyElement.classList.toggle('keyboard__key--caps-active');
              keyElement.classList.add('keyboard__key--down');
            }
          });

          break;

        case 'Enter':
          keyElement.classList.add('keyboard__key--middle-wide');
          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.pushToTextArea();
          });

          document.addEventListener('keyup', () => {
            keyElement.classList.remove('keyboard__key--down');
          });

          document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Enter') {
              keyElement.classList.add('keyboard__key--down');
              this.properties.value += '\n';
              this.pushToTextArea();
            }
          });

          break;

        case ' ':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.textContent = ' ';

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.pushToTextArea();
          });

          break;

        case 'Shift':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = key;


          keyElement.addEventListener('click', () => {
            this.toggleShift();
            this.pushToTextArea();
          });

          document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Shift' && !evt.repeat) {
              this.toggleShift();
              this.pushToTextArea();
            }
          });

          document.addEventListener('keyup', (evt) => {
            if (evt.key === 'Shift' && !evt.repeat) {
              this.toggleShift();
              this.pushToTextArea();
            }
          });

          break;

        case 'Shift ':
          keyElement.classList.add('keyboard__key--middle-wide');
          keyElement.textContent = key;


          keyElement.addEventListener('click', () => {
            this.toggleShift();
            this.pushToTextArea();
          });

          break;

        case 'Tab':
          keyElement.classList.add('keyboard__key--easy-wide');
          keyElement.textContent = key;

          keyElement.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.properties.value += '  ';
            this.pushToTextArea();
          });

          break;

        default:

          keyElement.textContent = key;
          keyElement.setAttribute('data-key', key);

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? keyElement.textContent.toUpperCase() : keyElement.textContent.toLowerCase();
            this.pushToTextArea();
          });

          document.addEventListener('keydown', (evt) => {
            if (evt.key === keyElement.getAttribute('data-key')) {
              this.properties.value += this.properties.capsLock ? keyElement.textContent.toUpperCase() : keyElement.textContent.toLowerCase();
              this.pushToTextArea();
              keyElement.classList.add('keyboard__key--down');
            }
          });

          document.addEventListener('keyup', (evt) => {
            if (evt.key === keyElement.getAttribute('data-key')) {
              keyElement.classList.remove('keyboard__key--down');
            }
          });
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
