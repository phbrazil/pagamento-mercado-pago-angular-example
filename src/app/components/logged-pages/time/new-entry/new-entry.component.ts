import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {

  formLogin = this.fb.group({
    date: ['', Validators.required],
  });

  constructor(public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  close() {
    this.dialog.closeAll();
  }

}
