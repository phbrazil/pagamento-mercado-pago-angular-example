import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/_models/project';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AdvanceService } from 'src/app/_services/advance.service';
import { CurrencyService } from 'src/app/_services/currency.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-new-advance',
  templateUrl: './new-advance.component.html',
  styleUrls: ['./new-advance.component.scss']
})
export class NewAdvanceComponent implements OnInit {

  newAdvanceForm: FormGroup;

  isLoading: boolean = false;

  projeto: string;

  user: User;

  dolarPrice: number;
  euroPrice: number;

  project: any = [];
  idProject: number;
  projects: Project[] = [];

  //CURRENCY
  currency: string = 'Real';
  exchange: number = 0;

  reasons = [{ name: 'Viagem' }, { name: 'Almoço' }, { name: 'Jantar' }, { name: 'Café da manhã' }, { name: 'Hotel' },
  { name: 'Passagem Aérea' }, { name: 'Combustível' }, { name: 'Passagem Terrestre' }, { name: 'Uber' }, { name: 'Outro' }];
  reason: string;

  constructor(public dialog: MatDialog, private fb: FormBuilder,
    private accountService: AccountService, private projectService: ProjectService,
    private currencyService: CurrencyService, private advanceService: AdvanceService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.newAdvanceForm = this.fb.group({
      project: ['', Validators.required],
      idProject: ['', Validators.required],
      idUser: [this.user.idUser, Validators.required],
      value: ['', Validators.required],
      deadline: ['', Validators.required],
      reason: ['', Validators.required],
      receiveType: ['Pix', Validators.required],
      currency: [this.currency, Validators.required],
      exchange: [this.exchange, Validators.required],
    });

    this.loadProjects();
    this.loadDolar();
    this.loadEuro();

  }

  close() {
    this.dialog.closeAll();
  }

  onChangeProject(event: any) {

    if (event != undefined) {
      this.project = this.newAdvanceForm.value.project.name;
      this.idProject = this.newAdvanceForm.value.project.idProject;
      this.newAdvanceForm.patchValue({ project: this.project, idProject: this.idProject });
    }

  }

  changeCurrency(event: any) {

    this.currency = event.target.value;

    if (event.target.value == 'Dólar') {
      this.exchange = this.dolarPrice;

    } else if (event.target.value == 'Euro') {
      this.exchange = this.euroPrice;

    } else {
      this.exchange = 0;
    }

    this.newAdvanceForm.patchValue({ currency: this.currency, exchange: this.exchange });

  }

  changeReceive(event: any) {

    this.newAdvanceForm.patchValue({ receiveType: event.target.value });

  }

  loadProjects() {
    this.isLoading = true;

    this.projectService.getProjects(this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.projects = res;
      this.isLoading = false;
    }, _err => {
      this.isLoading = false;
    })

  }

  loadDolar() {

    this.isLoading = true;

    this.currencyService.getCurrency('USD').subscribe(res => {

      this.dolarPrice = res.USD.bid;
      this.isLoading = false;

    }, _err => {
      this.isLoading = false;
    })

  }

  loadEuro() {

    this.isLoading = true;

    this.currencyService.getCurrency('EUR').subscribe(res => {

      this.euroPrice = res.EUR.bid;
      this.isLoading = false;


    }, _err => {
      this.isLoading = false;
    })

  }

  setReason() {

    var reasons = this.newAdvanceForm.value.reason;

    var reasonArray = [];

    for (const reason of reasons) {

      reasonArray.push(reason.name);

    }

    this.newAdvanceForm.patchValue({ reason: reasonArray });

  }

  submit() {

    this.setReason();

    this.isLoading = true;

    this.advanceService.newAdvance(this.newAdvanceForm.value, this.accountService.getToken()).subscribe(_res => {
      this.isLoading = false;
      this.advanceService.setIsReload(true);
      this.close();
    }, _err => {
      this.isLoading = true;
    })
  }

}
