import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Subject } from 'rxjs';
import { ClienteRepository } from '../repositories/cliente.repository';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private clientes: Cliente[] = [];

  constructor(private repository: ClienteRepository) {}

  public inserindoCliente$ = new BehaviorSubject<boolean>(false);
  public restaurandoClientes$ = new BehaviorSubject<boolean>(false);
  clientesRestaurados$ = new Subject<void>();
  quantidadeClientesMudou$ = new Subject<void>();

  async getClientes(): Promise<Cliente[]> {
    this.clientes = await this.repository.getClientes();
    this.quantidadeClientesMudou$.next();
    return this.clientes;
  }

  async buscarPorID(id: string): Promise<Cliente | undefined> {
    return this.repository.buscarPorID(id);
  }

  async buscarPorNome(nome: string): Promise<Cliente[] | []> {
    return this.repository.buscarPorNome(nome);
  }

  async buscarPorEmail(email: string): Promise<Cliente | undefined> {
    return this.repository.buscarPorEmail(email);
  }

  async buscarPorCpf(cpf: string): Promise<Cliente | undefined> {
    return this.repository.buscarPorCpf(cpf);
  }

  async atualizar(cliente: Cliente): Promise<void> {
    return this.repository.atualizar(cliente);
  }

  async salvar(cliente: Cliente) {
    this.inserindoCliente$.next(true);
    this.clientes = await this.repository.salvar(cliente);
    this.quantidadeClientesMudou$.next();
    this.inserindoCliente$.next(false);
  }

  async excluir(cliente: Cliente): Promise<Cliente[]> {
    const novaListaClientes = await this.repository.excluir(cliente);
    this.clientes = novaListaClientes;
    this.quantidadeClientesMudou$.next();
    return novaListaClientes;
  }

  async restaurarClientes() {
    this.restaurandoClientes$.next(true);
    await this.repository.restaurarClientes();
    await this.getClientes();
    this.clientesRestaurados$.next();
    this.restaurandoClientes$.next(false);
  }

  getTotalClientes() {
    return this.clientes.length;
  }
}
