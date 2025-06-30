import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {  
  private clientes: Cliente[] = [];

  constructor(private http: HttpClient) {}

  private isCliente(dados: unknown): dados is Cliente[] {
    return Array.isArray(dados) &&
    dados.every(cliente => (
      cliente &&
      typeof cliente === "object" &&
      "id" in cliente &&
      "nome" in cliente &&
      "cpf" in cliente &&
      "email" in cliente &&
      "dataNascimento" in cliente &&
      "cidade" in cliente &&
      "estado" in cliente
    ))
  }

  private async handleDatabase(): Promise<void> {
    const dados: string | null = localStorage.getItem('clientes');
    
    if(dados && this.isCliente(JSON.parse(dados))) {
      this.clientes = await JSON.parse(dados);
      return;
    } 

    await this.setClientes();
  }
  
  private async setClientes(): Promise<void> {
    const data: Cliente[] = await firstValueFrom(this.http.get<Cliente[]>('assets/data/clientes.json'))
    localStorage.setItem('clientes', JSON.stringify(data));
    this.clientes = data;
  }

  async getClientes(): Promise<Cliente[]> {
    await this.handleDatabase();
    return this.clientes;
  }

  getTotalClientes() {
    return this.clientes.length;
  }

  async buscar(id: string): Promise<Cliente | undefined> {
    const clientes: Cliente[] = await this.getClientes();
    const clienteEditar: Cliente | undefined = clientes.find(cliente => cliente.id === id);
    return clienteEditar;
  }

  async atualizar(cliente: Cliente): Promise<boolean> {
    const clientes: Cliente[] = await this.getClientes();
    for (const c of clientes) {
      if(c.id === cliente.id) {
        Object.assign(c, cliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        return true;
      }
    }
    return false;
  }

  async salvar(cliente: Cliente): Promise<boolean> {
    const clientes: Cliente[] = await this.getClientes();
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    return true;
  }

  async excluir(cliente: Cliente): Promise<Cliente[]> {
    const clientes: Cliente[] = await this.getClientes();
    const novaListaClientes: Cliente[] = clientes.filter(c => {
      return c.id !== cliente.id;
    })
    localStorage.setItem('clientes', JSON.stringify(novaListaClientes));
    return novaListaClientes;
  }
}