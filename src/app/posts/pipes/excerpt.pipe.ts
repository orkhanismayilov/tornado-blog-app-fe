import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt',
})
export class ExcerptPipe implements PipeTransform {
  private firstPRegex: RegExp = /<p>(?<firstP>.*?)<\/p>/g;

  transform(value: string, maxLength: number = 100): string {
    return this.firstPRegex.exec(value)?.groups?.firstP?.substring(0, maxLength) || value;
  }
}
