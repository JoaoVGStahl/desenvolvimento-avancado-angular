import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LocalStorageUtils } from '../utils/localstorage'

@Injectable()
export class ErroInterceptor implements HttpInterceptor {

    localStorageUtil = new LocalStorageUtils();

    constructor(private router: Router) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        this.localStorageUtil.limparDadosLocaisUsuario();
                        this.router.navigate(['/conta/login'], {queryParams: {returnUrl: this.router.url}});
                    }
                    if (error.status === 403) {
                        this.router.navigate(['/acesso-negado']);
                    }
                }
                // * produtos/editar/1 => editar:id
                // * router.params['id']

                // * Parametros não declarados
                // * produtos/editar?id=1 
                // * {queryParams: {id: 1}}
                
                return throwError(error);
            })
            );
    }

}