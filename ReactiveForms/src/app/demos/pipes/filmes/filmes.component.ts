import { Component, OnInit } from '@angular/core';
import { Filme } from './filme';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html'
})
export class FilmesComponent implements OnInit {

  filmes : Filme[];

  ngOnInit() {
      this.filmes = [
        {
          nome: 'Vigadores - Guerra Infinita',
          dataLancamento : new Date('04/26/2018'),
          valor: 109.90,
          imagem: 'vingadores.jpg',
          tamanho: '513326980'
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
          tamanho: '719974720'
        }
      ]
  }

}
