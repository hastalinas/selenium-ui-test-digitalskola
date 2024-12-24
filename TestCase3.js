const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const DashboardPage = require('./WebComponent/DashboardPage');
const CartPage = require('./WebComponent/CartPage');
const assert = require('assert');
const fs = require('fs');


const screenshotDir = './screenshot/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 1', function(){
    this.timeout(40000);
    let driver;

    // run setiap mulai tes 1x saja paling awal
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // test suit dimulai dengan apa, setiiap melakukan tes 
    // a. user success login
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
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