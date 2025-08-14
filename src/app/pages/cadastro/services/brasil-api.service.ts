import { Injectable } from '@angular/core';
import { BrasilApiRepository } from '../repositories/brasil-api.repository';

@Injectable({
  providedIn: 'root',
})
export class BrasilApiService {
  constructor(private repository: BrasilApiRepository) {}

  listarUFs() {
    return this.repository.listarUFs();
  }

  listarMunicipios(uf: string) {
    return this.repository.listarMunicipios(uf);
  }
}
