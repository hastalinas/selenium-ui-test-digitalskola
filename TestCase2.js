const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const assert = require('assert');
require('dotenv').config();
const fs = require('fs');

const screenshotDir = './screenshot/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 2', function(){
    this.timeout(40000);
    let driver;

    // run setiap mulai tes 1x saja paling awal
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // test suit dimulai dengan apa, setiiap melakukan tes 
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('haha', 'hihi');
    });

    // assertion atau validasi
    it('Error message appears for invalid credential', async function () {
        const loginPage = new LoginPage(driver);
        const errorMessage = await loginPage.getErrorMessage();
        assert.strictEqual(errorMessage, 'Epic sadface: Username and password do not match any user in this service', 'Expected error message does not match');
    });

    // take screenshot
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function () {
        await driver.quit();
    });
});