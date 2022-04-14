import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

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

  constructor(private accountService: AccountService, private fb: FormBuilder) {

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
      pais: [{ value: `${user.pais}`, disabled: true }, [Validators.required]],
      estado: [{ value: `${user.estado}`, disabled: true }, [Validators.required]],
      nascimento: [{ value: `${user.nascimento}`, disabled: true }, [Validators.required]],
      wzProfile: [{ value: `${user.wzProfile}`, disabled: true }, [Validators.required]],
      platform: [{ value: `${user.platform}`, disabled: true }, [Validators.required]],
    })
  }

  formUserEmpty(): User {
    return {
      idUser: null,
      nome: null,
      username: null,
      email: null,
      wzProfile: null,
      platform: null,
      nascimento: null,
      pais: null,
      estado: null,
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
        user.estado = this.userForm.value.estado;
        user.pais = this.userForm.value.pais;
        user.wzProfile = this.userForm.value.wzProfile;
        user.platform = this.userForm.value.platform;

        this.user.username = this.userForm.value.username;
        this.user.estado = this.userForm.value.estado;
        this.user.pais = this.userForm.value.pais;
        this.user.wzProfile = this.userForm.value.wzProfile;
        this.user.platform = this.userForm.value.platform;

        localStorage.setItem('user', JSON.stringify(user));

        //this.alertService.success('Usuário alterado com sucesso', '', { autoClose: true });

        this.disable = false;
        this.disableForm();

      }, error => {

        this.isLoading = false;
        //this.alertService.error('Ocorreu um erro', 'Tente novamente mais tarde');
      });
    }
  }

}


