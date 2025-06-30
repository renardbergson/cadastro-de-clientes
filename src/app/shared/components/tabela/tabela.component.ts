import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-tabela',
  imports: [
    CommonModule, 
    NzTableModule, 
    NzDividerModule, 
    NzEmptyModule, 
    NzIconModule, 
    NzInputModule, 
    NzButtonModule,
  ],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent implements OnInit {
  listaClientes: Cliente[] = []
  clienteExcluir: Cliente | null = null;

  constructor(private clienteService: ClienteService) {}

  async ngOnInit(): Promise<void> {
    this.listaClientes = await this.clienteService.getClientes();
  }

  toDelete(cliente: Cliente): void {
    this.clienteExcluir = cliente;
    setTimeout(() => {
      this.clienteExcluir = null;
    }, 5000);
  }

  async delete() {
    if(this.clienteExcluir) {
      const novaListaClientes = await this.clienteService.delete(this.clienteExcluir);
      this.listaClientes = novaListaClientes;
    }
  }
}
