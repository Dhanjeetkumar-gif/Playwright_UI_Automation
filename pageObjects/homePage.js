class HomePage {
    constructor(page) {
        this.page = page;
        // Navigation menu tabs
        this.womenTab = page.locator("//a[@title='Women']");
        this.dressesTab = page.locator("(//a[@title='Dresses'])[2]");
        this.tshirtsTab = page.locator("(//a[@title='T-shirts'])[2]");
        
        // Women category elements
        this.productList = page.locator("//div[@class='product-container']");
        this.productNames = page.locator("//a[@class='product-name']");
    }

    async verifyNavigationTabs() {
        await this.womenTab.waitFor({ state: 'visible' });
        await this.dressesTab.waitFor({ state: 'visible' });
        await this.tshirtsTab.waitFor({ state: 'visible' });
    }

    async clickWomenTab() {
        await this.womenTab.click();
        // Wait for the product list to be visible
        await this.productList.first().waitFor({ state: 'visible' });
    }

    async getProductNames() {
        const products = await this.productNames.all();
        const productNames = [];
        for (const product of products) {
            const name = await product.textContent();
            if (name.trim()) {  // Only add non-empty names
                productNames.push(name.trim());
            }
        }
        return productNames;
    }
}

module.exports = { HomePage };
