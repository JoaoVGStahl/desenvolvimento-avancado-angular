import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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

  constructor() { }


  ngOnInit() {
    this.produtos = [{
      id: 1,
      nome: 'Teste',
      ativo: true,
      valor: 100,
      imagem: 'celular.jpg'
    },
    {
      id: 2,
      nome: 'Teste 2',
      ativo: true,
      valor: 200,
      imagem: 'gopro.jpg'
    },
    {
      id: 3,
      nome: 'Teste 3',
      ativo: true,
      valor: 300,
      imagem: 'laptop.jpg'
    },
    {
      id: 4,
      nome: 'Teste 4',
      ativo: true,
      valor: 400,
      imagem: 'mouse.jpg'
    },
    {
      id: 5,
      nome: 'Teste 5',
      ativo: true,
      valor: 500,
      imagem: 'teclado.jpg'
    },
    {
      id: 6,
      nome: 'Teste 6',
      ativo: false,
      valor: 600,
      imagem: 'headset.jpg'
    }];
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
