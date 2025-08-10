const { test, expect } = require('@playwright/test');
const { AITestRunner } = require('../utils/aiTestRunner');
const { LoginPage } = require('../pageObjects/loginPage');
const { HomePage } = require('../pageObjects/homePage');

// Configure test timeouts and retries
test.setTimeout(30000);
test.describe('AI-Enabled Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Add error handler for console errors
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.error(`Page Error: ${msg.text()}`);
            }
        });
    });

    test('AI-Enabled Navigation Test', async ({ page }) => {
    const aiRunner = new AITestRunner(page);
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // Define the test prompt
    const prompt = `
Title: Verify Women, Dresses, and T-shirts tabs and validate Women tab clothes list

Steps:
1. Launch the Laga application login page.
2. Enter valid username and password, then click on the Login button.
3. Verify that the navigation menu contains the following tabs:
   - Women
   - Dresses
   - T-shirts
4. Click on the "Women" tab.
5. Verify that the Women category page displays a list of clothes.
6. Log the names of all clothes displayed under the Women category.

Expected Result:
- Tabs "Women", "Dresses", and "T-shirts" are visible after login.
- Clicking "Women" tab displays a list of clothes, and the list is not empty.
`;

    // Process the prompt
    await aiRunner.executePrompt(prompt);

    try {
        // Step 1: Navigate to login page
        console.log('Step 1: Navigating to login page...');
        await page.goto('http://www.automationpractice.pl/index.php?controller=authentication&back=my-account');
        await page.waitForLoadState('networkidle');
        await page.screenshot({ path: 'test-results/1-login-page.png' });

        // Step 2: Login
        console.log('Step 2: Performing login...');
        await loginPage.login('11dhanjeet@gmail.com', 'test1234');
        await page.screenshot({ path: 'test-results/2-after-login.png' });
        
        // Step 3: Verify navigation tabs
        console.log('Step 3: Verifying navigation tabs...');
        await homePage.verifyNavigationTabs();
        await page.screenshot({ path: 'test-results/3-navigation-tabs.png' });
        
        // Step 4: Click Women tab and verify products
        console.log('Step 4: Clicking Women tab...');
        await homePage.clickWomenTab();
        await page.waitForLoadState('networkidle');
        await page.screenshot({ path: 'test-results/4-women-category.png' });
        
        // Step 5: Get and verify product names
        console.log('Step 5: Getting product list...');
        const productNames = await homePage.getProductNames();
        
        // Enhanced reporting
        console.log('\nTest Results:');
        console.log('-------------');
        console.log('Total products found:', productNames.length);
        console.log('Product List:');
        productNames.forEach((name, index) => {
            console.log(`${index + 1}. ${name}`);
        });
        
        // Assertions with detailed messages
        expect(productNames.length, 'Product list should not be empty').toBeGreaterThan(0);
        expect(await homePage.womenTab.isVisible(), 'Women tab should be visible').toBeTruthy();
        expect(await homePage.dressesTab.isVisible(), 'Dresses tab should be visible').toBeTruthy();
        expect(await homePage.tshirtsTab.isVisible(), 'T-shirts tab should be visible').toBeTruthy();

        // Final verification screenshot
        await page.screenshot({ path: 'test-results/5-final-state.png' });
        
        console.log('\nTest completed successfully! ✅');
    } catch (error) {
        console.error('\nTest failed! ❌');
        console.error('Error:', error.message);
        
        // Take screenshot on failure
        await page.screenshot({ path: 'test-results/error-state.png' });
        throw error;
    }
});
});
