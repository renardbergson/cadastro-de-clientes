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
  doc,
} from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ClienteRepository {
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
        await deleteDoc(document.ref);
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
    try {
      const clientesRef = collection(this.firestore, 'clientes');
      const firebaseClientes = await firstValueFrom(
        collectionData(clientesRef, { idField: 'id' }),
      );
      return firebaseClientes as Cliente[];
    } catch (error) {
      console.error(
        'Erro ao tentar obter os clientes do banco de dados!',
        error,
      );
      throw new Error('Erro ao tentar obter os clientes do banco de dados!');
    }
  }

  async buscarPorID(id: string): Promise<Cliente | undefined> {
    const clientes: Cliente[] = await this.getClientes();
    const clienteEditar: Cliente | undefined = clientes.find(
      (cliente) => cliente.id === id,
    );
    return clienteEditar;
  }

  async buscarPorNome(nome: string): Promise<Cliente[] | []> {
    try {
      const clientes: Cliente[] = await this.getClientes();
      const resultado: Cliente[] | [] = clientes.filter((c) =>
        c.nome?.toLocaleLowerCase().includes(nome.toLocaleLowerCase()),
      );
      return resultado;
    } catch (error) {
      console.error('Erro ao tentar pesquisar cliente', error);
      throw new Error('Erro ao tentar pesquisar cliente');
    }
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
      if (!cliente.id) {
        throw new Error('ID do cliente ausente');
      }

      const clienteDocRef = doc(this.firestore, 'clientes', cliente.id);
      const { id, ...clienteSemId } = cliente; // rest operator
      await updateDoc(clienteDocRef, clienteSemId);
    } catch (error) {
      console.error('Erro ao tentar atualizar cliente:', error);
      throw new Error('Erro ao tentar atualizar cliente');
    }
  }

  async salvar(cliente: Cliente): Promise<Cliente[]> {
    try {
      const clientesRef = collection(this.firestore, 'clientes');
      await addDoc(clientesRef, { ...cliente });
      /* 
        Instâncias de classe (como Cliente) podem conter métodos, propriedades privadas, protótipos e outros metadados que o Firestore não consegue serializar corretamente.
        
        O Firestore espera receber um objeto puro (apenas dados, sem métodos ou protótipos).
        
        O spread operator cria um novo objeto contendo apenas as propriedades enumeráveis do cliente, descartando métodos e protótipos.
      */
      return await this.getClientes();
    } catch (error) {
      console.error('Erro ao tentar inserir cliente', error);
      throw new Error('Erro ao tentar inserir cliente');
    }
  }

  async excluir(cliente: Cliente): Promise<Cliente[]> {
    try {
      const clientesDocRef = doc(this.firestore, 'clientes', cliente.id!);
      await deleteDoc(clientesDocRef);

      return await this.getClientes();
    } catch (error) {
      console.error('Erro ao tentar excluir cliente', error);
      throw new Error('Erro ao tentar excluir cliente');
    }
  }
}
