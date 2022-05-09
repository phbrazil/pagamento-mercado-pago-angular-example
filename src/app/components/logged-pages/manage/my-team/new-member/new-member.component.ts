import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Plan } from 'src/app/_models/plan';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PlanService } from 'src/app/_services/plan.service';

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})
export class NewMemberComponent implements OnInit {

  faPencil = faPencil;

  newMemberForm: FormGroup;

  active: boolean = true;

  isLoading: boolean = false;

  message: string = '';
  messageType: string = ''

  user: User;
  plan: Plan;

  constructor(private dialog: MatDialog, private fb: FormBuilder,
    private accountService: AccountService,
    private planService: PlanService) {

    this.accountService.user.subscribe(x => this.user = x);

    this.planService.plan.subscribe(x => this.plan = x);
  }

  ngOnInit(): void {

    this.newMemberForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      active: [this.active, Validators.required],
      idGroup: [this.user.idGroup, Validators.required],
      trialDate: [this.user.trialDate, Validators.required],
      trial: [this.user.trial, Validators.required]
    });
  }

  close() {
    this.dialog.closeAll();
  }

  submit() {
    this.isLoading = true;

    this.accountService.createMemberAccount(this.newMemberForm.value, this.accountService.getToken(), this.user.idUser).subscribe(res => {

      this.isLoading = false;

      if (res.message.code == 409) {

        this.message = 'Esse email já foi adicionado como membro do time';
        this.messageType = 'danger';

      } else {

        //SAVE PLAN
        let newPlan = {
          idUser: res.idUser,
          plan: 'Pro',
          enableTime: this.plan.enableTime,
          enableRefund: this.plan.enableRefund,
          enableAdvance: this.plan.enableAdvance
        };

        this.planService.newPlan(newPlan, this.accountService.getToken()).subscribe(_res => {

          this.message = '';
          this.messageType = '';
          this.accountService.setIsReloadMembers(true);

          this.close();

        }, _err => {

        })



      }



    }, _err => {
      this.isLoading = false;
    })


  }

  changeStatus() {
    this.active = !this.active;

    this.newMemberForm.patchValue({ active: this.active });

  }

}
