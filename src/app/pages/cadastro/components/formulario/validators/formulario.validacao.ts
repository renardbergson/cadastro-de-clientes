import { Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Cliente } from '../../../../../shared/models/cliente.model';
import { ClienteService } from '../../../../../shared/services/cliente.service';

export const camposBase = {
  nome: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]],
  cpf: [
    '',
    [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
  ],
  dataNascimento: [
    '',
    [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
      validarDataNascimento,
    ],
  ],
  estado: ['', [Validators.required]],
  municipio: ['', [Validators.required]],
};

export function verificarSeEmailExiste(
  cliente: Cliente,
  service: ClienteService,
): AsyncValidatorFn {
  return async (control: AbstractControl) => {
    if (control.value === cliente.email) {
      return null;
    } else {
      const existe = await service.buscarPorEmail(control.value);
      return existe ? { emailJaExiste: true } : null;
    }
  };
}

export function verificarSeCpfExiste(
  cliente: Cliente,
  service: ClienteService,
): AsyncValidatorFn {
  return async (control: AbstractControl) => {
    if (control.value === cliente.cpf) {
      return null;
    } else {
      const existe = await service.buscarPorCpf(control.value);
      return existe ? { cpfJaExiste: true } : null;
    }
  };
}

export function validarDataNascimento(control: AbstractControl) {
  const data = control.value;

  // Verificar se o valor existe
  if (!data) {
    return { dataNascimentoInvalida: true };
  }

  // Extrair dia, mes e ano e converter para número
  const dia = Number(data.slice(0, 2)); // "01" => 1
  const mes = Number(data.slice(2, 4)); // "08" => 8
  const ano = Number(data.slice(4, 8)); // "1992" => 1992

  // Verificar se há zeros (principal problema)
  if (dia === 0 || mes === 0 || ano === 0) {
    return { dataNascimentoInvalida: true };
  }

  // Verificar se a data é válida
  const dataObj = new Date(ano, mes - 1, dia);
  if (
    dataObj.getDate() !== dia ||
    dataObj.getMonth() !== mes - 1 ||
    dataObj.getFullYear() !== ano
  ) {
    return { dataNascimentoInvalida: true };
  }

  // Data válida
  return null;
}
