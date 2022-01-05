import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { NgBrazil } from 'ng-brazil'
import { TextMask } from 'ng-brazil';
import { CustomFormsModule } from 'ng2-validation'

import { AppComponent } from './app.component';
import { SobreComponent } from './institucional/sobre/sobre.component';
import { AppRoutingModule } from './app.routes';
import { CadastroComponent } from './demos/reactiveForms/cadastro/cadastro.component';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { ProdutosDashboardComponent } from './demos/arquitetura-componentes/produtos-dashboard/produtos-dashboard.component';
import { ProdutoAppComponent } from './demos/arquitetura-componentes/produto.app.component';

@NgModule({
  declarations: [
    ProdutoAppComponent,
    AppComponent,
    SobreComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    NavegacaoModule,
    FormsModule,
    ReactiveFormsModule,
    TextMask.TextMaskModule,
    NgBrazil,
    CustomFormsModule,
    AppRoutingModule
  ],
  providers: [
    // * Url Base de navegação, porem inutiliza sub rotas => /produtos/editar/:id
    // * {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
