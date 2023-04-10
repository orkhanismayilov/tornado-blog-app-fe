import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  private typeMethodMap = new Map([
    ['html', this.sanitizer.bypassSecurityTrustHtml],
    ['style', this.sanitizer.bypassSecurityTrustStyle],
    ['script', this.sanitizer.bypassSecurityTrustScript],
    ['url', this.sanitizer.bypassSecurityTrustUrl],
    ['resourceUrl', this.sanitizer.bypassSecurityTrustResourceUrl],
  ]);

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    if (!this.typeMethodMap.has(type)) {
      throw new Error(`Invalid safe type specified: ${type}`);
    }

    return this.typeMethodMap.get(type)(value);
  }
}
