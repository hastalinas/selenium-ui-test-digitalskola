const { Builder, Build, Key, until, By} = require('selenium-webdriver')
const assert = require('assert');

async function sauceDemoLoginTest() {
    // membuat koneksi dengan browser driver
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // cari website
        await driver.get("https://www.saucedemo.com")

        // a. User success login
        //masukkkan username dan password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

        // click button login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        // b. Validate user berada di dashboard setelah login
        // memastikan kita di dashboard mencari text swag
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText(); 
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");

        // memastikan kita di dashboard mencari menu
        let menuBotton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuBotton.isDisplayed(), true, "Menu Button is not visible");


        // c. Add item to cart
        let clickAddCart = await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']"));
        await clickAddCart.click()
       
        await driver.findElement(By.xpath("//div[@id='shopping_cart_container']/a[1]")).click();
        let cartItem = await driver.findElement(By.className('cart_item'));
        assert.strictEqual(await cartItem.isDisplayed(), true, "Cart item is not visible in the cart");

        // d. Validate item success add to cart
        let successAdd = await driver.findElement(By.xpath("//a[.='1']")).getText();
        assert.strictEqual(successAdd, "1", "Cart does not contain 1 item");


        //let title = await driver.getTitle();
        console.log("Successfully add to cart and validate");
        
    } finally {
        
        await driver.quit();
    }
}

sauceDemoLoginTest()