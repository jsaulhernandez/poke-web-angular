import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { intervalToDuration } from 'date-fns';

import { FileUtils } from 'src/app/core/utils/file.utils';
import { Image, User } from 'src/app/data/interfaces/user';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit, OnDestroy {
    @Input() userData?: User;
    @Input() option?: 'ADD' | 'SHOW' = 'ADD';
    @Output() file = new EventEmitter<Image>();

    urlImage: string = '';
    imageName: string = 'Adjuntar foto';
    hobbies: string = '';
    age: string = '';

    ngOnInit(): void {
        this.hobbies = this.userData?.hobbies?.join(', ') ?? '-';
        this.age = this.getAge();
        this.urlImage = this.userData?.resource?.base64 ?? '';
        this.imageName = this.userData?.resource?.imageName ?? 'Adjuntar foto';
    }

    ngOnDestroy(): void {
        this.userData = undefined;
    }

    async uploadFile(event: Event) {
        const target = event.target as HTMLInputElement;

        if (target!.files!.length > 0) {
            this.urlImage = await FileUtils.getBase64(target!.files![0]);
            this.imageName = target!.files![0].name;
            this.file.emit({
                base64: this.urlImage,
                imageName: this.imageName,
            });
        } else {
            this.urlImage = '';
            this.imageName = 'Adjuntar foto';
        }
    }

    removeImage() {
        this.urlImage = '';
        this.imageName = 'Adjuntar foto';
    }

    getAge() {
        if (this.userData?.dateBirth) {
            const start = this.userData.dateBirth;
            const end = new Date();
            const data = intervalToDuration({ start, end });

            return `${data.years}`;
        }

        return '-';
    }
}
