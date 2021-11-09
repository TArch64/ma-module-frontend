import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'join' })
export class JoinPipe implements PipeTransform {
    public transform(array: Array<string | number>, delimiter: string = ', '): string {
        return array.join(delimiter);
    }
}
