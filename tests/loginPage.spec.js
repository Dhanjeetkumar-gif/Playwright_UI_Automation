const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/loginPage');
const { allure } = require('allure-playwright');


const test = base.extend({
    page: async ({ page }, use) => {
        // Enable Cursor MCP features
        await page.setExtraHTTPHeaders({
            'x-cursor-mcp': '1'
        });
        
        // Add custom attributes for better element identification
        await page.evaluate(() => {
            window.__CURSOR_MCP__ = true;
        });
        
        await use(page);
    }
});

test('Login Page @smoke @login', async ({ page }) => {
    allure.epic('Authentication');
    allure.feature('Login');
    allure.story('Valid Login');
    allure.description('Test valid user login with correct credentials');
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

