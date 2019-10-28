import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ImageConverter {
    constructor(private domSanitzer: DomSanitizer) {
    }

    createImageUrl(bytes: any): SafeUrl {
        const strChar = String.fromCharCode(bytes);
        let base64String = btoa(strChar);
        return this.domSanitzer.bypassSecurityTrustUrl('data:image/jpg;base64,' + bytes);
    }
}