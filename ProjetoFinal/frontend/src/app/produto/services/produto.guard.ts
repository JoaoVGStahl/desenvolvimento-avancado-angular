import { Injectable } from '@angular/core';
import { CanDeactivate, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BaseGuard } from 'src/app/services/base.guard';

import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { NovoComponent } from '../novo/novo.component';

@Injectable()
export class ProdutoGuard extends BaseGuard implements CanActivate, CanDeactivate<NovoComponent> {
    
    constructor(protected router: Router){
        super(router);
    }

    canDeactivate(component: NovoComponent) {
        if(component.mudancasNaoSalvas) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');
        }        
        return true
    }

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return super.validarClaims(routeAc)
    }
}