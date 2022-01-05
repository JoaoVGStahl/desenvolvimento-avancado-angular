import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { SobreComponent } from './institucional/sobre/sobre.component';
import { CadastroComponent } from './demos/reactiveForms/cadastro/cadastro.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';

const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'sobre', component: SobreComponent },
    { path: 'cadastro', component: CadastroComponent },
    {path: 'produtos', loadChildren: () => import('./demos/arquitetura-componentes/produtos.module').then(m => m.ProdutoModule)},


    // ! Esta rota deverá sem sempre a ultima! pois caso o module não encontre a rota irá redirecionar para o 404
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports :[
        RouterModule.forRoot(rootRouterConfig)
    ],
    exports :[
        RouterModule
    ]
})

export class AppRoutingModule{}