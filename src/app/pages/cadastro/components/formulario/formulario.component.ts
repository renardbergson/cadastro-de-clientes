import { Component, OnInit } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Cliente } from '../../../../shared/models/cliente.model';
import { ClienteService } from '../../../../shared/services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrasilApiService } from '../../services/brasil-api.service';
import { Estado } from '../../../../shared/models/estado.model';
import { Municipio } from '../../../../shared/models/municipio.model';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {
  camposBase,
  verificarSeEmailExiste,
  verificarSeCpfExiste,
} from './validators/formulario.validacao';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  formatDateToIso,
  formatDateToBR,
} from '../../../../shared/utils/date.utils';

@Component({
  selector: 'formulario-cadastro',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    NzButtonModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './formulario.component.html',
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
    private brasilApi: BrasilApiService,
  ) {}

  ngOnInit() {
    this.formCadastro = this.formBuilder.group(camposBase);
    this.formCadastro
      .get('email')
      ?.setAsyncValidators(
        verificarSeEmailExiste(this.cliente, this.clienteService),
      );
    this.formCadastro
      .get('cpf')
      ?.setAsyncValidators(
        verificarSeCpfExiste(this.cliente, this.clienteService),
      );
    this.verificarQueryParams();
    this.listarUFs();
  }

  verificarQueryParams() {
    this.route.queryParamMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id) {
        try {
          const clienteEditar: Cliente | undefined =
            await this.clienteService.buscarPorID(id);
          if (clienteEditar) {
            this.atualizandoCliente = true;
            Object.assign(this.cliente, clienteEditar);

            await this.listarMunicipios(this.cliente.estado!);

            this.cliente.dataNascimento = formatDateToBR(
              this.cliente.dataNascimento!,
            );
            this.formCadastro.patchValue(this.cliente);
          } else {
            throw new Error('Erro ao carregar dados do cliente');
          }
        } catch (error) {
          console.error('Erro ao buscar cliente:', error);
          this.feedback.error('Erro ao carregar dados do cliente');
        }
      }
    });
  }

  listarUFs(): void {
    this.brasilApi.listarUFs().subscribe({
      next: (listaEstados) => {
        this.estados = listaEstados;
      },
      error: (error) => {
        console.error('Erro ao tentar listar UFs:', error);
        this.feedback.error('Não foi possível listar as UFs');
      },
    });
  }

  listarMunicipios(uf: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.brasilApi.listarMunicipios(uf).subscribe({
        next: (listaMunicipios) => {
          this.municipios = listaMunicipios;
          resolve();
        },
        error: (error) => {
          console.error('Erro ao tentar listar municípios:', error);
          this.feedback.error('Não foi possível listar os municípios');
          reject(error);
        },
      });
    });
  }

  limparFormulario() {
    this.formCadastro.reset();
    Object.assign(this.cliente, this.formCadastro.value);
  }

  async submit() {
    if (this.formCadastro.invalid) {
      this.formCadastro.markAllAsTouched();
      return;
    }
    Object.assign(this.cliente, {
      ...this.formCadastro.value,
      dataNascimento: formatDateToIso(this.formCadastro.value.dataNascimento),
    });
    if (this.atualizandoCliente) {
      await this.atualizar();
    } else {
      await this.salvar();
    }
  }

  async atualizar() {
    try {
      await this.clienteService.atualizar(this.cliente);
      this.feedback.success('Cliente atualizado com sucesso!');
      this.atualizandoCliente = false;
      this.router.navigate(['/consulta']);
    } catch (error) {
      console.error(error);
      this.feedback.error('Erro ao tentar atualizar cliente');
    }
  }

  async salvar() {
    try {
      await this.clienteService.salvar(this.cliente);
      this.feedback.success('Cliente salvo com sucesso!');
      this.limparFormulario();
      this.cliente = Cliente.novoCliente();
    } catch (error) {
      console.error(error);
      this.feedback.error(
        'Ocorreu um erro ao tentar inserir o cliente: ' + error,
      );
    }
  }
}
