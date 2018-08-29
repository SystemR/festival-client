import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genreDisplay'
})
export class GenreDisplayPipe implements PipeTransform {
  transform(value: string[]): any {
    if (value && value.length) {
      const tags = [];
      for (let i = 0, len = value.length; i < len; i++) {
        const tag = value[i];
        if (tag) {
          tags.push(`${tag[i].toUpperCase()}${tag.substring(1)}`);
        }

        return tags.join(', ');
      }
    }
    return null;
  }
}
