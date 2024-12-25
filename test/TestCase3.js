const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshot/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 3', function(){
    this.timeout(40000);
    let driver;

    // run setiap mulai tes 1x saja paling awal
    before(async function () {
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    // test suit dimulai dengan apa, setiiap melakukan tes 
    // a. user success login
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
    });

    // assertion atau validasi
    // b. validate user in dashboard after login
    it('Login successfully and verify dashboard', async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title is not found');

    });

    // assertion add item to cart
    // c. add item to cart 
    it('Successfully add to cart and verify cart', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.addItemToCart();
        await dashboardPage.navigateToCart();

        
    // d. successfully validated add item to cart  
        const cartPage = new CartPage(driver);
        const cartItemTitle = await cartPage.isOnCart();
        assert.strictEqual(cartItemTitle, 'Sauce Labs Backpack', 'Expected cart title is not found in cart');
    })
        

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