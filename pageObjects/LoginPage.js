class LoginPage {

    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator("//input[@id='email']");
        this.passwordInput = page.locator("//input[@id='passwd']");
        this.loginButton = page.locator("//button[@id='SubmitLogin']");
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async enterEmail(email) {
        await this.usernameInput.fill(email);
    }
    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }

}

export { LoginPage };