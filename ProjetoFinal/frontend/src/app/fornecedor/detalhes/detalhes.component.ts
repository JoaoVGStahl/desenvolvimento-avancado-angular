import { Component } from '@angular/core';
import { Fornecedor } from '../models/fornecedor';

import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  fornecedor: Fornecedor = new Fornecedor();
  enderecoMap

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {

    this.fornecedor = this.route.snapshot.data['fornecedor'];
    // ! Key Criada no google Maps Free
    this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBjfevYkUXmiid4IJCfK21XHRzlNcoBqs4&q=" + this.EnderecoCompleto());
  }

  EnderecoCompleto(): string {
    return `${this.fornecedor.endereco.logradouro},${this.fornecedor.endereco.numero}-${this.fornecedor.endereco.bairro},${this.fornecedor.endereco.cidade}-${this.fornecedor.endereco.estado}`;
  }
}
