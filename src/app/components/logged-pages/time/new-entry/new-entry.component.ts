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



  myControl = new FormControl('');

  totalHours: number = 10;

  formLogin = this.fb.group({
    date: ['', Validators.required],
  });

  newEntryForm: FormGroup;

  projeto: string;

  selectedAppendices: any = [];
  appendices = [{ name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }];



  constructor(public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.newEntryForm = this.fb.group({
      projeto: ['', Validators.required],

      //cidade: ['', Validators.required],
      //estado: ['', Validators.required],
      //uf: ['', Validators.required],
    });

  }

  close() {
    this.dialog.closeAll();
  }

  onChange(){

  }
}
