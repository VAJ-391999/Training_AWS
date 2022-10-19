import { Directive, Attribute } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[compare-password-validator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ComparePasswordValidator,
      multi: true,
    },
  ],
})
export class ComparePasswordValidator implements Validator {
  constructor(
    @Attribute('compare-password-validator')
    public comparePasswordValidator: string,
    @Attribute('reverse') public reverse: string
  ) {}

  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true : false;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    // self value (e.g. retype password)
    let v = control.value;
    // control value (e.g. password)
    let e = control.root.get(this.comparePasswordValidator);
    // value not equal
    if (e && v !== e.value && !this.reverse) {
      console.log('Not matched');
      return { validateEqual: false };
    }

    // value equal and reverse
    if (e && v === e.value && this.isReverse) {
      delete e.errors!['validateEqual'];
      if (!Object.keys(e.errors!).length) e.setErrors(null);
    }
    // value not equal and reverse
    if (e && v !== e.value && this.isReverse) {
      e.setErrors({ validateEqual: false });
    }
    console.log('Matched');
    return null;
  }
}
