import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getInitials',
})
export class GetInitialsPipe implements PipeTransform {
  transform(value: string): unknown {
    if(value){
      const namesList=value.split(" ")
      let initialsName='';
      namesList.forEach((item)=>{
        initialsName=initialsName+item.charAt(0).toUpperCase()
      })
      return initialsName
    }
    return null
  }
}
