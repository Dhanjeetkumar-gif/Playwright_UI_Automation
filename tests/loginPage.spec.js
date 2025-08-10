//import { test, expect } from '@playwright/test';
const {test,expect} = require('@playwright/test');
//import { LoginPage } from '../pageObjects/loginPage';
const { LoginPage } = require('../pageObjects/loginPage');


test('Login Page', async ({ page }) => {
    await page.goto('http://www.automationpractice.pl/index.php?controller=authentication&back=my-account');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshot.png' });
    const loginPage = new LoginPage(page);
    await loginPage.enterEmail('11dhanjeet@gmail.com');
    await loginPage.enterPassword('test1234');
    await loginPage.clickLoginButton();
    
    // Verify successful login - adjust selector based on your page structure
    await expect(page.locator("//a[@class='account']")).toBeVisible();
});

