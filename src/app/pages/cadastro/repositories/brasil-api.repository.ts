import { Injectable } from '@angular/core';
import { Estado } from '../../../shared/models/estado.model';
import { Municipio } from '../../../shared/models/municipio.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

type sourceType = "uf" | "municipio";

@Injectable({
  providedIn: 'root'
})
export class BrasilApiRepository {
  private readonly urlBase = 'https://brasilapi.com.br/api/';

  constructor(private http: HttpClient) { }


  listarUFs(): Observable<Estado[]> {
    const endpoint = "ibge/uf/v1";
    return this.http.get<Estado[]>(this.urlBase + endpoint).pipe(map(data => {
      if(data) {
        return data;
      } else {
        throw new Error("Erro ao tentar acessar API externa!");
      }
    }))
  }

  listarMunicipios(uf: string): Observable<Municipio[]> {
    const endpoint = `ibge/municipios/v1/${uf}`;
    return this.http.get<Municipio[]>(this.urlBase + endpoint).pipe(map(data => {
      if(data) {
        return data;
      } else {
        throw new Error("Erro ao tentar acessar API externa!");
      }
    }))
  }
}
