import { FormGroup } from '@angular/forms';

export function ValidForm( ): MethodDecorator {
  return function(target: Function, key: string, descriptor: any) {
    const originalMethod = descriptor.value;

    descriptor.value =  function(form: FormGroup) {
      if (form.invalid) {
        return;
      } else {
        originalMethod.call(this, form);
      }
    };

    return descriptor;
  };
}
