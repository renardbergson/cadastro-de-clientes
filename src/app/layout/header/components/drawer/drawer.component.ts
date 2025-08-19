import { Component, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';

@Component({
  selector: 'app-drawer',
  imports: [NzButtonModule, NzDrawerModule, NzAnchorModule, RouterLink],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  @Input() isVisible: boolean = false;
  @Output() pleaseRestaureClients = new EventEmitter<void>();
  @Output() pleaseCloseDrawer = new EventEmitter<void>();

  restaureClients(): void {
    this.pleaseRestaureClients.emit();
  }

  closeDrawer(): void {
    this.pleaseCloseDrawer.emit(); // avisa ao componente pai para fechar o drawer
  }
}
