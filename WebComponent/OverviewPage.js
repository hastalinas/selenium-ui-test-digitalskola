const { By } = require('selenium-webdriver');

class OverviewPage{
    constructor(driver){
        this.driver = driver;
    }

    async isOnCheckout () {
        const paymentInfo = await this.driver.findElement(By.className('title'));
        return paymentInfo.getText();
    }

    async getItemName(){
        const itemName = await this.driver.findElement(By.className('inventory_item_name'));
        return itemName.getText();
    }

    async getItemPrice(){
        const itemPrice = await this.driver.findElement(By.className('inventory_item_price')).getText();
        return parseFloat(itemPrice.replace('$', ''));;
    }

    async getTax() {
        const tax = await this.driver.findElement(By.className('summary_tax_label')).getText();
        return parseFloat(tax.replace('Tax: $', '').trim());
    }

    async getTotalPrice() {
        const total = await this.driver.findElement(By.className('summary_total_label')).getText();
        console.log(`Total: ${total}`);
        return parseFloat(total.replace('Total: $', '').trim());
    }

    async validateAll(expectedPrice, expectedTax) {
        const itemPrice = await this.getItemPrice();
        const tax = await this.getTax();
        const total = await this.getTotalPrice();

        const calculatedTotal = itemPrice + tax;

        // Validasi harga item
        if (itemPrice !== parseFloat(expectedPrice)) {
            throw new Error(`Harga item tidak sesuai. Expected: ${expectedPrice}, Found: ${itemPrice}`);
        }

        // Validasi pajak
        if (tax !== parseFloat(expectedTax)) {
            throw new Error(`Pajak tidak sesuai. Expected: ${expectedTax}, Found: ${tax}`);
        }

        // Validasi total harga
        if (calculatedTotal !== total) {
            throw new Error(`Total harga tidak sesuai. Expected: ${calculatedTotal}, Found: ${total}`);
        }
        return true; // Validasi berhasil
    }

    async clickFinish () {
        const finishButton = await this.driver.findElement(By.id('finish'));
        await finishButton.click();
    }

}

module.exports = OverviewPage;
