import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CadastroComponent } from "../cadastro/cadastro.component";
import { LocalStorageUtils } from "src/app/utils/localstorage";

@Injectable()
export class ContaGuard implements CanDeactivate<CadastroComponent>, CanActivate {

    localStorage = new LocalStorageUtils();
    
    constructor(private router : Router) {

    }

    canActivate(){
        if(this.localStorage.obterTokenUsuario()){
            this.router.navigate(['/home'])
        }
        return true;
    }
    canDeactivate(component: CadastroComponent) {
        if(component.mudancasNaoSalvas){
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
        }
        return true;
    }

}