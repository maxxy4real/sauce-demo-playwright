export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = this.page.getByPlaceholder('Username');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.errorMessage = this.page.locator('[data-test="error"]')
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async VerifyErrorMessage(errormessage) {
        await this.errorMessage.toContainText(errormessage);
    }
}