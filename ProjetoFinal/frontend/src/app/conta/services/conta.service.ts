import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../models/usuario";
import { catchError, map } from 'rxjs/operators';
import { BaseService } from "src/app/services/base.service";

@Injectable()
export class ContaService extends BaseService {
    // * Login
    /* {
        "email": "teste@Angular.com",
        "password": "@Teste123",
        "confirmPassword": "@Teste123"
    } */
    constructor(private http: HttpClient) {
        super();
    }

    cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
        let response = this.http.post(`${this.urlServiceV1}/Resgiter`, usuario, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
        return response;
    }

    login(usuario: Usuario) : Observable<Usuario>{
        let response = this.http
            .post(`${this.urlServiceV1}/Login`, usuario, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
                
            );
        return response;
    }
}