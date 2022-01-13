export interface Produto {
  id: string,
  nome: string,
  descricao: string,
  imagem: string,
  imagemUpload: string;
  valor: string;
  dataCadastro: string,
  ativo: true,
  fornecedorId: string,
  nomeFornecedor: string
}

export interface Fornecedor{
  id: string,
  nome: string,
}