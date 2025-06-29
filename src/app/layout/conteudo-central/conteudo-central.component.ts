import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterOutlet, Router } from '@angular/router';
import { ClienteService } from '../../shared/services/cliente.service';

@Component({
  selector: 'app-conteudo-central',
  imports: [NzLayoutModule, NzBreadCrumbModule, RouterOutlet],
  templateUrl: './conteudo-central.component.html',
  styleUrl: './conteudo-central.component.css'
})
export class ConteudoCentralComponent implements OnInit {
  totalClientes: number = 0;

  constructor(
    private router: Router,
    public clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    // this.totalClientes = this.clienteService.getTotalClientes();
  }

  obterUrl() {
    return this.router.url;
  }
}
