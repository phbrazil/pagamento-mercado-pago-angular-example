import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Constants } from 'src/app/components/shared/utils/Constants';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
declare var MercadoPago: any;

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})

//https://www.mercadopago.com.br/developers/en/docs/checkout-api/payment-methods/receiving-payment-by-card#editor_7

export class NewCardComponent implements OnInit {

  user: User;

  isLoading: boolean = false;

  progress: number = 0;

  amount: number = 0;

  activeUsers: number = 0;

  emailTest: string = 'test_user_898709461234@testuser.com';

  newCardForm: FormGroup =
    this.fb.group({
      checkout__cardholderName: ['', Validators.required],
      checkout__cardNumber: ['', Validators.required],
      checkout__expirationDate: ['', Validators.required],
      checkout__securityCode: ['', Validators.required],
      checkout__issuer: ['', Validators.required],
      checkout__identificationType: ['', Validators.required],
      checkout__identificationNumber: ['', Validators.required],
      checkout__installments: ['', Validators.required],
      checkout__cardholderEmail: [this.emailTest, Validators.required],
    });

  installments: string = '';
  identificationType: string = '';
  issuer: string = '';

  constructor(private accountService: AccountService, private matDialog: MatDialog,
    private router: Router, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.accountService.user.subscribe(x => this.user = x);

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {

    this.amount = this.data.currentPlanValue;
    this.activeUsers = this.data.activeUsers;

    this.loadForm();

  }

  submit() {

    this.isLoading = true;

  }

  checkSelects() {

    this.installments = (<HTMLSelectElement>document.getElementById('form-checkout__installments')).value;
    this.identificationType = (<HTMLSelectElement>document.getElementById('form-checkout__identificationType')).value;
    this.issuer = (<HTMLSelectElement>document.getElementById('form-checkout__issuer')).value;

    this.newCardForm.patchValue({
      checkout__installments: this.installments,
      checkout__identificationType: this.identificationType,
      checkout__issuer: this.issuer,
    })


  }

  ngOnDestroy() {
    console.log('fechei')

    this.router.navigate(['/manage']);

  }


  loadForm() {

    const mp = new MercadoPago(Constants.public_key);

    const cardForm = mp.cardForm({
      amount: String(this.amount),
      autoMount: true,
      debug: true,
      form: {
        id: "form-checkout",
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular do cartão",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número do cartão",
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "Data de vencimento (MM/YYYY)",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Código de segurança",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Parcelas",
        },
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número do documento",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emissor",
        },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) return console.warn("Form Mounted handling error: ", error);
          console.log("Form mounted");
        },
        onSubmit: (event: { preventDefault: () => void; }) => {
          event.preventDefault();

          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();

          fetch(Constants.baseUrl + "/opportunity/payment/process_payment", {
            //fetch("/process_payment", {
            method: "POST",
            mode: 'cors',
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Authorization": "Bearer " + this.accountService.getToken(),
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "https://www.getopportunity.com.br"
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: "Assinatura " + Constants.system_name,
              idUser: this.user.idUser,
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
            }),
          }).then(response => response.json())
            .then(data => {

              console.log(data);

              if (data.status == 'approved') {

                //set new user locally
                this.user.trial = false;
                this.accountService.setUser(this.user);
                localStorage.setItem('user', JSON.stringify(this.user));

                console.log('reloading card')
                this.matDialog.closeAll();
                this.router.navigate(['/manage']);
              }

            });;
        },
        onFetching: (resource: any) => {
          console.log("Fetching resource: ", resource);

          // Animate progress bar
          const progressBar = document.querySelector(".progress-bar");
          // progressBar.removeAttribute("value");

          this.progress = 100;

          return () => {
            //progressBar.setAttribute("value", "0");

            this.progress = 0;

          };
        }
      },
    });

  }

}
