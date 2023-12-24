import { Component, EventEmitter, Output } from '@angular/core';
import { FileUtils } from 'src/app/core/utils/file.utils';
import { Image } from 'src/app/data/interfaces/user';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
    @Output() file = new EventEmitter<Image>();

    urlImage: string = '';
    imageName: string = 'Adjuntar foto';

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
}
