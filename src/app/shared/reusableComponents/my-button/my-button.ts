import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [NgClass, RouterLink],
  selector: 'app-my-button',
  styleUrl: './my-button.css',
  templateUrl: './my-button.html',
})
export class MyButton {
  @Input() btnType:string=''
  @Input() isLoading:boolean=false
  @Input() btnText:string=''
  @Input() routePath:string|null = null
  @Output() onBtnClick:EventEmitter<void>=new EventEmitter<void>()

  onClick(){
    this.onBtnClick.emit()
  }
}
