import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styles: []
})
export class EditarProdutoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _produtoService: ProdutoService) { }

  produto : Produto;

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        // * console.log(params['id']); Este Id é o mesmo que foi declarada na rota em produto.routes.ts

        this.produto = this._produtoService.obterPorId(params['id']);
        console.log(this.produto)
      }
    );
  }
  salvar(){
    alert('Salvo com sucesso!');
  }

}
