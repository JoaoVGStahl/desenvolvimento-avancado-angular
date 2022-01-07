import { browser, by, element } from 'protractor';
import { AppBasePage } from '../app.base.po';

export class AppCadastroPage extends AppBasePage {

  constructor() { super(); }

  navegarParaCadastro() {
    this.navegarViaUrl('/cadastro');
  }

  navegarParaCadastroPorLink() {
    this.navegarPorLink('Cadastro');
  }

  iniciarNavegacao() {
    this.navegarParaHome();
    this.navegarParaCadastroPorLink();
  }

  obterTituloCadastro() {
    return this.obterElementoXpath('/html/body/app-root/app-cadastro/div/h4').getText();
  }

  campoNome = element(by.id('nome'));
  campoCPF = element(by.id('cpf'));
  campoEmail = element(by.id('email'));
  campoSenha = element(by.id('senha'));
  campoSenhaConfirmacao = element(by.id('senhaConfirmacao'));

  botaoRegistrar = element(by.id('Registrar'));

  obterResultadoCadastro() {
    return this.obterElementoXpath('/html/body/app-root/app-cadastro/div/form/div/div[7]/div/p[4]').getText();
  }

  obterErroSenha() {
    return this.obterElementoXpath('/html/body/app-root/app-cadastro/div/form/div/div[5]/div/span').getText();
  } 
}
