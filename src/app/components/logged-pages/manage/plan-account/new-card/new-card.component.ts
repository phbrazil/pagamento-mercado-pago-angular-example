import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  ready: boolean = false;

  progress: number = 0;

  amount: number = 100.5

  emailTest: string = 'test_user_89870946@testuser.com';

  formMounted: boolean = false;

  mp: any = new MercadoPago(Constants.public_key);

  cardForm: any;


  constructor(private accountService: AccountService, private matDialog: MatDialog,
    private router: Router) {

    this.accountService.user.subscribe(x => this.user = x);

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {


    this.loadForm(this.mp);



  }

  submit() {

    this.isLoading = true;

  }

  ngOnDestroy() {
    console.log('fechei')

    this.mp = null;
    this.cardForm = null;

    this.router.navigate(['/manage']);

  }


  loadForm(mp: any): any {

    this.cardForm = mp.cardForm({
      amount: String(this.amount),
      autoMount: true,
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
          this.formMounted = true;
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
          } = this.cardForm.getCardFormData();

          fetch(Constants.baseUrl + "/opportunity/payment/process_payment", {
            //fetch("/process_payment", {
            method: "POST",
            mode: 'cors',
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Authorization": "Bearer " + this.accountService.getToken(),
              "Accepts": "application/json",
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

          if (resource == 'installments') {
            this.ready = true;
          } else {
            this.ready = false;

          }

          return () => {
            //progressBar.setAttribute("value", "0");

            this.progress = 0;

          };
        }
      },
    });

  }

}
