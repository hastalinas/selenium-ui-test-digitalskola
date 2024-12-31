const { By } = require('selenium-webdriver');

class CompletePage{
    constructor(driver){
        this.driver = driver;
    }

    async isOnComplete (){
        const completeInfo = await this.driver.findElement(By.className('complete-header'));
        return completeInfo.getText();
    }
}

module.exports = CompletePage;