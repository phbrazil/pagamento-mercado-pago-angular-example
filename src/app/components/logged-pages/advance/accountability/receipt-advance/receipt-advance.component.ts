import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt-advance',
  templateUrl: './receipt-advance.component.html',
  styleUrls: ['./receipt-advance.component.scss']
})
export class ReceiptAdvanceComponent implements OnInit {

  @Input() fileName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
