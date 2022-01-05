import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styles: []
})
export class EditarProdutoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private _produtoService: ProdutoService,
    private router: Router
    ) { }

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
    // TODO Fazer comunicação com Backend

    alert('Salvo com sucesso!');
    
    // * Navegação de forma imperativa
    this.router.navigate(['/produtos']);
    
    /* 
    * Deste modo o router acaba recarregando a página ao redirecionar o client para lá
    * Seria como o usuário digitar a rota no navegador e pressionar ENTER
    * this.router.navigateByUrl('/produtos'); 
    */
  }

}
