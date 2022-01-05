import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { registerLocaleData } from "@angular/common";
import localePT from '@angular/common/locales/pt';
registerLocaleData(localePT);
import { ProdutosDashboardComponent } from "./produtos-dashboard/produtos-dashboard.component";
import { ProdutoRoutingModule } from "./produto.routes";
import { ProdutoDetalheComponent } from "./componentes/produto-card-detalhe.component";
import { ProdutoCountComponent } from "./componentes/produto-count.component";
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';

@NgModule({
    declarations : [
        ProdutosDashboardComponent,
        ProdutoDetalheComponent,
        ProdutoCountComponent,
        EditarProdutoComponent
    ],
    imports: [
        CommonModule,
        ProdutoRoutingModule
    ],
    exports : []
})
export class ProdutoModule {}
 