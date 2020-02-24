import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
<<<<<<< HEAD
    return ( formGroup : FormGroup ) => {
=======
    return ( formGroup: FormGroup ) => {
>>>>>>> feature
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

<<<<<<< HEAD
        if (control.value != matchingControl.value) {
=======
        if (control.value !== matchingControl.value) {
>>>>>>> feature
            matchingControl.setErrors({mustMatch: true});
        } else {
            matchingControl.setErrors(null);
        }
<<<<<<< HEAD
    }
=======
    };
>>>>>>> feature
}
