import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CadastroComponent } from "../demos/reactiveForms/cadastro/cadastro.component";

@Injectable()
export class CadastroGuard implements CanDeactivate<CadastroComponent>{
    canDeactivate(component : CadastroComponent){
        if(!component.mudancasSalvas){
            return window.confirm('Tem certeza que deseja cancelar o envio do formulário de cadastro?');
        } 
        return true;
        
    }

   
}