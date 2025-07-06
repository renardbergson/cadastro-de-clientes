import { Component, OnInit } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrasilApiService } from '../../services/brasil-api.service';
import { Estado } from '../../models/estado.model';
import { Municipio } from '../../models/municipio.model';
import { 
  ReactiveFormsModule, 
  FormBuilder, 
  FormGroup, Validators, 
  AbstractControl, 
  ValidationErrors 
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MetodosValidacao } from '../../models/metodosValidacao.model';
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { formatDateToIso, formatDateToBR } from '../../utils/date.utils';

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
  private debounceTimer?: number;
  private readonly debounceDelay: number = 2000;

  validacoes = {
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email], [this.verificarSeEmailExiste.bind(this)]],
    cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)], [this.verificarSeCpfExiste.bind(this)]],
    dataNascimento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    estado: ['', [Validators.required]],
    municipio: ['', [Validators.required]],
  }

  feedbackAtualizar = {
    sucesso: "Cliente atualizado com sucesso!",
    erro: "Ocorreu um erro ao atualizar o cliente!",
  }

  feedbackSalvar = {
    sucesso: "Cliente salvo com sucesso!",
    erro:"Ocorreu um erro ao salvar o cliente!",
  }

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private feedback: NzMessageService,
    private brasilApi: BrasilApiService
  ) {}

  ngOnInit() {
    this.formCadastro = this.formBuilder.group(this.validacoes);
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
    this.cliente = Cliente.novoCliente();
    this.formCadastro.reset();
  }

  async validarCampo(campo: string, metodo: MetodosValidacao, control: AbstractControl): Promise<ValidationErrors | null> {
    if(this.debounceTimer) clearTimeout(this.debounceTimer);
    return new Promise(resolve => {
      this.debounceTimer = setTimeout(async () => {
        try {
          const resultado = await this.clienteService[metodo](control.value);
          if(resultado) {
            this.formCadastro.get(campo)?.markAsTouched();
            resolve({ [`${campo}JaExiste`]: true });
          } else {
            resolve(null);
          }
        } catch (error) {
          console.log(`Erro ao validar ${campo}:`, error);
          resolve(null)
        }
      }, this.debounceDelay);
    })
  }

  async verificarSeEmailExiste(control: AbstractControl): Promise<ValidationErrors | null> {
    if(this.formCadastro.get('email')?.value === this.cliente.email) {
      return null;
    } else {
      return this.validarCampo('email', 'buscarPorEmail', control);
    }
  }

  async verificarSeCpfExiste(control: AbstractControl): Promise<ValidationErrors | null> {
    if(this.formCadastro.get('cpf')?.value === this.cliente.cpf) {
      return null;
    } else {
      return this.validarCampo('cpf', 'buscarPorCpf', control);
    }
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
      const atualizou: boolean = await this.clienteService.atualizar(this.cliente);
      if(atualizou) {
        this.feedback.success(this.feedbackAtualizar.sucesso);
        this.atualizandoCliente = false;
        this.router.navigate(['/consulta']);
      } else {
        this.feedback.error(this.feedbackAtualizar.erro);
      }
    } else {
      const salvou: boolean = await this.clienteService.salvar(this.cliente);
      if(salvou) {
        this.feedback.success(this.feedbackSalvar.sucesso);
        this.limparFormulario();
      } else {
        this.feedback.error(this.feedbackSalvar.erro);
      }
    }
  }
}
