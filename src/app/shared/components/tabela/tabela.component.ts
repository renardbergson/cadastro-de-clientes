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

const FeedbackExcluir = {
  sucesso: "Cliente removido com sucesso!",
  erro: "Ocorreu um erro ao remover o cliente!",
  duracao: {nzDuration: 5000},
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
  ],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent implements OnInit {
  listaClientes: Cliente[] = []
  clienteExcluir: Cliente | null = null;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private feedback: NzMessageService
  ) {}

  async ngOnInit(): Promise<void> {
    this.listaClientes = await this.clienteService.getClientes();
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
      this.feedback.success(FeedbackExcluir.sucesso, FeedbackExcluir.duracao);
    } else {
      this.feedback.error(FeedbackExcluir.erro, FeedbackExcluir.duracao);
    }
  }
}
