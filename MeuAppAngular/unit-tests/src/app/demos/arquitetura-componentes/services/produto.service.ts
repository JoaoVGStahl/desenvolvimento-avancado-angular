import { Injectable } from "@angular/core";
import { Produto } from "../models/produto";

@Injectable()
export class ProdutoService {
    produtos: Produto[];

    constructor() {
        this.produtos = [
            {
                id: 1,
                nome: 'Samsung S10',
                ativo: true,
                valor: 100,
                imagem: 'celular.jpg'
            },
            {
                id: 2,
                nome: 'GoPro Hero 10',
                ativo: true,
                valor: 200,
                imagem: 'gopro.jpg'
            },
            {
                id: 3,
                nome: 'Asus Zenbook 15',
                ativo: true,
                valor: 300,
                imagem: 'laptop.jpg'
            },
            {
                id: 4,
                nome: 'Mouse Microsoft',
                ativo: true,
                valor: 400,
                imagem: 'mouse.jpg'
            },
            {
                id: 5,
                nome: 'Teclado Microsoft',
                ativo: true,
                valor: 500,
                imagem: 'teclado.jpg'
            },
            {
                id: 6,
                nome: 'Headset Microsoft',
                ativo: false,
                valor: 600,
                imagem: 'headset.jpg'
            }];
    }
    obterTodos(estado: string) : Produto[]{

        switch (estado) {
            case 'ativos':
                return this.produtos.filter(p => p.ativo);
            case 'inativos':
                return this.produtos.filter(p => p.ativo == false);     
            default:
                return this.produtos;
        }
    }

    obterPorId(id : number) : Produto{
        return this.produtos.find( p => p.id == id);
    }
}