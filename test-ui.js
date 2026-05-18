const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

const options = new chrome.Options();
options.addArguments('--headless'); // executa sem abrir janela
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');
options.addArguments('--window-size=1920,1080');


async function testeUI() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    console.log('Abrindo site...');
    await driver.get('https://www.cps.sp.gov.br/');
    const titulo = await driver.getTitle();
    console.log('Título:', titulo);
    expect(titulo).to.include('Centro Paula Souza');

    const menu = await driver.findElement(By.css('nav'));
    const visivel = await menu.isDisplayed();
    console.log('Menu visível?', visivel);
    expect(visivel).to.be.true;

    const campoBusca = await driver.findElement(By.css('input[type="search"], input[name*="s"]'));
    await campoBusca.sendKeys('cursos\n');
    await driver.wait(until.urlContains('curso'), 5000);
    console.log('Redirecionamento OK');



    driver.quit();
}

testeUI().catch(console.error);
