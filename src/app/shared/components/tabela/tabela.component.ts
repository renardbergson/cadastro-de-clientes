import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-tabela',
  imports: [CommonModule, NzTableModule, NzDividerModule, NzEmptyModule, NzIconModule, NzInputModule, NzButtonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent {
  listaClientes: any[] = [
    {
      id: "1",
      nome: 'Renard Bergson',
      cpf: '123.456.789-00',
      email: 'renard.contato@gmail.com',
      dataNascimento: '01/08/1992',
      cidade: 'Santa Luzia',
      estado: 'Paraíba'
    },
    {
      id: "2",
      nome: 'Maria Silva',
      cpf: '987.654.321-00',
      email: 'maria.silva@hotmail.com',
      dataNascimento: '15/03/1985',
      cidade: 'João Pessoa',
      estado: 'Paraíba'
    },
    {
      id: "3",
      nome: 'João Santos',
      cpf: '456.789.123-00',
      email: 'joao.santos@yahoo.com',
      dataNascimento: '22/11/1990',
      cidade: 'Campina Grande',
      estado: 'Paraíba'
    },
    {
      id: "4",
      nome: 'Ana Costa',
      cpf: '789.123.456-00',
      email: 'ana.costa@gmail.com',
      dataNascimento: '08/07/1988',
      cidade: 'Patos',
      estado: 'Paraíba'
    },
    {
      id: "5",
      nome: 'Pedro Oliveira',
      cpf: '321.654.987-00',
      email: 'pedro.oliveira@outlook.com',
      dataNascimento: '12/04/1995',
      cidade: 'Sousa',
      estado: 'Paraíba'
    },
    {
      id: "6",
      nome: 'Lucia Ferreira',
      cpf: '654.987.321-00',
      email: 'lucia.ferreira@gmail.com',
      dataNascimento: '30/09/1983',
      cidade: 'Cajazeiras',
      estado: 'Paraíba'
    },
    {
      id: "7",
      nome: 'Carlos Lima',
      cpf: '147.258.369-00',
      email: 'carlos.lima@hotmail.com',
      dataNascimento: '18/12/1991',
      cidade: 'Guarabira',
      estado: 'Paraíba'
    },
    {
      id: "8",
      nome: 'Fernanda Rocha',
      cpf: '258.369.147-00',
      email: 'fernanda.rocha@yahoo.com',
      dataNascimento: '25/06/1987',
      cidade: 'Pombal',
      estado: 'Paraíba'
    },
    {
      id: "9",
      nome: 'Roberto Alves',
      cpf: '369.147.258-00',
      email: 'roberto.alves@gmail.com',
      dataNascimento: '03/02/1993',
      cidade: 'Mamanguape',
      estado: 'Paraíba'
    },
    {
      id: "10",
      nome: 'Juliana Martins',
      cpf: '951.753.852-00',
      email: 'juliana.martins@outlook.com',
      dataNascimento: '14/10/1989',
      cidade: 'Itabaiana',
      estado: 'Paraíba'
    },
    {
      id: "11",
      nome: 'Marcos Pereira',
      cpf: '753.852.951-00',
      email: 'marcos.pereira@hotmail.com',
      dataNascimento: '07/05/1986',
      cidade: 'Catolé do Rocha',
      estado: 'Paraíba'
    },
    {
      id: "12",
      nome: 'Patricia Souza',
      cpf: '852.951.753-00',
      email: 'patricia.souza@gmail.com',
      dataNascimento: '19/01/1994',
      cidade: 'Monteiro',
      estado: 'Paraíba'
    },
    {
      id: "13",
      nome: 'Ricardo Mendes',
      cpf: '951.753.852-00',
      email: 'ricardo.mendes@yahoo.com',
      dataNascimento: '28/08/1984',
      cidade: 'Princesa Isabel',
      estado: 'Paraíba'
    },
    {
      id: '14',
      nome: 'Camila Barbosa',
      cpf: '753.951.852-00',
      email: 'camila.barbosa@hotmail.com',
      dataNascimento: '11/12/1996',
      cidade: 'Sapé',
      estado: 'Paraíba'
    },
    {
      id: '15',
      nome: 'Diego Nascimento',
      cpf: '951.852.753-00',
      email: 'diego.nascimento@outlook.com',
      dataNascimento: '05/03/1981',
      cidade: 'Cabedelo',
      estado: 'Paraíba'
    }
  ];

  showTotal = (total: number, range: [number, number]) => {
    return `${range[0]}-${range[1]} de ${total} clientes`;
  };
}
