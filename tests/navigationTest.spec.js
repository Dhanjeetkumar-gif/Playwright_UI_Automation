const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/loginPage');
const { HomePage } = require('../pageObjects/homePage');
const { allure } = require('allure-playwright');

test('Verify navigation tabs and Women category products @smoke @navigation', async ({ page }) => {
    // Add Allure reporting details
    allure.epic('Navigation');
    allure.feature('Category Navigation');
    allure.story('Verify Navigation Tabs and Women Products');
    allure.description('Verify Women, Dresses, and T-shirts tabs and validate Women tab clothes list');

    // Initialize page objects
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // Step 1: Navigate to login page
    await page.goto('http://www.automationpractice.pl/index.php?controller=authentication&back=my-account');
    await page.waitForLoadState('networkidle');

    // Step 2: Login with valid credentials
    await loginPage.login('11dhanjeet@gmail.com', 'test1234');
    
    // Step 3: Verify navigation tabs are visible
    await homePage.verifyNavigationTabs();
    
    // Additional verification for each tab
    await expect(homePage.womenTab).toBeVisible();
    await expect(homePage.dressesTab).toBeVisible();
    await expect(homePage.tshirtsTab).toBeVisible();

    // Step 4: Click on Women tab
    await homePage.clickWomenTab();

    // Step 5: Verify products are displayed
    const productNames = await homePage.getProductNames();
    
    // Step 6: Verify product list is not empty and log product names
    expect(productNames.length).toBeGreaterThan(0);
    console.log('Products found in Women category:', productNames);

    // Take a screenshot of the products page
    await page.screenshot({ path: 'test-results/women-products.png' });
});
