const { By } = require('selenium-webdriver');

class DashboardPage{
    constructor(driver){
        this.driver = driver;

    }

    async isOnDashboard(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText()
    }

    async addItemToCart(){
        const addButton = await this.driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']"));
        return addButton.click();
    }

    async navigateToCart(){
        const cartButton =  await this.driver.findElement(By.className('shopping_cart_link'));
        await cartButton.click();
    }
}

module.exports= DashboardPage;