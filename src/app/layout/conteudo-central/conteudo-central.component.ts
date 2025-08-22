import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterOutlet, Router } from '@angular/router';
import { ClienteService } from '../../shared/services/cliente.service';
import { LoadingComponent } from './components/loading/loading.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-conteudo-central',
  imports: [NzLayoutModule, RouterOutlet, AsyncPipe, LoadingComponent],
  templateUrl: './conteudo-central.component.html',
})
export class ConteudoCentralComponent implements OnInit {
  constructor(
    private router: Router,
    public clienteService: ClienteService,
  ) {}

  ngOnInit(): void {}

  obterUrl() {
    return this.router.url;
  }
}
