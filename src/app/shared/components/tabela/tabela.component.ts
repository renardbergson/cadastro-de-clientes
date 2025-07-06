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
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { formatDateToBR } from '../../utils/date.utils';

const FeedbackExcluir = {
  sucesso: "Cliente removido com sucesso!",
  erro: "Ocorreu um erro ao remover o cliente!"
}

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
    FormsModule,
  ],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent implements OnInit {
  listaClientes: Cliente[] = []
  clienteExcluir: Cliente | null = null;
  nomeBuscar: string = "";

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private feedback: NzMessageService
  ) {}

  async ngOnInit(): Promise<void> {
    this.listaClientes = await this.clienteService.getClientes();
    this.clienteService.clientesRestaurados$.subscribe(async () => {
      // Esta função é chamada toda vez que o observable é notificado
      this.listaClientes = await this.clienteService.getClientes();
    })
  }

  async toSearch(): Promise<void> {
    if(this.nomeBuscar) {
      const resultado = await this.clienteService.buscarPorNome(this.nomeBuscar);
      this.listaClientes = resultado;
      return;
    } else {
      this.listaClientes = await this.clienteService.getClientes();
    }
  }

  formatarData(dataISO: string) {
    return formatDateToBR(dataISO);
  }

  toEdit(id: string): void {
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } });
  }

  toDelete(cliente: Cliente): void {
    this.clienteExcluir = cliente;
    setTimeout(() => {
      this.clienteExcluir = null;
    }, 5000);
  }

  async delete() {
    if(this.clienteExcluir) {
      const novaListaClientes = await this.clienteService.excluir(this.clienteExcluir);
      this.listaClientes = novaListaClientes;
      this.feedback.success(FeedbackExcluir.sucesso);
    } else {
      this.feedback.error(FeedbackExcluir.erro);
    }
  }
}
