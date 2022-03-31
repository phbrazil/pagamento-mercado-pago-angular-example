import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as $ from 'jquery';


@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {


  totalHours: number = 10;

  newEntryForm: FormGroup;

  projeto: string;

  project: any = [];
  projects = [{ name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }];



  constructor(public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {


    this.newEntryForm = this.fb.group({
      projeto: ['', Validators.required],
      time: ['', Validators.required],
    });

  }

  close() {
    this.dialog.closeAll();
  }

  onChangeProject(){

    this.project = this.newEntryForm.value.projeto;

    console.log(this.newEntryForm.value.projeto)

  }
}
