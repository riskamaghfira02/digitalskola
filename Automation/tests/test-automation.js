const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('SauceDemo Test Suite', function () {
    let driver;

     // Setup sebelum setiap test case
    beforeEach(async function () {
        options = new chrome.Options();
        options.addArguments('--incognito'); // option ke chrome supaya gaada popup password nya
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    // Cleanup setelah setiap test case
    afterEach(async function () {
        await driver.quit();
    });


    it('Test Case 1 : Sukses Login ke Sauce Demo', async function () {
        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();

        // assert: memastikan object sama persis
        assert.strictEqual(title, 'Swag Labs');

        // inputs
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click()
        
        // tunggu element tampil
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')), 
            10000
        );
        await driver.wait(until.elementIsVisible(buttonCart), 5000, 'Shopping cart harus tampil');
        
        // assert: text dalam element benar
        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.strictEqual(logotext, 'Swag Labs')

        // Verifikasi URL setelah login
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'https://www.saucedemo.com/inventory.html');

        console.log('✅ Test Case 1: Login berhasil');
    });

    it('Test Case 2: Mengurutkan Produk A-Z setelah Login', async function () {
        // Login terlebih dahulu
        await driver.get('https://www.saucedemo.com');
        
        // Input username dan password untuk login
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click()
        
        // Tunggu halaman produk tampil
        await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')), 
            10000
        );

         // Test Case: Urutkan produk A-Z
        // Klik dropdown sort
        let dropdownSort = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]'))
        await dropdownSort.click()
        
        // Pilih opsi "Name (A to Z)"
        let optionAZ = await driver.findElement(By.xpath('//option[text()="Name (A to Z)"]'));
        await optionAZ.click();

        // Tunggu sebentar agar sorting berlaku
        await driver.sleep(1000);

        // Ambil semua nama produk untuk verifikasi
        let productNames = await driver.findElements(By.className('inventory_item_name'));
        let actualProductNames = [];
        
        for (let product of productNames) {
            let name = await product.getText();
            actualProductNames.push(name);
        }

        // Buat salinan array yang sudah di-sort untuk perbandingan
        let sortedProductNames = [...actualProductNames].sort();
        // Verifikasi bahwa produk sudah terurut A-Z
        assert.deepStrictEqual(actualProductNames, sortedProductNames, 'Produk harus terurut A-Z');

        console.log('✅ Test Case 2: Produk berhasil diurutkan A-Z');
        console.log('Urutan produk:', actualProductNames);
    });
    });
