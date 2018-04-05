/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   gold-zip-input.html
 */

/// <reference path="../polymer/types/polymer.d.ts" />
/// <reference path="../paper-input/paper-input-behavior.d.ts" />
/// <reference path="../paper-input/paper-input-container.d.ts" />
/// <reference path="../paper-input/paper-input-error.d.ts" />
/// <reference path="../iron-input/iron-input.d.ts" />
/// <reference path="../iron-form-element-behavior/iron-form-element-behavior.d.ts" />
/// <reference path="zip-validator.d.ts" />

/**
 * `gold-zip-input` is a single-line text field with Material Design styling
 * for entering a US zip code.
 *
 *     <gold-zip-input></gold-zip-input>
 *
 * It may include an optional label, which by default is "Zip Code".
 *
 *     <gold-zip-input label="Mailing zip code"></gold-zip-input>
 *
 * ### Validation
 *
 * The input supports both 5 digit zip codes (90210) or the full 9 digit ones,
 * separated by a dash (90210-9999).
 *
 * The input can be automatically validated as the user is typing by using
 * the `auto-validate` and `required` attributes. For manual validation, the
 * element also has a `validate()` method, which returns the validity of the
 * input as well sets any appropriate error messages and styles.
 *
 * See `Polymer.PaperInputBehavior` for more API docs.
 *
 * ### Styling
 *
 * See `Polymer.PaperInputContainer` for a list of custom properties used to
 * style this element.
 */
interface GoldZipInputElement extends Polymer.Element, Polymer.PaperInputBehavior, Polymer.IronFormElementBehavior {

  /**
   * The label for this input.
   */
  label: string|null|undefined;
  value: string|null|undefined;

  /**
   * Returns a reference to the focusable element. Overridden from PaperInputBehavior
   * to correctly focus the native input.
   *         
   */
  readonly _focusableElement: any;
  beforeRegister(): void;
  _onIronInputReady(): void;
  _computeValue(value: any): void;
}

interface HTMLElementTagNameMap {
  "gold-zip-input": GoldZipInputElement;
}
