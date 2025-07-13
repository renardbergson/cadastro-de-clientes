import { Component, OnInit } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Cliente } from '../../../../shared/models/cliente.model';
import { ClienteService } from '../../../../shared/services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrasilApiService } from '../../../../shared/services/brasil-api.service';
import { Estado } from '../../../../shared/models/estado.model';
import { Municipio } from '../../../../shared/models/municipio.model';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { camposBase, verificarSeEmailExiste, verificarSeCpfExiste } from './validators/formulario.validacao';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { formatDateToIso, formatDateToBR } from '../../../../shared/utils/date.utils';

@Component({
  selector: 'formulario-cadastro',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NzInputModule, 
    NzIconModule, 
    NzSelectModule, 
    NzButtonModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  formCadastro!: FormGroup; // será inicializado no ngOnInit
  cliente: Cliente = Cliente.novoCliente();
  atualizandoCliente: boolean = false;
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private feedback: NzMessageService,
    private brasilApi: BrasilApiService
  ) {}

  ngOnInit() {
    this.formCadastro = this.formBuilder.group(camposBase);
    this.formCadastro.get('email')?.setAsyncValidators(
      verificarSeEmailExiste(this.cliente, this.clienteService)
    );
    this.formCadastro.get('cpf')?.setAsyncValidators(
      verificarSeCpfExiste(this.cliente, this.clienteService)
    )
    this.verificarQueryParams();
    this.listarUFs();
  }

  verificarQueryParams() {
    this.route.queryParamMap.subscribe(async params => {
      const id = params.get("id");
      if(id) {
        try {
          const clienteEditar: Cliente | undefined = await this.clienteService.buscarPorID(id)
          if(clienteEditar) {
            this.atualizandoCliente = true;
            Object.assign(this.cliente, clienteEditar);
            this.cliente.dataNascimento 
              ? formatDateToBR(this.cliente.dataNascimento)
              : null;
            this.formCadastro.patchValue(this.cliente);
            this.cliente.estado 
              ? this.listarMunicipios(this.cliente.estado) 
              : null;
          } else {
            throw new Error('Erro ao carregar dados do cliente');
          }
        } catch (error) {
          console.error('Erro ao buscar cliente:', error);
          this.feedback.error('Erro ao carregar dados do cliente');
        }
      }
    })
  }

  listarUFs(): void {
    this.brasilApi.listarUFs().subscribe({
      next: listaEstados => {this.estados = listaEstados},
      error: error => {
        console.error('Erro ao carregar UFs:', error)
        this.feedback.error('Não foi possível carregar as UFs')
      },
    })
  }

  listarMunicipios(uf: string) {
    this.brasilApi.listarMunicipios(uf).subscribe({
      next: listaMunicipios => {this.municipios = listaMunicipios},
      error: error => {
        console.error('Erro ao carregar municípios:', error)
        this.feedback.error('Não foi possível carregar os municípios')
      },
    });
  }

  limparFormulario() {
    this.formCadastro.reset();
    Object.assign(this.cliente, this.formCadastro.value);
  }

  async submit() {
    if(this.formCadastro.invalid) {
      this.formCadastro.markAllAsTouched();
      return;
    }
    Object.assign(this.cliente, {
      ...this.formCadastro.value,
      dataNascimento: formatDateToIso(this.formCadastro.value.dataNascimento)
    });
    if(this.atualizandoCliente) {
      await this.atualizar();
    } else {
      await this.salvar();
    }
  }

  async atualizar() {
    try {
      const atualizou: boolean = await this.clienteService.atualizar(this.cliente);      
      if(atualizou) {
        this.feedback.success("Cliente atualizado com sucesso!");
        this.atualizandoCliente = false;
        this.router.navigate(['/consulta']);
      } else {
        this.feedback.error("Ocorreu um erro ao atualizar o cliente!");
      }
    } catch (error) {
      console.error(error);
      this.feedback.error('Erro inesperado ao tentar atualizar cliente');
    }
  }

  async salvar() {
    try {
      const salvou: boolean = await this.clienteService.salvar(this.cliente);
      if(salvou) {
        this.feedback.success("Cliente salvo com sucesso!");
        this.limparFormulario();
        this.cliente = Cliente.novoCliente();
      } else {
        this.feedback.error("Ocorreu um erro ao salvar o cliente!");
      }
    } catch (error) {
      console.error(error);
      this.feedback.error('Erro inesperado ao tentar salvar cliente');
    }
  }
}
