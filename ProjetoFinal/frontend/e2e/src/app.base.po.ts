import { browser, by, element, ExpectedConditions } from 'protractor';

export abstract class AppBasePage {

    constructor() {
        browser.driver.manage().window().maximize();        
    }

    navegarParaHome() {
        return browser.get(browser.baseUrl) as Promise<any>;        
    }

    navegarViaUrl(url: string) {
        return browser.get(url) as Promise<any>;
    }

    navegarPorLink(link: string) {
        browser.wait(ExpectedConditions.elementToBeClickable(element(by.linkText(link)))).then(() => {
            return element(by.linkText(link)).click();
        });
    }

    obterElementoXpath(xpath: string) {
        return element(by.xpath(xpath));
    }

    esperar = (milisegundos: number) => {
        browser.sleep(milisegundos);
    }

    /* LOGIN */
    email = element(by.id('email'));
    senha = element(by.id('password'));

    login(){
        this.navegarPorLink('Entrar');
        this.email.sendKeys('teste@Jdev.com');
        this.senha.sendKeys('@Teste123');

        element(by.id('login')).click();
        this.esperar(6000);
    }
}