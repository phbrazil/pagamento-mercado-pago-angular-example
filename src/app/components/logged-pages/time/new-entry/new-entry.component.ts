import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as $ from 'jquery';
import moment from 'moment';
import { TimeService } from 'src/app/_services/time.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { TimeTask } from 'src/app/_models/task';
moment().format('LL');
moment.locale('pt')


@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {

  timeModel: string;

  newEntryForm: FormGroup;

  isLoading: boolean = false;

  user: User;

  project: string;
  projects = [{ name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }];


  task: string;
  tasks = [{ name: 'Relatórios' }, { name: 'Reunião Interna' }, { name: 'Reunião Externa' }, { name: 'Visita Cliente' }];


  constructor(public dialog: MatDialog, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public currentDay: any,
    private timeService: TimeService,
    private accountService: AccountService,
    private router: Router) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.newEntryForm = this.fb.group({
      project: ['', Validators.required],
      time: ['', Validators.required],
      task: ['', Validators.required],
      notes: [''],
      date: [this.currentDay.currentDay, Validators.required],
      idUser: [this.user.idUser, Validators.required],
    });

  }

  close() {
    this.dialog.closeAll();

    this.router.navigateByUrl('/reload', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/time'])
);
  }

  onChangeProject() {

    this.project = this.newEntryForm.value.project.name;

  }

  onChangeTask() {

    this.task = this.newEntryForm.value.task.name;

  }

  checkTime(time: any) {

    time = time.replace(/\D/g, "");
    if (time.length >= 3) {
      time = time.replace(/(.{2})$/, ":$1");
    } else if (time.length >= 2) {
      time = time.replace(/(.{2})$/, ":$1");
    } else if (time.length >= 1) {
      time = time.replace(/(.{2})$/, ":$1");
    }

    this.timeModel = time;

    this.newEntryForm.patchValue({
      time: this.timeModel
    })

  }

  onSubmit() {

    this.isLoading = true;

    this.timeService.newEntry(this.newEntryForm.value, this.accountService.getToken()).subscribe(res => {

      this.close();

      this.isLoading = false;

    }, err => {

      this.isLoading = false;

    })

  }


}
