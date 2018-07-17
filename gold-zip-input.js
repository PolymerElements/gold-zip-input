/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/paper-input/paper-input-container.js';
import '@polymer/paper-input/paper-input-error.js';
import '@polymer/iron-input/iron-input.js';
import './zip-validator.js';

import {IronFormElementBehavior} from '@polymer/iron-form-element-behavior/iron-form-element-behavior.js';
import {PaperInputBehavior} from '@polymer/paper-input/paper-input-behavior.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
/**
`gold-zip-input` is a single-line text field with Material Design styling
for entering a US zip code.

    <gold-zip-input></gold-zip-input>

It may include an optional label, which by default is "Zip Code".

    <gold-zip-input label="Mailing zip code"></gold-zip-input>

### Validation

The input supports both 5 digit zip codes (90210) or the full 9 digit ones,
separated by a dash (90210-9999).

The input can be automatically validated as the user is typing by using
the `auto-validate` and `required` attributes. For manual validation, the
element also has a `validate()` method, which returns the validity of the
input as well sets any appropriate error messages and styles.

See `Polymer.PaperInputBehavior` for more API docs.

### Styling

See `Polymer.PaperInputContainer` for a list of custom properties used to
style this element.

@group Gold Elements
@demo demo/index.html
@class gold-zip-input
*/
Polymer({
  _template: html`
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

    <paper-input-container
        id="container"
        auto-validate="[[autoValidate]]"
        attr-for-value="bind-value"
        disabled$="[[disabled]]"
        no-label-float="[[noLabelFloat]]"
        always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]"
        invalid="[[invalid]]">
      <label slot="label" hidden$="[[!label]]">[[label]]</label>

      <zip-validator></zip-validator>

      <iron-input
          id="input"
          slot="input"
          allowed-pattern="[0-9\\-]"
          bind-value="{{value}}"
          invalid="{{invalid}}"
          validator="zip-validator">
        <input
            id="nativeInput"
            aria-labelledby$="[[_ariaLabelledBy]]"
            aria-describedby$="[[_ariaDescribedBy]]"
            required$="[[required]]"
            type="tel"
            maxlength="10"
            autocomplete="postal-code"
            name$="[[name]]"
            disabled$="[[disabled]]"
            autofocus$="[[autofocus]]"
            inputmode$="[[inputmode]]"
            placeholder$="[[placeholder]]"
            readonly$="[[readonly]]"
            size$="[[size]]"
            on-change="_onChange">
      </iron-input>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error slot="add-on" id="error">
          [[errorMessage]]
        </paper-input-error>
      </template>

    </paper-input-container>
  `,
  is: 'gold-zip-input',

  behaviors: [PaperInputBehavior, IronFormElementBehavior],

  properties: {
    /**
     * The label for this input.
     */
    label: {
      type: String,
      value: 'Zip Code',
    },

    value: {
      // Required for the correct TypeScript type-generation
      type: String,
    }

  },

  observers: ['_computeValue(value)'],

  /**
   * Returns a reference to the focusable element. Overridden from
   * PaperInputBehavior to correctly focus the native input.
   */
  get _focusableElement() {
    return this.inputElement._inputElement;
  },

  listeners: {'iron-input-ready': '_onIronInputReady'},

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
      value = value.substr(0, 5) + '-' + value.substr(5)
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
