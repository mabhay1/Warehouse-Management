import { Pipe, PipeTransform } from '@angular/core';
import { GLOBAL_CONSTANT } from '../../core/constants/global.constant';

@Pipe({
  name: 'getValidationError',
})
export class GetValidationErrorPipe implements PipeTransform {
  transform(value: any): string | null {
    if (Array.isArray(value)) {
      for(let error of value){
        // console.log(error.kind,error?.minLength)
        return error.message
      }
    }
    else {
      if (value !== null) {
        if (value?.['required']) {
          return GLOBAL_CONSTANT.VALIDATION_TEXT.REQUIRED
        }
        else if (value?.['minlength']) {
          return `Minimum ${value?.['minlength'].requiredLength} characters required`
        }
        else if (value?.['maxlength']) {
          return `Maximum ${value?.['maxlength'].requiredLength} characters required`
        }
        else if (value?.['pattern']) {
          if (value?.['pattern'].requiredPattern === GLOBAL_CONSTANT.REGEX.EMAIL.toString()) {
            return GLOBAL_CONSTANT.VALIDATION_TEXT.EMAIL
          }
        }
      }
    }
    return null;
  }
}
