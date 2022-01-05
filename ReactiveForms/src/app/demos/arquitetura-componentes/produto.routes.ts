import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditarProdutoComponent } from "./editar-produto/editar-produto.component";
import { ProdutoAppComponent } from "./produto.app.component";
import { ProdutosDashboardComponent } from "./produtos-dashboard/produtos-dashboard.component";
import { ProdutosResolve } from "./services/produto.resolve";

const produtoRouterConfig: Routes = [
    // * agora o path vazio vai apontar para o ProdutoAppComponent e o mesmo ira realizar o roteamento atraves do <router-outlet>
    {
        path: '', component: ProdutoAppComponent,
        children: [
            { path: '', redirectTo: 'todos' },
            // * Criar Resolve e passar o serviço que será utilizado para obter os dados, registrar o serviço no modulo, registrar na rota que está utilizando o resolve, dentro do component obtem os dados do snapshot
            {
                path: ':estado', 
                component: ProdutosDashboardComponent,
                resolve: { produtos: ProdutosResolve },
                data: { teste: 'informação' }
            },
            { path: ':estado/editar/:id', component: EditarProdutoComponent }
        ]
        
    }
    
];
@NgModule({
    imports: [
        RouterModule.forChild(produtoRouterConfig)
    ],
    exports: [RouterModule]
})
export class ProdutoRoutingModule { }