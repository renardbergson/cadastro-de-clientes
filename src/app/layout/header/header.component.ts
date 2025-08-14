import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterLink, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ClienteService } from '../../shared/services/cliente.service';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-header',
  imports: [
    NzLayoutModule,
    NzMenuModule,
    RouterLink,
    RouterModule,
    NzIconModule,
    NzDividerModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private clienteService: ClienteService,
    private feedback: NzMessageService
  ) {}

  async restaure() {
    // inicia a ação do observable e exibe feedbacks
    try {
      await this.clienteService.restaurarClientes();
      this.feedback.success('Os clientes base foram restaurados!');
    } catch (error) {
      this.feedback.error('Ocorreu um erro ao restaurar os clientes!');
    }
  }
}
