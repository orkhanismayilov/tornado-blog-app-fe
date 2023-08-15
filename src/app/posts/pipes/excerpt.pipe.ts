import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt',
  standalone: true,
})
export class ExcerptPipe implements PipeTransform {
  private firstPRegex: RegExp = /<p>(?<firstP>.*?)<\/p>/;

  transform(value: string, maxLength: number = 100): string {
    return this.firstPRegex.exec(value)?.groups?.firstP?.substring(0, maxLength) || value;
  }
}
