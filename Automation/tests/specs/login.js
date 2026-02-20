const { Builder, By, until } = require('selenium-webdriver');
const LoginAction = require ('../actions/login.action')
const chrome = require('selenium-webdriver/chrome');

describe('SauceDemo Test Suite', function () {
    let driver;
    let loginAction;

     // Setup sebelum setiap test case
    beforeEach(async function () {
        options = new chrome.Options();
        options.addArguments('--incognito'); // option ke chrome supaya gaada popup password nya
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        loginAction = new LoginAction(driver);
        await loginAction.openLoginPage('https://www.saucedemo.com/');
    });

    // Cleanup setelah setiap test case
    afterEach(async function () {
        await driver.quit();
    });


    it('Test Case 1 : Invalid Username', async function () {
        await loginAction.inputUsername('riska_123');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');
    });
    
    it('Test Case 2 : Wrong Password', async function () {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('riska123');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');
    });

    it('Test Case 3 : Username > Locked_out_user', async function () {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Sorry, this user has been locked out.');
    });

    });
