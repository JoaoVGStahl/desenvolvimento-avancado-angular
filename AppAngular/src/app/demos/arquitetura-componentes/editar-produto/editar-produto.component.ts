import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styles: []
})
export class EditarProdutoComponent implements OnInit {

  produto: Produto;

  constructor(
    private route: ActivatedRoute, 
    private produtoService: ProdutoService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.produto = this.produtoService.obterPorId(params['id']);
      });
  }

  salvar(){
    // fazer comunicacao com backend

    this.router.navigate(['/produtos']);
    //this.router.navigateByUrl('/produtos');
  }

}
