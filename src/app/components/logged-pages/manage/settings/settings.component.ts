import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  //adiantamento
  advanceRequestApproval: boolean = false;
  emailsAdvanceNotify: string[] = [];
  advanceAlertDays: number = 30;
  maxOpenAdvance: number = 2;

  //reembolso
  refundRequestApproval: boolean = false;
  maxOpenRefund: number = 3;
  emailsRefundNotify: string[] = [];

  //tempo
  timeRequestApproval: boolean = true;
  timeAlertDays: string[] = [];

  constructor() { }

  ngOnInit(): void {

    this.emailsAdvanceNotify.push('financeiro@empresa.com');
    this.emailsRefundNotify.push('financeiro@empresa.com');

    //time
    this.timeAlertDays.push('Segunda, Terça, Quarta, Quinta, Sexta')

  }

}
