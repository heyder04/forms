import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smth'
})
export class SmthPipe implements PipeTransform {

  transform(value: string, ...args: string[]): unknown {
    let added=args
    return value+added;
  }

}
