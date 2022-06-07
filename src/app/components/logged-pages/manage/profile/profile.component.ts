import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/components/shared/utils/Constants';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  disable: boolean = true;
  isLoading: boolean = false;
  user: User;
  userForm: FormGroup;
  profileImage: string;
  fileType: string = 'png';
  base64: string = "data:image/"+this.fileType+";base64,";


  constructor(private accountService: AccountService, private fb: FormBuilder, private alertService: AlertService) {

    this.accountService.user.subscribe(x => this.user = x);

  }


  ngOnInit(): void {

    if (this.user.idUser) {
      this.formUser(this.user);
    }
    else {
      this.formUser(this.formUserEmpty());
    }
  }

  formUser(user: User): void {
    this.userForm = this.fb.group({
      idUser: [{ value: `${user.idUser}`, disabled: true }, [Validators.required]],
      username: [{ value: `${user.username}`, disabled: true }, [Validators.required]],
    })
  }

  formUserEmpty(): User {
    return {
      idUser: null,
      name: null,
      username: null,
      email: null,
    } as User
  }

  enableForm(): void {
    this.disable = false;
    document.getElementsByTagName("select")[0].disabled = false;
    document.getElementsByTagName("select")[1].disabled = false;
    document.getElementsByTagName("input")[2].disabled = false;

  }

  disableForm() {
    this.disable = true;
    document.getElementsByTagName("select")[0].disabled = true;
    document.getElementsByTagName("select")[1].disabled = true;
    document.getElementsByTagName("input")[2].disabled = true;
  }

  editUser(): void {

    if (this.user.idUser) {

      this.isLoading = true;

      this.accountService.editUser(this.userForm.value).subscribe(() => {
        this.isLoading = false;
        let user = JSON.parse(localStorage.getItem('user'));

        user.username = this.userForm.value.username;


        this.user.username = this.userForm.value.username;


        localStorage.setItem('user', JSON.stringify(user));

        this.alertService.success('Usuário alterado com sucesso', '', { autoClose: true });

        this.disable = false;
        this.disableForm();

      }, error => {

        this.isLoading = false;
        this.alertService.error(Constants.errorTittle, Constants.errorMessage, { autoClose: true });
      });
    }
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      this.profileImage = String(reader.result);
      console.log(reader.result);
    };
  }

  savePhoto(){

    this.profileImage = this.profileImage.replace("data:image/png;base64,", "");

    console.log(this.profileImage)
  }

}


