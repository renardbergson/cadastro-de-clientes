import { Component, Input } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-conteudo-central',
  imports: [NzLayoutModule, NzBreadCrumbModule, RouterOutlet],
  templateUrl: './conteudo-central.component.html',
  styleUrl: './conteudo-central.component.css'
})
export class ConteudoCentralComponent {
  
}
