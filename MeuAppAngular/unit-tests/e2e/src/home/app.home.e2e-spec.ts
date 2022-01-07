import { AppHomePage } from './app.home.po';
import { browser, logging } from 'protractor';

describe('Testes da página inicial', () => {
  let page: AppHomePage;

  beforeEach(() => {
    page = new AppHomePage();
  });

  it('deve exibir uma mensagem na pagina inicial', () => {
    page.navegarParaHome();
    expect(page.getTitleText()).toEqual('Desenvolvimento Avançado em Angular');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
