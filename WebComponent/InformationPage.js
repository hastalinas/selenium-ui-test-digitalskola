const { By, until} = require('selenium-webdriver');

class InformationPage {
    constructor(driver) {
        this.driver = driver;
        this.firstNameField = By.xpath("//input[@id='first-name']"); 
        this.lastNameField = By.xpath("//input[@id='last-name']"); 
        this.postalCodeField = By.xpath("//input[@id='postal-code']"); 
    }

    async isOnInformation() {
        const info = await this.driver.findElement(By.className('title'));
         return info.getText();
     }

    // Method untuk mengisi informasi checkout
    async fillInformation(firstName, lastName, postalCode) {
        const firstNameField = await this.driver.wait(until.elementLocated(this.firstNameField), 5000);
        await firstNameField.sendKeys(firstName);
    
        const lastNameField = await this.driver.wait(until.elementLocated(this.lastNameField), 5000);
        await lastNameField.sendKeys(lastName);
    
        const postalCodeField = await this.driver.wait(until.elementLocated(this.postalCodeField), 5000);
        await postalCodeField.sendKeys(postalCode);
    
        const continueButton = await this.driver.wait(until.elementLocated(By.xpath("//button[@id='checkout']")), 5000);
        await continueButton.click();
    }
}

module.exports = InformationPage;
