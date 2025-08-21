import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterOutlet, Router } from '@angular/router';
import { ClienteService } from '../../shared/services/cliente.service';
import { SpinComponent } from './components/spin/spin.component';

@Component({
  selector: 'app-conteudo-central',
  imports: [NzLayoutModule, RouterOutlet, SpinComponent],
  templateUrl: './conteudo-central.component.html',
  styleUrl: './conteudo-central.component.css',
})
export class ConteudoCentralComponent implements OnInit {
  public restaurandoClientes: boolean = false;
  totalClientes?: number;

  constructor(
    private router: Router,
    public clienteService: ClienteService,
  ) {}

  ngOnInit(): void {
    this.clienteService.restaurandoClientes$.subscribe(
      (valor) => (this.restaurandoClientes = valor),
    );

    this.clienteService.quantidadeClientesMudou$.subscribe(() => {
      this.totalClientes = this.clienteService.getTotalClientes();
    });

    /* 
      FLUXO DE FEEDBACK LOADING

      1. No cliente.service
        Existe uma propriedade pública restaurandoClientes$ do tipo BehaviorSubject<boolean>, um observable, que começa como false.
        
        O próprio serviço manipula esse valor dentro do método restaurarClientes(), emitindo true quando começa e false quando termina a restauração.
      
      2. No conteudo-central.component.ts
        Declaramos uma propriedade booleana local chamada restaurandoClientes, que também começa como false.
        
        No ngOnInit, nos inscrevemos no observable do serviço (restaurandoClientes$).
      
        Sempre que o valor do observable muda, atualizamos a propriedade local com o valor atual do observable (restaurandoClientes).
      
      3. No template de conteudo-central
        O spinner é exibido ou escondido conforme o valor da propriedade local restaurandoClientes.
    */
  }

  obterUrl() {
    return this.router.url;
  }
}
