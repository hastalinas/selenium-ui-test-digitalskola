const { By } = require('selenium-webdriver');

class InformationPage {
    constructor(driver) {
        this.driver = driver;
        this.firstNameField = By.xpath("//input[@id='first-name']"); 
        this.lastNameField = By.xpath("//input[@id='last-name']"); 
        this.postalCodeField = By.xpath("//input[@id='postal-code']"); 
    }

    // Method untuk mengisi informasi checkout
    async fillInformation(firstName, lastName, postalCode) {
        // Isi field "First Name"
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);

        // Isi field "Last Name"
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);

        // Isi field "Postal Code"
        await this.driver.findElement(this.postalCodeField).sendKeys(postalCode);

        // Klik tombol "Continue"
        const continueButton = await this.driver.findElement(By.id('continue'));
        await continueButton.click();
    }
}

module.exports = InformationPage;
