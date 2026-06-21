export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.backpackAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.backpackRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async addBackpackToCart() {
        await this.backpackAddButton.click();
    }

    async removeBackpackFromCart() {
        await this.backpackRemoveButton.click();
    }

    async openCart() {
        await this.cartLink.click();
    }
}