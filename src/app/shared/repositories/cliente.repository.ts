import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteRepository {
  private clientes: Cliente[] = [];

  constructor(private http: HttpClient) {}

  private async handleDatabase(): Promise<void> {
    const dados: string | null = localStorage.getItem('clientes');

    if (dados) {
      this.clientes = await JSON.parse(dados);
      return;
    }

    await this.setClientes();
  }

  private async setClientes(): Promise<void> {
    const data: Cliente[] = await firstValueFrom(
      this.http.get<Cliente[]>('assets/data/clientes.json')
    );
    localStorage.setItem('clientes', JSON.stringify(data));
    this.clientes = data;
  }

  async getClientes(): Promise<Cliente[]> {
    await this.handleDatabase();
    return this.clientes;
  }

  async buscarPorID(id: string): Promise<Cliente | undefined> {
    const clientes: Cliente[] = await this.getClientes();
    const clienteEditar: Cliente | undefined = clientes.find(
      (cliente) => cliente.id === id
    );
    return clienteEditar;
  }

  async buscarPorNome(nome: string): Promise<Cliente[] | []> {
    const clientes: Cliente[] = await this.getClientes();
    const resultado: Cliente[] | [] = clientes.filter((c) =>
      c.nome?.toLocaleLowerCase().includes(nome.toLocaleLowerCase())
    );
    return resultado;
  }

  async buscarPorEmail(email: string): Promise<Cliente | undefined> {
    const clientes: Cliente[] = await this.getClientes();
    return clientes.find((c) => c.email === email);
  }

  async buscarPorCpf(cpf: string): Promise<Cliente | undefined> {
    const clientes: Cliente[] = await this.getClientes();
    return clientes.find((c) => c.cpf === cpf);
  }

  async atualizar(cliente: Cliente): Promise<void> {
    try {
      const clientes: Cliente[] = await this.getClientes();
      for (const c of clientes) {
        if (c.id === cliente.id) {
          Object.assign(c, cliente);
          localStorage.setItem('clientes', JSON.stringify(clientes));
        }
      }
    } catch (error) {
      console.error('Erro ao tentar atualizar cliente:', error);
    }
  }

  async salvar(cliente: Cliente): Promise<Cliente[]> {
    try {
      const clientes: Cliente[] = await this.getClientes();
      clientes.push(cliente);
      localStorage.setItem('clientes', JSON.stringify(clientes));
      this.clientes = clientes;
      return this.clientes;
    } catch (error) {
      throw new Error('Erro ao tentar salvar cliente');
    }
  }

  async excluir(cliente: Cliente): Promise<Cliente[]> {
    const clientes: Cliente[] = await this.getClientes();
    const novaListaClientes: Cliente[] = clientes.filter((c) => {
      return c.id !== cliente.id;
    });
    localStorage.setItem('clientes', JSON.stringify(novaListaClientes));
    this.clientes = novaListaClientes;
    return novaListaClientes;
  }

  async restaurarClientes(): Promise<void> {
    localStorage.removeItem('clientes');
    await this.setClientes();
    // Notifica todos os componentes que estão inscritos no observable
  }
}
