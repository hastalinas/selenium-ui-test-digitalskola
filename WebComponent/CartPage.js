const { By } = require('selenium-webdriver');

class CartPage{
    constructor(driver){
        this.driver = driver;

    }

    async isOnCart(){
        const cartItem = await this.driver.findElement(By.className('inventory_item_name'));
        return cartItem.getText()
    }
}

module.exports = CartPage;