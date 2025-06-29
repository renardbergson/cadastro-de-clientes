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
  
  private async setClientes() {
    const data = await firstValueFrom(this.http.get<Cliente[]>('assets/data/clientes.json'))
    localStorage.setItem('clientes', JSON.stringify(data));
    this.clientes = data;
  }

  async getClientes(): Promise<Cliente[]> {
    await this.handleDatabase();
    return this.clientes;
  }

  async salvarCliente(cliente: Cliente): Promise<boolean> {
    const clientes = await this.getClientes();
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    return true;
  }

  getTotalClientes() {
    return this.clientes.length;
  }
}