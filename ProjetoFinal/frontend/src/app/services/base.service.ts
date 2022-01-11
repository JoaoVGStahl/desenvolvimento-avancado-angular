import { HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { LocalStorageUtils } from "../utils/localstorage";

export abstract class BaseService {

    public LocalStorage = new LocalStorageUtils();

    protected urlServiceV1: string = environment.apiUrv1

    protected ObterHeaderJson(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected ObterAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.LocalStorage.obterTokenUsuario()}`
            })
        };
    }

    protected extractData(response : any){
        return response.data || {};
    }

    protected serviceError(response : Response | any){
        let customError: string [] = [];

        if(response instanceof HttpErrorResponse){
            if(response.statusText ==="Unknown Error"){
                customError.push("Ocorreu um Erro desconhecido");
                response.error.errors = customError;
            }
        }

        console.log(response)
        return throwError(response);
    }
}