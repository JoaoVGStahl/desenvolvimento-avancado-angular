import { TestBed } from "@angular/core/testing";

import { Produto } from "../models/produto";
import { ProdutoService } from "./produto.service";

const produtosMock: Produto[] = [{
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
}];

const produtoMock: Produto = {
    id: 2,
    nome: 'Teste 2',
    ativo: true,
    valor: 200,
    imagem: 'gopro.jpg'
}

describe('Produto Service', () =>{
    let service : ProdutoService;

    beforeEach(() =>{
        const bed = TestBed.configureTestingModule({
            providers: [
                ProdutoService
            ]
        });
        // * Devolve a instância atual desta classe/Serviço
        service = bed.get(ProdutoService);
    })

    it('Deve Retornar uma lista de produtos', () =>{
        spyOn(service, 'obterTodos').and.returnValue(produtosMock);

        let result = service.obterTodos('ativos');

        expect(result.length).toBe(3);

        expect(result).toEqual(produtosMock);
    })
});