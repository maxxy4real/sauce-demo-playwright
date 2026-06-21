export class CartPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}