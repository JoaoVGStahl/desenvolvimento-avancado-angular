import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditarProdutoComponent } from "./editar-produto/editar-produto.component";
import { ProdutoAppComponent } from "./produto.app.component";
import { ProdutosDashboardComponent } from "./produtos-dashboard/produtos-dashboard.component";

const produtoRouterConfig : Routes = [
    // * agora o path vazio vai apontar para o ProdutoAppComponent e o mesmo ira realizar o roteamento atraves do <router-outlet>
    { path : '', component: ProdutoAppComponent, 
    children: [
        {path: '', component: ProdutosDashboardComponent},
        {path: 'editar/:id', component: EditarProdutoComponent}
    ]}    
];
@NgModule({
    imports: [
        RouterModule.forChild(produtoRouterConfig)
    ],
    exports: [RouterModule]    
})
export class ProdutoRoutingModule{}