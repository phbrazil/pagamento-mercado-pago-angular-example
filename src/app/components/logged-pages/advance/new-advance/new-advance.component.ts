import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-advance',
  templateUrl: './new-advance.component.html',
  styleUrls: ['./new-advance.component.scss']
})
export class NewAdvanceComponent implements OnInit {

  newAdvanceForm: FormGroup;

  isLoading: boolean = false;

  projeto: string;

  project: any = [];
  projects = [{ name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }];


  constructor(public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.newAdvanceForm = this.fb.group({
      projeto: ['', Validators.required],
      time: ['', Validators.required],
      task: ['', Validators.required],
    });

  }

  close() {
    this.dialog.closeAll();
  }

  onChangeProject(){

    this.project = this.newAdvanceForm.value.projeto;

    console.log(this.newAdvanceForm.value.projeto)

  }
}
