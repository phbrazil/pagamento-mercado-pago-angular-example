import { Component, Inject, LOCALE_ID, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
declare var MercadoPago: any;
import { faAngleRight, faCheck, faX } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss'],
  encapsulation: ViewEncapsulation.None


})

//https://www.mercadopago.com.br/developers/en/docs/checkout-api/payment-methods/receiving-payment-by-card#editor_7


export class NewCardComponent implements OnInit {

  isLoading: boolean = false;

  amount: number = 0;
  amountPipeString: string;

  activeUsers: number = 0;

  emailCliente: string = 'jose@gmail.com';



  //emailTest: string = 'test_user_898709461234@testuser.com';

  installments: string = '';
  identificationType: string = '';
  issuer: string = '';
  allowSave: boolean = false;
  identificationNumberFormatted: string = '';
  identificationNumber: string = '';
  newCardForm: FormGroup;

  mp: any = new MercadoPago('PUBLIC_KEY');
  cardForm: any = '';

  baseUrl: string = 'www.base.com';

  constructor(private matDialog: MatDialog,
    private router: Router, private fb: FormBuilder,

    @Inject(LOCALE_ID) private locale: string) {

  }


  ngOnInit(): void {

    this.newCardForm =
      this.fb.group({
        checkout__cardholderName: ['', Validators.required],
        checkout__cardNumber: ['', Validators.required],
        checkout__expirationDate: ['', Validators.required],
        checkout__securityCode: ['', Validators.required],
        checkout__issuer: ['', Validators.required],
        checkout__identificationType: ['', Validators.required],
        checkout__identificationNumber: [this.identificationNumber, Validators.required],
        checkout__installments: ['', Validators.required],
        checkout__cardholderEmail: ['', Validators.required],
      });

    this.loadForm();

  }

  submit() {

    this.isLoading = true;

  }


  setIdentificationNumber(document: any) {

    let value = document.target.value;

    value = value.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '');

    this.identificationNumber = value;

    if (value.length == 11) {
      this.identificationType = 'CPF';
      this.newCardForm.patchValue({
        checkout__identificationType: 'CPF',
        checkout__identificationNumber: this.identificationNumber
      })

    } else if (value > 11) {
      this.identificationType = 'CNPJ';

      this.newCardForm.patchValue({
        checkout__identificationType: 'CNPJ',
        checkout__identificationNumber: this.identificationNumber
      })

    }
  }

  allowSaveCard(event: any) {

    if (event.target.checked) {
      this.allowSave = true;
    } else {
      this.allowSave = false;
    }

  }

  unmountForm() {

    if (this.cardForm != '') {
      this.cardForm.unmount();
    }


  }

  close() {

    this.unmountForm();

    this.matDialog.closeAll();

    this.router.navigate(['/home'])


  }

  clearForm() {
    this.newCardForm.reset();
  }

  loadForm() {

    this.cardForm = this.mp.cardForm({
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
          placeholder: "MM/YYYY",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "000",
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

          console.log(event);
          console.log(this.cardForm.getCardFormData());


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

          const identificationNumberFormat = identificationNumber.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '');

          console.log(identificationNumberFormat);


          fetch(this.baseUrl + "/payment", {
            method: "POST",
            mode: 'cors',
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Authorization": "Bearer " + 'TOKEN BACKEND',
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: "Nome Pagamento",
              preapproval_plan_id: 'CODIGO DO PLANO CASO EXISTA',
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumberFormat,
                },
              },
            }),
          }).then(response => response.json())
            .then(data => {

              if (data.status == 'authorized') {

                //set new user locally

                this.close();
                this.router.navigate(['/pagamento_efetuado']);

              } else if (data.status == 'pending') {
                this.isLoading = false;
                this.unmountForm();
                this.clearForm();

              } else {
                this.isLoading = false;
                this.unmountForm();
                this.clearForm();

              }

            }).catch(error => {

              console.log(error)

              this.isLoading = false;
              this.unmountForm();
              this.clearForm();

            });
        },
        onFetching: (resource: any) => {
          console.log("Fetching resource: ", resource);
          // Animate progress bar
          const progressBar = document.querySelector(".progress-bar");

          return () => {

          };
        }
      },
    });

  }

}
