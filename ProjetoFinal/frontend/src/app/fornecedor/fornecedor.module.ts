import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoComponent } from './novo/novo.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FornecedorRoutingModule } from './fornecedor.routes';
import { FornecedorAppComponent } from './fornecedor.app.component';
import { ListaComponent } from './lista/lista.component';
import { FornecedorService } from './services/fornecedor.service';

import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { FornecedorResolve } from './services/fornecedor.resolve';

import { NgxSpinnerModule } from "ngx-spinner";
import { FornecedorGuard } from './services/fornecedor.guard';
import { ListaProdutoComponent } from './produtos/lista-produtos.component';

@NgModule({
  declarations: [
    FornecedorAppComponent,
    NovoComponent,
    ListaComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent,
    ListaProdutoComponent
  ],
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgBrazil,
    NgxSpinnerModule
  ],
  providers: [
    FornecedorService,
    FornecedorResolve,
    FornecedorGuard
  ]
})
export class FornecedorModule { }
