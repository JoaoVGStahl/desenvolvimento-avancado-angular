import { HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { throwError } from "rxjs";

export abstract class BaseService {

    protected urlServiceV1: string = "https://minhaapi.azurewebsites.net/api/v1"

    protected ObterHeaderJson(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected extractData(response : any){
        return response.data || {};
    }

    protected serviceError(response : Response | any){
        let customError: string [] = [];

        if(response instanceof HttpErrorResponse){
            if(response.statusText ==="Unknowm Error"){
                customError.push("Ocorreu um Erro desconhecido");
                response.error.errors = customError;
            }
        }

        console.log(response)
        return throwError(response);
    }
}