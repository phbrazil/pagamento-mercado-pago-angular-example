import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as $ from 'jquery';
import moment from 'moment';
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

  project: any = [];
  projects = [{ name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }];


  task: any = [];
  tasks = [{ name: 'Relatórios' }, { name: 'Reunião Interna' }, { name: 'Reunião Externa' }, { name: 'Visita Cliente' }];


  constructor(public dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public currentDay: any) { }

  ngOnInit(): void {

    this.newEntryForm = this.fb.group({
      project: ['', Validators.required],
      time: ['', Validators.required],
      task: ['', Validators.required],
      notes: [''],
      date: [this.currentDay, Validators.required],
    });

  }

  close() {
    this.dialog.closeAll();
  }

  onChangeProject(){

    this.project = this.newEntryForm.value.project;

  }

  onChangeTask(){

    this.task = this.newEntryForm.value.task;

  }

  checkTime(time: any){

    time = time.replace(/\D/g, "")
    //time = time.replace(/^(\d)/, ":$1")
    //time = time.replace(/(.{3})(\d)/, "$1)$2")
    if (time.length >= 3) {
        time = time.replace(/(.{2})$/, ":$1")
    } else if (time.length >= 2) {
        time = time.replace(/(.{2})$/, ":$1")
    } else if (time.length >= 1) {
        time = time.replace(/(.{2})$/, ":$1")
    }

    this.timeModel = time;

    this.newEntryForm.patchValue({
      time: this.timeModel
    })

  }

  onSubmit(){
    this.isLoading = true;
    console.log('to aqui')
  }


}
