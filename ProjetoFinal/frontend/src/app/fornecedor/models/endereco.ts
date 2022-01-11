export class Endereco {
    id: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    fornecedorId: string;
}

export class CepConsulta {
    cep: string;
    logradouro: string;
    complemento : string;
    bairro: string;
    localidade : string;
    uf: string;
}