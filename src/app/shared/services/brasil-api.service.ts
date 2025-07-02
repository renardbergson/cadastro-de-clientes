import { Injectable } from '@angular/core';
import { Estado } from '../models/estado.model';
import { Municipio } from '../models/municipio.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrasilApiService {
  private readonly urlBase = 'https://brasilapi.com.br/api/';

  constructor(private http: HttpClient) { }

  isEstado(data: unknown): data is Estado {
    return Array.isArray(data) &&
    data.every(item => 
      item &&
      item instanceof Object &&
      "id" in item &&
      "sigla" in item &&
      "nome" in item &&
      typeof item.id === "number" &&
      typeof item.sigla === "string" &&
      typeof item.nome === "string"
    )
  }

  isMunicipio(data: unknown): data is Municipio {
    return Array.isArray(data) &&
    data.every(item => 
      item &&
      item instanceof Object &&
      "nome" in item &&
      "codigo_ibge" in item &&
      typeof item.nome === "string" &&
      typeof item.codigo_ibge === "string"
    )
  }

  listarUFs(): Observable<Estado[]> {
    const endpoint = "ibge/uf/v1";
    return this.http.get<Estado[]>(this.urlBase + endpoint).pipe(map(data => {
      if(this.isEstado(data)) {
        return data;
      }
      throw new Error('Os dados recebidos não possuem o formato esperado');
    }))
  }

  listarMunicipios(uf: string) {
    const endpoint = `ibge/municipios/v1/${uf}`;
    return this.http.get<Municipio[]>(this.urlBase + endpoint).pipe(map(data => {
      if(this.isMunicipio(data)) {
        return data;
      }
      throw new Error('Os dados recebidos não possuem o formato esperado');
    }))
  }
}
