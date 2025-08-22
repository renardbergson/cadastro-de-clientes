import { Component, Input, Output, EventEmitter } from '@angular/core';
import { formatDateToBR } from '../../../../shared/utils/date.utils';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Cliente } from '../../../../shared/models/cliente.model';

@Component({
  selector: 'app-modal',
  imports: [NzButtonModule, NzModalModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() clienteMostrar: Cliente | null = null;
  @Input() isVisible: boolean = false;
  @Output() pleaseCloseModal = new EventEmitter<void>();

  formatarData(data: string): string {
    return formatDateToBR(data);
  }

  handleOk(): void {
    this.pleaseCloseModal.emit(); // avisa ao componente pai para fechar o modal
  }
}
