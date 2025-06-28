import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-conteudo-central',
  imports: [NzLayoutModule, NzBreadCrumbModule, RouterOutlet],
  templateUrl: './conteudo-central.component.html',
  styleUrl: './conteudo-central.component.css'
})
export class ConteudoCentralComponent {
  constructor(private router: Router) {}

  obterUrl() {
    return this.router.url;
  }
}
