import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pluralize' })
export class PluralizePipe implements PipeTransform {
    public transform(word: string, data: unknown[]): string {
        return data.length > 1 ? `${word}s` : word;
    }
}
