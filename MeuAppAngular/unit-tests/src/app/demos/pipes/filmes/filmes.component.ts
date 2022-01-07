import { Component, OnInit } from '@angular/core';
import { Filme } from './filme';
import { ImageFormaterPipe } from './image.pipe';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  providers: [
    ImageFormaterPipe
  ]
})
export class FilmesComponent implements OnInit {

  filmes : Filme[];

  mapped : Filme[];

  constructor(private imageFormater: ImageFormaterPipe) {  }

  ngOnInit() {
      this.filmes = [
        {
          nome: 'Vigadores - Guerra Infinita',
          dataLancamento : new Date('04/26/2018'),
          valor: 109.90,
          imagem: 'vingadores.jpg',
          tamanho: '3908420239.36'
        },
        {
          nome: 'Tropa de Elite',
          dataLancamento : new Date('12/09/2007'),
          valor: 299.90,
          imagem: 'tropa.jpg',
          tamanho: '1342177280'
        },
        {
          nome: '+Velozes +Furiosos ',
          dataLancamento : new Date('06/13/2003'),
          valor: 499.98,
          imagem: 'velozes.jpg',
          tamanho: '2705829396.48'
        }
      ];

      this.mapped = this.filmes.map(filme => {
        return {
          nome : filme.nome,
          dataLancamento : filme.dataLancamento,
          valor : filme.valor,
          imagem : this.imageFormater.transform(filme.imagem,'default',true),
          tamanho : filme.tamanho
        };
      })

  }

}
