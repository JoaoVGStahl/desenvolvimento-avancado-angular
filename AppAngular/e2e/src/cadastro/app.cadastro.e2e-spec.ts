import { AppCadastroPage } from './app.cadastro.po';
import { browser, logging } from 'protractor';

describe('Testes do formulario de cadastro', () => {
  let page: AppCadastroPage;

  beforeEach(() => {
    page = new AppCadastroPage();
  });

  it('deve navegar até formulário de cadastro', () => {
    page.iniciarNavegacao();
    expect(page.obterTituloCadastro()).toEqual('Demo Cadastro');    
  });

  it('deve preencher formulário de cadastro com sucesso', () => {
    page.campoNome.sendKeys('João Girardi');
    page.campoCPF.sendKeys('48563274880');
    page.campoEmail.sendKeys('joao.girardi@pontosys.com');
    page.campoSenha.sendKeys('Teste@123');
    page.campoSenhaConfirmacao.sendKeys('Teste@123');

    page.botaoRegistrar.click();
    page.esperar(2000);

    expect(page.obterResultadoCadastro()).toContain('"nome":"João Girardi"');
  });

  it('deve validar senhas diferentes', () => {
    page.iniciarNavegacao();

    page.campoNome.sendKeys('João Girardi');
    page.campoCPF.sendKeys('48563274880');
    page.campoEmail.sendKeys('joao.girardi@pontosys.com');
    page.campoSenha.sendKeys('Teste@2123');
    page.campoSenhaConfirmacao.sendKeys('Teste@123');

    page.campoSenha.click();
    page.esperar(2000);

    expect(page.obterErroSenha()).toContain('As senhas não conferem');
  });
 
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
