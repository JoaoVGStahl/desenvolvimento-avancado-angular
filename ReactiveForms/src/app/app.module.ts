import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { registerLocaleData } from "@angular/common";
import localePT from '@angular/common/locales/pt';
registerLocaleData(localePT);

import { NgBrazil } from 'ng-brazil'
import { TextMask } from 'ng-brazil';
import { CustomFormsModule } from 'ng2-validation'

import { AppComponent } from './app.component';
import { SobreComponent } from './institucional/sobre/sobre.component';
import { AppRoutingModule } from './app.routes';
import { CadastroComponent } from './demos/reactiveForms/cadastro/cadastro.component';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { ProdutoAppComponent } from './demos/arquitetura-componentes/produto.app.component';
import { AuthGuard } from './services/app.guard';
import { CadastroGuard } from './services/cadastro.guard';
import { FilmesComponent } from './demos/pipes/filmes/filmes.component';
import { FileSizePipe } from './demos/pipes/filmes/filesize.pipe';
import { ImageFormaterPipe } from './demos/pipes/filmes/image.pipe';
import { BarModule } from './demos/bar-di-zones/bar.module';
import { BarServices } from './demos/bar-di-zones/bar.service';

// * Const com todos os providers de um module, melhorando a organização
export const BAR_PROVIDERS: Provider[] = [
  BarServices
];

@NgModule({
  declarations: [
    ProdutoAppComponent,
    AppComponent,
    SobreComponent,
    CadastroComponent,
    FilmesComponent,
    FileSizePipe,
    ImageFormaterPipe,
    
  ],
  imports: [
    BrowserModule,
    NavegacaoModule,
    FormsModule,
    ReactiveFormsModule,
    TextMask.TextMaskModule,
    NgBrazil,
    CustomFormsModule,
    AppRoutingModule,
    BarModule
  ],
  providers: [
    AuthGuard,
    CadastroGuard,
    // * BAR_PROVIDERS
    // * Url Base de navegação, porem inutiliza sub rotas => /produtos/editar/:id
    // * {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
