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
    [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
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
