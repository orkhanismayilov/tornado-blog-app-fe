import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postDate',
  standalone: true,
})
export class PostDatePipe implements PipeTransform {
  private formatter = new Intl.RelativeTimeFormat('en-US', {
    numeric: 'auto',
  });
  private divisions = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
  ];

  transform(value: Date): string {
    const date = new Date(value);
    if (Math.abs((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) >= 7) {
      return formatDate(date, 'dd MMMM yyyy HH:mm', 'en-US');
    }

    return this.formatTimeAgo(date);
  }

  private formatTimeAgo(date: Date): string {
    let duration = (date.getTime() - new Date().getTime()) / 1000;

    for (const { amount, name } of this.divisions) {
      if (Math.abs(duration) < amount) {
        return this.formatter.format(Math.round(duration), name as any);
      }
      duration /= amount;
    }
  }
}
