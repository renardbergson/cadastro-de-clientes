import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.model';
import { firstValueFrom } from 'rxjs';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  getDocs,
  deleteDoc,
} from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ClienteRepository {
  private clientes: Cliente[] = [];

  constructor(
    private http: HttpClient,
    private firestore: Firestore,
  ) {}

  async restaurarClientes(): Promise<void> {
    try {
      // 0. Referencia a coleção no firebase
      const clientesCollection = collection(this.firestore, 'clientes');

      // 1. Busca todos os documentos da coleção
      const allDocuments = await getDocs(clientesCollection);

      // 2. Exclui cada documento da coleção
      for (const document of allDocuments.docs) {
        await deleteDoc(doc(this.firestore, 'clientes', document.id));
      }

      // 3. Carrega os dados de clientes.json (local)
      const clientes: Cliente[] = await firstValueFrom(
        this.http.get<Cliente[]>('assets/data/clientes.json'),
      );

      // 4. Popula a coleção com os dados de clientes.json
      for (const cliente of clientes) {
        await addDoc(clientesCollection, cliente);
      }
    } catch (error) {
      console.error('Erro ao tentar restaurar clientes:', error);
      throw new Error('Erro ao tentar restaurar clientes');
    }
  }

  async getClientes(): Promise<Cliente[]> {
    const clientesRef = collection(this.firestore, 'clientes');
    const firebaseClientes = await firstValueFrom(
      collectionData(clientesRef, { idField: 'id' }),
    );
    this.clientes = firebaseClientes;
    return this.clientes;
  }

  async buscarPorID(id: string): Promise<Cliente | undefined> {
    const clientes: Cliente[] = await this.getClientes();
    const clienteEditar: Cliente | undefined = clientes.find(
      (cliente) => cliente.id === id,
    );
    return clienteEditar;
  }

  async buscarPorNome(nome: string): Promise<Cliente[] | []> {
    const clientes: Cliente[] = await this.getClientes();
    const resultado: Cliente[] | [] = clientes.filter((c) =>
      c.nome?.toLocaleLowerCase().includes(nome.toLocaleLowerCase()),
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
}
