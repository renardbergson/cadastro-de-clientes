import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HeaderComponent } from './layout/header/header.component';
import { ConteudoCentralComponent } from './layout/conteudo-central/conteudo-central.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    HeaderComponent,
    ConteudoCentralComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'cadastro-de-clientes';
}
