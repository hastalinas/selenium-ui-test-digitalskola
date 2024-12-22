const { Builder, By, Key, until } = require('selenium-webdriver');
async function exampleTest() {
    // Membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();
    //Exception handling & Conclusion
    try {
        //Buka URL di broswer
        await driver.get("https://www.google.com");
        
        // mencari di searchbox
        let searchBox = await driver.findElement(By.xpath("//textarea[@id='APjFqb']"))

        // simulate user behavior typing hello world
        await searchBox.sendKeys("Hello world", Key.RETURN);
        await driver.wait(until.elementLocated(By.id('result-stats')), 20000);

        let title = await driver.getTitle();
        console.log(`Page Title is: ${title}`);


    } finally {
        // tutup browser
        await driver.quit()
    }
}
exampleTest();

