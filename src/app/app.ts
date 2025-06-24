import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ConteudoCentralComponent } from './components/conteudo-central/conteudo-central.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink, 
    RouterModule,
    NzLayoutModule, 
    NzIconModule, 
    NzMenuModule,
    ConteudoCentralComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'cadastro-de-clientes';
}
