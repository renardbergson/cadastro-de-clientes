import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterLink, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ClienteService } from '../../shared/services/cliente.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DrawerComponent } from './components/drawer/drawer.component';

@Component({
  selector: 'app-header',
  imports: [
    NzLayoutModule,
    NzMenuModule,
    RouterLink,
    RouterModule,
    NzIconModule,
    NzIconModule,
    NzButtonModule,
    DrawerComponent,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isDrawerVisible: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private feedback: NzMessageService,
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

  openDrawer() {
    this.isDrawerVisible = true;
  }

  closeDrawer() {
    this.isDrawerVisible = false;
  }
}
