const { Builder, Build, Key, until, By} = require('selenium-webdriver')
const assert = require('assert');

async function exampleTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    

    try {
        await driver.get("https://www.saucedemo.com")

        await driver.findElement(By.id('user-name')).sendKeys('standar_user');
        await driver.findElement(By.xpath("//input[@id='password]")).sendKeys('secret_sauce');

        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");

        let menuBotton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuBotton.isDisplayed(), true, "Menu Button is not visible");
    } finally {
        await driver.quit();
    }
}

exampleTest()