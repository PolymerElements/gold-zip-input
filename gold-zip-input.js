import '../polymer/polymer.js';
import { PaperInputBehavior } from '../paper-input/paper-input-behavior.js';
import '../paper-input/paper-input-container.js';
import '../paper-input/paper-input-error.js';
import '../iron-input/iron-input.js';
import { IronFormElementBehavior } from '../iron-form-element-behavior/iron-form-element-behavior.js';
import './zip-validator.js';
import { Polymer } from '../polymer/lib/legacy/polymer-fn.js';
import { DomModule } from '../polymer/lib/elements/dom-module.js';
import { Element } from '../polymer/polymer-element.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="gold-zip-input">
  <template>
    <style>
      :host {
        display: block;
      }
      input
      {
        position: relative; /* to make a stacking context */
        outline: none;
        box-shadow: none;
        padding: 0;
        width: 100%;
        max-width: 100%;
        background: transparent;
        border: none;
        color: var(--paper-input-container-input-color, var(--primary-text-color));
        -webkit-appearance: none;
        text-align: inherit;
        vertical-align: bottom;
        /* Firefox sets a min-width on the input, which can cause layout issues */
        min-width: 0;
        @apply --paper-font-subhead;
        @apply --paper-input-container-input;
      }
      input::-webkit-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }
      input:-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }
      input::-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }
      input:-ms-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }
    </style>

    <paper-input-container id="container" auto-validate="[[autoValidate]]" attr-for-value="bind-value" disabled\$="[[disabled]]" no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" invalid="[[invalid]]">

      <label slot="label" hidden\$="[[!label]]">[[label]]</label>

      <zip-validator></zip-validator>

      <span id="template-placeholder"></span>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error slot="add-on" id="error">
          [[errorMessage]]
        </paper-input-error>
      </template>

    </paper-input-container>
  </template>

  <template id="v0">
    <input is="iron-input" id="input" slot="input" aria-labelledby\$="[[_ariaLabelledBy]]" aria-describedby\$="[[_ariaDescribedBy]]" required\$="[[required]]" validator="zip-validator" type="tel" allowed-pattern="[0-9\\-]" prevent-invalid-input="" maxlength="10" bind-value="{{value}}" autocomplete="postal-code" name\$="[[name]]" disabled\$="[[disabled]]" invalid="{{invalid}}" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" size\$="[[size]]">
  </template>

  <template id="v1">
    <iron-input id="input" slot="input" allowed-pattern="[0-9\\-]" bind-value="{{value}}" invalid="{{invalid}}" validator="zip-validator">
      <input id="nativeInput" aria-labelledby\$="[[_ariaLabelledBy]]" aria-describedby\$="[[_ariaDescribedBy]]" required\$="[[required]]" type="tel" maxlength="10" autocomplete="postal-code" name\$="[[name]]" disabled\$="[[disabled]]" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" size\$="[[size]]">
    </iron-input>
  </template>

  

</dom-module>`;

document.head.appendChild($_documentContainer);
Polymer({

  is: 'gold-zip-input',

  behaviors: [
    PaperInputBehavior,
    IronFormElementBehavior
  ],

  properties: {

    /**
     * The label for this input.
     */
    label: {
      type: String,
      value: "Zip Code"
    }

  },

  observers: [
    '_computeValue(value)'
  ],

  beforeRegister: function() {
    var template = DomModule.import('gold-zip-input', 'template');
    var version = Element ? 'v1' : 'v0';
    var inputTemplate = DomModule.import('gold-zip-input', 'template#' + version);
    var inputPlaceholder = template.content.querySelector('#template-placeholder');
    if (inputPlaceholder) {
      inputPlaceholder.parentNode.replaceChild(inputTemplate.content, inputPlaceholder);
    }
  },

  /**
  * Returns a reference to the focusable element. Overridden from PaperInputBehavior
  * to correctly focus the native input.
  */
  get _focusableElement() {
    return Element ? this.inputElement._inputElement : this.inputElement;
  },

  // Note: This event is only available in the 2.0 version of this element.
  // In 1.0, the functionality of `_onIronInputReady` is done in
  // PaperInputBehavior::attached.
  listeners: {
    'iron-input-ready': '_onIronInputReady'
  },

  _onIronInputReady: function() {
    // Only validate when attached if the input already has a value.
    if (!!this.inputElement.bindValue) {
      this.$.container._handleValueAndAutoValidate(this.inputElement);
    }
  },

  _computeValue: function(value) {
    value = String(value);
    var start = this.$.input.selectionStart;
    var previousCharADash = value.charAt(start - 1) === '-';

    // Remove any already-applied formatting.
    value = value.replace(/-/g, '');

    // Add a dash after the 5th character
    if (value.length > 5) {
      value = value.substr(0,5) + '-' + value.substr(5)
    }
    this.updateValueAndPreserveCaret(value.trim());

    // If the character right before the selection is a newly inserted
    // dash, we need to advance the selection to maintain the caret position.
    if (!previousCharADash && value.charAt(start - 1) === '-') {
      this.$.input.selectionStart = start + 1;
      this.$.input.selectionEnd = start + 1;
    }
  }

})
