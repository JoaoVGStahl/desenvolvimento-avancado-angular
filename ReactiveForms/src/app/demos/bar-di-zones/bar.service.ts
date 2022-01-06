import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BarServices {

    constructor(private http: HttpClient) { }

    obterBebidas(): string {
        return 'Bebidas';
    }

    obterPorcoes(): string {
        return 'Porções';
    }

    obterRefeicoes(): string {
        return 'Refeições';
    }
}
export class BarServicesMock {

    obterBebidas(): string {
        return 'Bebidas Mock';
    }

    obterPorcoes(): string {
        return 'Porções Mock';
    }

    obterRefeicoes(): string {
        return 'Refeições Mock';
    }
}