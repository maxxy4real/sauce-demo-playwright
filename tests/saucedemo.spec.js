// @ts-check
import { expect } from '@playwright/test';
import { test } from '../fixtures/baseTest';

//This is my first test
test('@sanity standard user should login and navigate to product page', async ({ page, loginPage, productsPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(productsPage.title).toHaveText('Products');
});

test('@sanity locked out user should see locked out error', async ({ page, loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
    await expect(page).not.toHaveURL(/inventory.html/);
});

test('@sanity standard user should add item to cart', async ({ loginPage, productsPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addBackpackToCart();
    await expect(productsPage.cartBadge).toHaveText('1');
    await expect(productsPage.backpackRemoveButton).toBeVisible();
});

test('@regression standard user should remove item from cart', async ({ loginPage, productsPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addBackpackToCart();
    await productsPage.removeBackpackFromCart();
    await expect(productsPage.cartBadge).toHaveCount(0);
    await expect(productsPage.backpackAddButton).toBeVisible();
});

test('@sanity standard user should complete checkout successfully', async ({loginPage, productsPage, cartPage, checkoutPage}) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addBackpackToCart();
    await productsPage.openCart();
    await expect(cartPage.title).toHaveText('Your Cart');
    await cartPage.clickCheckout();
    await checkoutPage.enterCheckoutInformation('John', 'Smith', 'AB12CD');
    await checkoutPage.clickContinue();
    await expect(checkoutPage.title).toHaveText('Checkout: Overview');
    await checkoutPage.clickFinish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});