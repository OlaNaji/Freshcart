import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description',
  standalone: true,
})
export class DescriptionPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return ''; // Return an empty string if value is undefined or null

    const lines = value.split('\n');
    let transformedText = '';

    lines.forEach(line => {
      const [key, val] = line.split('\t');
      if (key && val) { // Check if key and val are defined
        transformedText += `${key.toLowerCase()}: ${val.toLowerCase()} <br>`;
      }
    });

    return transformedText.trim();
  }

}
