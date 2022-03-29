import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  formRegister = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],

    /*address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),*/
  });

  constructor(public dialog: MatDialog, private fb: FormBuilder) { }

  isRegistering: boolean = false;

  ngOnInit(): void {


  }

  close() {
    this.dialog.closeAll();
   }

   onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.formRegister.value);
  }

    enviar() {

    this.isRegistering = true;

    }


}
