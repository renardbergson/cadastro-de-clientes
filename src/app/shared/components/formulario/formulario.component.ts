import { Component, OnInit } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrasilApiService } from '../../services/brasil-api.service';
import { Estado } from '../../models/estado.model';
import { Municipio } from '../../models/municipio.model';

const FeedbackAtualizar = {
  sucesso: "Cliente atualizado com sucesso!",
  erro: "Ocorreu um erro ao atualizar o cliente!",
  duracao: {nzDuration: 5000},
}

 const FeedbackSalvar = {
  sucesso: "Cliente salvo com sucesso!",
  erro:"Ocorreu um erro ao salvar o cliente!",
  duracao: {nzDuration: 5000},
}

@Component({
  selector: 'formulario-cadastro',
  imports: [
    NzInputModule, 
    NzIconModule, 
    NzSelectModule, 
    NzButtonModule, 
    FormsModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  cliente: Cliente = Cliente.novoCliente();
  atualizandoCliente: boolean = false;
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private feedback: NzMessageService,
    private brasilApi: BrasilApiService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(async params => {
      const id = params.get("id");
      if(id) {
        const clienteEditar = await this.clienteService.buscarPorID(id)
        if(clienteEditar) {
          this.atualizandoCliente = true;
          this.cliente = clienteEditar;
          if(this.cliente.estado) this.listarMunicipios(this.cliente.estado);
        }
      };
    })

    this.listarUFs();
  }

  async submit() {
    if(this.atualizandoCliente) {
      const atualizou: boolean = await this.clienteService.atualizar(this.cliente);
      if(atualizou) {
        this.feedback.success(FeedbackAtualizar.sucesso, FeedbackAtualizar.duracao);
        this.atualizandoCliente = false;
        this.router.navigate(['/consulta']);
      } else {
        this.feedback.error(FeedbackAtualizar.erro, FeedbackAtualizar.duracao);
      }
    } else {
      const salvou: boolean = await this.clienteService.salvar(this.cliente);
      if(salvou) {
        this.feedback.success(FeedbackSalvar.sucesso, FeedbackSalvar.duracao);
        this.cliente = Cliente.novoCliente();
      } else {
        this.feedback.error(FeedbackSalvar.erro, FeedbackSalvar.duracao);
      }
    }
  }

  listarUFs(): void {
    this.brasilApi.listarUFs().subscribe({
      next: listaEstados => {this.estados = listaEstados},
      error: error => console.error(error),
    })
  }

  listarMunicipios(uf: string) {
    this.brasilApi.listarMunicipios(uf).subscribe({
      next: listaMunicipios => {this.municipios = listaMunicipios},
      error: error => console.error(error),
    });
  }
}
