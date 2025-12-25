import { expect } from "@playwright/test"

export class NavigationBar {

    constructor(page) {
        this.page = page
        this.basketCounterLocator = page.locator("[data-qa='header-basket-count']")
        this.heading = page.locator(".flex h1")
    }

        getBasketCount = async() => {
        await this.basketCounterLocator.waitFor()

        // getting counter value as a String from counter locator
        const text = await this.basketCounterLocator.innerText()

        // Convert String to Number
        const numCounter = Number(text)
        return numCounter;
    }

        NavigateToCheckOutPage = async() => {
        const btnCheckout = this.page.getByRole("link", {name: 'Checkout'})
        await btnCheckout.waitFor()
        await btnCheckout.click()
        await expect(this.page).toHaveURL(/basket/)
        await expect(this.heading).toHaveText("Basket".trim())
    }
}