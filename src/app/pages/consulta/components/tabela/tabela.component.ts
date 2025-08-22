import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Cliente } from '../../../../shared/models/cliente.model';
import { ClienteService } from '../../../../shared/services/cliente.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { formatDateToBR } from '../../../../shared/utils/date.utils';

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
})
export class TabelaComponent implements OnInit {
  @Output() clienteSelecionado = new EventEmitter<Cliente>();

  listaClientes: Cliente[] = [];
  clienteExcluir: Cliente | null = null;
  nomeBuscar: string = '';
  deleteTimer: number | null = null;
  searchTimer: number | null = null;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private feedback: NzMessageService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.listaClientes = await this.clienteService.getClientes();
    this.clienteService.clientesRestaurados$.subscribe(async () => {
      // Esta função é chamada toda vez que o observable é notificado
      this.listaClientes = await this.clienteService.getClientes();
    });
  }

  async toSearch(): Promise<void> {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    try {
      if (this.nomeBuscar.trim()) {
        this.searchTimer = setTimeout(async () => {
          const resultado = await this.clienteService.buscarPorNome(
            this.nomeBuscar,
          );
          this.listaClientes = resultado;
        }, 500);
        return;
      }

      this.listaClientes = await this.clienteService.getClientes();
    } catch (error) {
      console.error('Erro ao tentar pesquisar cliente', error);
      this.feedback.error('Erro ao tentar pesquisar cliente');
    }
  }

  formatarData(dataISO: string) {
    return formatDateToBR(dataISO);
  }

  showMore(cliente: Cliente) {
    this.clienteSelecionado.emit(cliente);
  }

  toEdit(id: string): void {
    this.router.navigate(['/cadastro'], { queryParams: { id: id } });
  }

  toDelete(cliente: Cliente): void {
    if (this.deleteTimer) clearTimeout(this.deleteTimer);

    this.clienteExcluir = cliente;
    this.deleteTimer = setTimeout(() => {
      this.clienteExcluir = null;
    }, 5000);
  }

  async delete() {
    if (this.clienteExcluir) {
      const novaListaClientes = await this.clienteService.excluir(
        this.clienteExcluir,
      );
      this.listaClientes = novaListaClientes;
      this.feedback.success('Cliente removido com sucesso!');
    } else {
      this.feedback.error('Erro ao tentar remover cliente');
    }
  }
}
