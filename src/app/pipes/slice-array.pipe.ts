import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceArray'
})
export class SliceArrayPipe implements PipeTransform {

  transform<T>(objects: T[], buttonNumber: number, step: number): T[] {
    const startArray = (buttonNumber - 1) * step;
    const endArray = Math.min(buttonNumber * step, objects.length);

    return objects.slice(startArray, endArray);
  }
}
