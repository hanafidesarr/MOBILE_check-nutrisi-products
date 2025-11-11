import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regexReplace',
  pure: true, // pipe akan otomatis di-cache untuk performa lebih baik
})
export class RegexReplacePipe implements PipeTransform {
  transform(value: string, pattern: string, replacement: string): string {
    if (!value) return '';
    const regex = new RegExp(pattern, 'g'); // global replace
    return value.replace(regex, replacement);
  }
}
