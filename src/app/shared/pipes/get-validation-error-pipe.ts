import { Pipe, PipeTransform } from '@angular/core';
import { GLOBAL_CONSTANT } from '../../core/constants/global.constant';

@Pipe({
  name: 'getValidationError',
})
export class GetValidationErrorPipe implements PipeTransform {
  transform(value: any): string | null {
    // for signal forms
    if (Array.isArray(value)) {
      for(let error of value){
        console.log(error)
        if(error.kind==='required'){
          return GLOBAL_CONSTANT.VALIDATION_TEXT.REQUIRED
        }
        else if(error.kind==='minLength'){
          return `Minumum ${error.minLength} characters required`
        }
        else if(error.kind==='maxLength'){
          return `Maximum ${error.maxLength} characters are allowed`
        }
        return error.message
      }
    }
    // for template/ reactive forms
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
        else if(value?.['min']){
          return `Value should be more than ${value?.['min'].min}`
        }
        else if(value?.['max']){
          return `Value should be less than ${value?.['max'].max}`
        }
      }
    }
    return null;
  }
}
