import { AppProdutoPage } from './app.cadastro-produto.po';
import { browser, logging } from 'protractor';

describe('Testes do formulario de cadastro', () => {
  let page: AppProdutoPage;

  beforeEach(() => {
    page = new AppProdutoPage();
  });

  it('deve navegar até produtos', () => {
    page.iniciarNavegacao();
    expect(page.obterTituloProdutos()).toEqual('Lista de Produtos');    
  });

  it('deve preencher formulário de produtos com sucesso', () => {
    
    page.navegarParaNovoProduto();
    page.selecionarFornecedor();

    page.nome.sendKeys('Produto Teste Automatizado');
    page.descricao.sendKeys('Produto \nTeste Automatizado');
    page.valor.sendKeys('1234,50');
    page.selecionarImagem();
    page.ativo.click;

    page.botaoProduto.click();    

    page.esperar(6000);

    expect(page.obterTituloProdutos()).toEqual('Lista de Produtos'); 
  });
 
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
