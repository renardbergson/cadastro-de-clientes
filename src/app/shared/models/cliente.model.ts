import { v7 as uuid } from 'uuid';

export class Cliente {
  id?: string;
  nome?: string;
  cpf?: string;
  email?: string;
  dataNascimento?: string;
  estado?: string;
  municipio?: string;

  static novoCliente() {
    const cliente = new Cliente();
    cliente.id = uuid();
    return cliente;
  }
}