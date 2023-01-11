import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message:any;
  @Output() close=new EventEmitter<string>()
  constructor() { }
 
  ngOnInit(): void {
  }
 onclose(){
  this.close.emit("deneme")
 }
}
