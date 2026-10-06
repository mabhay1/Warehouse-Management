import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'constant',
})
export class ConstantPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
