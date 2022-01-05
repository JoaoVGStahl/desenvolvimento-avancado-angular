import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { ProdutoDetalheComponent } from '../componentes/produto-card-detalhe.component';
import { ProdutoCountComponent } from '../componentes/produto-count.component';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-produto-dashboard',
  templateUrl: './produtos-dashboard.component.html',
  styles: []
})
export class ProdutosDashboardComponent implements OnInit, AfterViewInit {

  produtos: Produto[]

  @ViewChild(ProdutoCountComponent,{static: false}) contador : ProdutoCountComponent;
  @ViewChild('teste', { static: false }) mensagemTela: ElementRef;
  @ViewChildren(ProdutoDetalheComponent) botoes : QueryList<ProdutoDetalheComponent>;

  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    this.produtos = this.route.snapshot.data['produtos'];
    console.log(this.route.snapshot.data['teste']);
  }

  ngAfterViewInit(): void {

    // ! Evite alterar o estado de um objeto usando esta funcionalidade pois ela não tem está finalidade!

    console.log('Objeto Contador: ', this.contador.produtos);

    console.log(this.botoes.forEach(produto => {
      console.log(produto.produto);
    }))

    let clickTexto: Observable<any> = fromEvent(this.mensagemTela.nativeElement, 'click');
    clickTexto.subscribe(()=>{
      alert('não clique aqui! rs');
      return;
    })
  }

  // * Use este modo para alterar o estado de um objeto!
  mudarStatus(event: Produto) {
    event.ativo = !event.ativo;
  }

}
