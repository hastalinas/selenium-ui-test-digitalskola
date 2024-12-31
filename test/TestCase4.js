const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const InformationPage = require('../WebComponent/InformationPage');
const assert = require('assert');
const fs = require('fs');
const OverviewPage = require('../WebComponent/OverviewPage');
const CompletePage = require('../WebComponent/CompletePage');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshot/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('TestCase 4 [checkout]', function () {
    this.timeout(40000); // Timeout maksimum untuk setiap tes
    let driver;
    let options;

    // Pilihan browser (Chrome, Firefox, Edge)
    switch (browser.toLowerCase()) {
        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options = new firefox.Options();
            options.addArguments('--headless');
            break;
        case 'edge':
            const edge = require('selenium-webdriver/edge');
            options = new edge.Options();
            break;
        case 'chrome':
        default:
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
            break;
    }

    // Inisialisasi driver sebelum semua tes
    before(async function () {
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    // Login sebelum setiap tes
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
    });

    // Tes: Login berhasil dan validasi dashboard
    it('Successfully add to cart and verify cart', async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title is not found');

        await dashboardPage.addItemToCart();
        await dashboardPage.navigateToCart();

        const cartPage = new CartPage(driver);
        const cartItemTitle = await cartPage.isOnCart();
        assert.strictEqual(cartItemTitle, 'Sauce Labs Backpack', 'Expected cart title is not found in cart');

        await cartPage.clickCheckout();

        const informationPage = new InformationPage(driver);
        const info = await informationPage.isOnInformation();
        assert.strictEqual(info, 'Checkout: Your Information', 'Expected information title is not found');
        
        // Mengisi informasi checkout
        await informationPage.fillInformation('John', 'Doe', '12345');

        // Overview
        const overviewPage = new OverviewPage(driver);
        const overview = await overviewPage.isOnCheckout();
        assert.strictEqual(overview, 'Checkout: Overview', 'Overview page not found');
        
        await overviewPage.validateAll(29.99, 2.40);

        await overviewPage.clickFinish();

        // Complete
        const completePage = new CompletePage(driver);
        const complete = await completePage.isOnComplete();
        assert.strictEqual(complete, 'Thank you for your order!', 'Complete page is not found')
    
    });

    // Ambil screenshot setelah setiap tes
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    // Tutup browser setelah semua tes selesai
    after(async function () {
        await driver.quit();
    });
});
