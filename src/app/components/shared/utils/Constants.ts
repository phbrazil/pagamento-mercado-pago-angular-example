export class Constants {

  public static system_name = 'Opportunity Saas';


  //BASE URL

  public static baseUrl = 'https://opportunity-back-end.herokuapp.com';
  //public static baseUrl = 'http://localhost:8080';

  public static email = 'paulo.henriqueb@me.com';
  public static password = 'mortadela1';
  public static SSOToken = 'MTAwNTU1MTE2MzI1ODIxMjE0MDg6MTYzMjYxMzA4NzYwMTphNjJiMDAxZGE2YjYyNjY2MzVhNTJjZDk0ZDJlMzYzYg';


  //messages
  public static errorTittle = 'Ocorreu um erro';
  public static errorMessage = 'Tente novamente mais tarde';

  public static timeZone = 3;
  public static hoursToStart = 3 + Constants.timeZone;

  //PRICING

  public static multiplyCorp = 10;
  public static multiplyPro = 5;

  //MERCADO PAGO
  //public static public_key = 'APP_USR-63b1d06a-b9bb-4f81-bfe1-f44465f24a63';

  //SANDBOX
  //Configure a public key de produção do seu usuário de teste comprador no frontend da sua aplicação e o access token de produção do seu usuário de teste vendedor no seu backend.
  //COMPRADOR {"id":1132580773,"nickname":"TESTY13GLUS1","password":"qatest8433","site_status":"active","email":"test_user_89870946@testuser.com"}MacBook-Pro-de-Paulo:OpportunityApi Paulo$

  public static public_key = 'APP_USR-f0f8d8e9-c959-48db-83ee-b9d5b776614a';


}
