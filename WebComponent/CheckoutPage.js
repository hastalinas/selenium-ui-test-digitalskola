const { By } = require('selenium-webdriver');

class CheckoutPage{
    constructor(driver){
        this.driver = driver;
    }

    async isOnCheckout () {
        const paymentInfo = await this.driver.findElement(By.xpath("//div[.='Payment Information:']"));
        return paymentInfo.getText()
    }

    async clickFinish () {
        const finishButton = await this.driver.findElement(By.id('finish'));
        await finishButton.click();
    }

}

module.exports = CheckoutPage;
