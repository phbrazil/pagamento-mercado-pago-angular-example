import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/components/shared/utils/Constants';
import { Settings } from 'src/app/_models/settings';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { SettingsService } from 'src/app/_services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  isChangeSettings: boolean = false;

  user: User

  isLoading: boolean = false;

  settings: Settings

  constructor(private accountService: AccountService, private settingsService: SettingsService, private alertService: AlertService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {


    this.settingsService.getIsReload().subscribe(status => {
      if (status != null && status) {
        this.getSettings();
      }
    })

    this.getSettings();

  }

  changeWeekApprovalTime() {

    this.isChangeSettings = true;

    this.settings.timeRequestApproval = !this.settings.timeRequestApproval;
  }

  changeRequestApprovalRefund() {

    this.isChangeSettings = true;

    this.settings.refundRequestApproval = !this.settings.refundRequestApproval;

  }

  changeRequestApprovalAdvance() {

    this.isChangeSettings = true;

    this.settings.advanceRequestApproval = !this.settings.advanceRequestApproval;

  }

  getSettings() {

    this.isLoading = true;

    this.settingsService.getSettings(this.user.idUser, this.accountService.getToken()).subscribe(res => {
      this.isLoading = false;
      this.settings = res;
    }, _err => {
      this.isLoading = false;
    })

  }

  changeColor(color: string) {

    this.isChangeSettings = true;

    this.settingsService.setColor(color);

    this.settings.defaultColor = color;

  }

  submit() {

    this.isLoading = true;

    this.settingsService.editSettings(this.settings, this.accountService.getToken()).subscribe(res => {
      this.isLoading = false;
      this.settingsService.setIsReload(true);
      this.isChangeSettings = false;

      //alert
      this.alertService.success('Configurações alteradas', 'Suas configurações foram alteradas com sucesso');

    }, _err => {
      this.isLoading = false;

      this.alertService.error(Constants.errorTittle, Constants.errorMessage, { autoClose: true });

    })
  }

}
