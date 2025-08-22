import { Component } from '@angular/core';
import { Cliente } from '../../shared/models/cliente.model';
import { TabelaComponent } from './components/tabela/tabela.component';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-consulta',
  imports: [TabelaComponent, ModalComponent],
  templateUrl: './consulta.component.html',
})
export class ConsultaComponent {
  clienteSelecionado: Cliente | null = null;
  modalVisivel = false;

  abrirModal(cliente: Cliente): void {
    this.clienteSelecionado = cliente;
    this.modalVisivel = true;
  }

  fecharModal(): void {
    this.modalVisivel = false;
  }
}
