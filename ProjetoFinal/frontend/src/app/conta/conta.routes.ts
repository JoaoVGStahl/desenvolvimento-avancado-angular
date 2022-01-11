import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { ContaAppComponent } from "./conta.app.component";
import { LoginComponent } from "./login/login.component";
import { ContaGuard } from "./services/conta.guard";

const contaRouteConfig: Routes = [
    {
        path: '', component: ContaAppComponent,
        children: [
            { path: 'cadastro', component: CadastroComponent, canDeactivate: [ContaGuard], canActivate: [ContaGuard] },
            { path: 'login', component: LoginComponent, canActivate: [ContaGuard] }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(contaRouteConfig)
    ],
    exports: [RouterModule]
})

export class ContaRoutingModule { }