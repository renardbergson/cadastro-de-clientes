import { Component, OnInit } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'formulario-cadastro',
  imports: [NzInputModule, NzIconModule, NzSelectModule, NzButtonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  cliente: Cliente = Cliente.novoCliente();
  atualizandoCliente: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(async params => {
      const id = params.get("id");
      if(id) {
        const clienteEditar = await this.clienteService.buscar(id)
        if(clienteEditar) {
          this.atualizandoCliente = true;
          this.cliente = clienteEditar;
        }
      };
    })
  }
  
  async submit() {
    if(this.atualizandoCliente) {
      const atualizou: boolean = await this.clienteService.atualizar(this.cliente);
      if(atualizou) {
        this.atualizandoCliente = false;
        this.router.navigate(['/consulta']);
      }
    } else {
      const salvou: boolean = await this.clienteService.salvar(this.cliente);
      if(salvou) {
        this.cliente = Cliente.novoCliente();
      };    
    }
  }
}
