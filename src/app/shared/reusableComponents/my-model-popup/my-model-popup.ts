import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [NgStyle],
  selector: 'app-my-model-popup',
  styleUrl: './my-model-popup.css',
  templateUrl: './my-model-popup.html',
})
export class MyModelPopup {

  @Input() openModel:boolean = false
  @Output() modalClosed:EventEmitter<void>=new EventEmitter<void>()

  closeModel(){
    this.openModel=false
    this.modalClosed.emit()
  }

}
