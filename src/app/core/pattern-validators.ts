import { AbstractControl, FormControl, ValidatorFn, Validators, FormGroup } from '@angular/forms';

const validCharacters = /[^\s\w,.:&\/()+%'`@-]/;
// create your class that extends the angular validator class
export class CustomValidators extends Validators {

  // create a static method for your validation
  static validateCharacters(control: FormControl) {

    // first check if the control has a value
    if (control.value && control.value.length > 0) {

      // match the control value against the regular expression
      const matches = control.value.match(validCharacters);

      // if there are matches return an object, else return null.
      return matches && matches.length ? {invalid_characters: matches} : null;
    } else {
      return null;
    }
  }

  // email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])
  static patternValidator(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;
      if (value === '') {
        return null;
      }
      return !regexp.test(value) ? {'patternInvalid': {regexp}} : null;
    };
  }
}

//
// export function patternValidator(regexp: RegExp): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } => {
//     const value = control.value;
//     if (value === '') {
//       return null;
//     }
//     return !regexp.test(value) ? { 'patternInvalid': { regexp } } : null;
//   };
// }
