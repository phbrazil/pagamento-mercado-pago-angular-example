import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableSortService {

  constructor() { }

  getSettings() {
    return {
      "lengthMenu": [5, 10, 25, 50, 75, 100],
      "pagingType": "full_numbers",
      "language": {
        "paginate": {
          "previous": " Anterior ",
          "next": " Próxima ",
          "first": " Primeira ",
          "last": "Última"
        },
        "search": "Pesquisar ",
        "searchPlaceholder": "Digite a descrição",
        "info": "Exibindo do _START_ ao _END_ de _TOTAL_ registros",
        "infoEmpty": "Mostrando 0 até 0 de 0 registros",
        "zeroRecords": "Nenhum registro encontrado",
        "lengthMenu": "Exibindo _MENU_ registros",
        "infoFiltered": "(filtrando de _MAX_ registros no total)"
      }
    } as DataTables.Settings
  }
}
