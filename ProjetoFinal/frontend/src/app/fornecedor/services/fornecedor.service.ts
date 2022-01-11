import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Fornecedor } from '../models/fornecedor';
import { CepConsulta, Endereco } from "../models/endereco";

@Injectable()
export class FornecedorService extends BaseService {

    fornecedor: Fornecedor = new Fornecedor();

    constructor(private http: HttpClient) {
        super()

        this.fornecedor.nome = "Teste Fake"
        this.fornecedor.documento = "32165498754"
        this.fornecedor.ativo = true
        this.fornecedor.tipoFornecedor = 1
    }

    obterTodos(): Observable<Fornecedor[]> {
        return this.http
            .get<Fornecedor[]>(`${this.urlServiceV1}/Fornecedores`, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Fornecedor> {
        
        return this.http.get<Fornecedor>(`${this.urlServiceV1}/Fornecedores/${id}`, this.ObterAuthHeaderJson())
        .pipe(catchError(super.serviceError));
    }

    novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        return this.http
            .post(`${this.urlServiceV1}/Fornecedores`, fornecedor, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        return this.http
        .put(`${this.urlServiceV1}/Fornecedores/${fornecedor.id}`, fornecedor, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError)
        );
    }

    excluirFornecedor(id: string): Observable<Fornecedor> {
        return this.http
        .delete(`${this.urlServiceV1}/Fornecedores/${id}`, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError)
        );
    }

    consultaCep(cep: string): Observable<CepConsulta> {
        return this.http
            .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
            .pipe(catchError(super.serviceError))
    }
    atualizarEndereco(endereco: Endereco): Observable<Endereco> {
        return this.http
            .put(`${this.urlServiceV1}/Fornecedores/atualizar-endereco/${endereco.id}`, endereco, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError)
            );
    }
}
