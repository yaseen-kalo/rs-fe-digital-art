import {expect} from "@playwright/test"
export class BasketPage {
    constructor(page) 
    {
        this.page = page
        this.basketCardLocator = this.page.locator("[data-qa='basket-card']")
        this.basketItemPriceLocator = "[data-qa='basket-item-price']"
        this.removeFromBasketLocator = "[data-qa='basket-card-remove-item']"
        this.continueToCheckOutLocator = page.getByRole('button', {name: "Continue to Checkout"})
    }

    removeTheCheapestProductFromTheBasket = async() => {
        const productCount = await this.basketCardLocator.count()
        var cheapestPrice = Infinity
        var cheapestIndex = -1
        for(var i=0; i<productCount; i++)
        {
            const cardPrice = await this.basketCardLocator.nth(i).locator(this.basketItemPriceLocator).textContent()
            // console.log(cardPrice)

            const itemPrice = Number(cardPrice.replace(/[^0-9.]/g, ''));
            // console.log(numericPrice);

            if(itemPrice < cheapestPrice)
            {
                cheapestPrice = itemPrice
                cheapestIndex = i
            }
        }
        // console.log("Index: " + cheapestIndex)
        // console.log("Price: " + cheapestPrice)

        // ensures we found at least one product.
        if (cheapestIndex !== -1)
        {
            const btnRemoveProductFromCard = await this.basketCardLocator.nth(cheapestIndex).locator(this.removeFromBasketLocator)
            await btnRemoveProductFromCard.waitFor()
            await btnRemoveProductFromCard.click()
        }
    }

    continueToCheckOut = async () => {
        await this.continueToCheckOutLocator.waitFor()
        await this.continueToCheckOutLocator.click()
        await expect(this.page).toHaveURL(/\/login/)

    }

}