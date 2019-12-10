import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({name: 'renderHtml'})
export class RenderHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(content: { en: string, ar: string}, language: string): SafeHtml {
    let htmlContent = '';
    if (language === 'ar') {
      htmlContent = content.ar;
    } else {
      htmlContent = content.en;
    }
    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }
}
