import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/_models/project';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
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
  projects: Project[] = [];

  reason = [{ name: 'Viagem' }, { name: 'Almoço' }, { name: 'Jantar' }, { name: 'Café da manhã' }, { name: 'Hotel' }, { name: 'Passagem Aérea' }, { name: 'Combustível' }, { name: 'Passagem Terrestre' }, { name: 'Uber' }];

  constructor(public dialog: MatDialog, private fb: FormBuilder,
    private accountService: AccountService, private projectService: ProjectService,
    private currencyService: CurrencyService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.newAdvanceForm = this.fb.group({
      project: ['', Validators.required],
      idUser: [this.user.idUser, Validators.required],
      value: ['', Validators.required],
      deadline: ['', Validators.required],
    });

    this.loadProjects();

   this.loadDolar();
   this.loadEuro();

  }

  close() {
    this.dialog.closeAll();
  }

  onChangeProject(){

    this.project = this.newAdvanceForm.value.projeto;

  }

  loadProjects() {
    this.isLoading = true;

    this.projectService.getProjects(this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.isLoading = false;
      this.projects = res;
    }, _err => {
      this.isLoading = false;
    })

  }

  loadDolar(){

    this.isLoading = true;

    this.currencyService.getCurrency('USD').subscribe(res=>{

      this.dolarPrice = res.USD.bid;
      this.isLoading = false;

    }, _err=>{
      console.log(_err);
      this.isLoading = false;
    })

  }

  loadEuro(){

    this.isLoading = true;

    this.currencyService.getCurrency('EUR').subscribe(res=>{

      this.euroPrice = res.EUR.bid;
      this.isLoading = false;


    }, _err=>{
      console.log(_err);
      this.isLoading = false;
    })

  }
}
