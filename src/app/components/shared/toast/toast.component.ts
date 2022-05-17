import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faCheckCircle, faExclamationCircle, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  faInactive = faThumbsDown;
  faSuccess = faCheckCircle;
  faWarning = faExclamationCircle;

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: string = '';
  @Input() show: boolean = true;


  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.show = false;
  }

}
