import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { HOBBIES } from 'src/app/data/constants';
import { User } from 'src/app/data/interfaces/user';

@Component({
    selector: 'app-sign-in-form',
    templateUrl: './sign-in-form.component.html',
    styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit, OnDestroy {
    @Input() userData?: User;
    @Input() buttonContent: string = 'Continue';
    @Output() outputData = new EventEmitter<User>();

    userDataForm!: UntypedFormGroup;
    hobbies = HOBBIES;

    constructor(private fb: UntypedFormBuilder) {
        this.userDataForm = this.fb.group({
            name: [null, [Validators.required]],
            hobbies: [[]],
            dateBirth: [null, [Validators.required]],
            document: [null, [Validators.required]],
        });
    }

    ngOnInit(): void {
        if (this.userData) this.userDataForm.patchValue(this.userData);
    }

    ngOnDestroy(): void {
        this.userData = undefined;
    }

    onNext() {
        const { name, hobbies, dateBirth, document } = this.userDataForm.value;
        const userData: User = {
            dateBirth,
            name,
            hobbies,
            document,
        };

        this.outputData.emit(userData);
    }
}
