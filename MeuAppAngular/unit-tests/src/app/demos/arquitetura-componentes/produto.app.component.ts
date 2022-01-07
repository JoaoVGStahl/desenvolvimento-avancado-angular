import { Component } from "@angular/core";

// * ao invés de declar templateUrl escrevi o html direto por ser apenas uma linha, passa assim o roteador para o produto.route.ts
@Component({
    selector:'produto-app-root',
    template: '<router-outlet></router-outlet>'
})

export class ProdutoAppComponent { }