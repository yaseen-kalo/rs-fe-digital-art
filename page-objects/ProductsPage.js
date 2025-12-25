import { expect } from "@playwright/test"
import {NavigationBar} from "./NavigationBar.js"

export class ProductsPage {

    constructor(page) {
        this.page = page
        this.productCardLocator = page.locator("[data-qa='product-card']")
        this.titleLocator = "[data-qa='product-title']"
        this.addToCartLocator = "[data-qa='product-button']"
        this.sortDropDown = page.locator("[data-qa='sort-dropdown']")
    }
    visit = async() => {
        await this.page.goto("/")
    }

    
    addProductToBasket = async(productName) => {
        const count = await this.productCardLocator.count()

        for(var i=0; i<count; i++)
        {
            const productTitle = await this.productCardLocator.nth(i).locator(this.titleLocator).textContent()
            if(productTitle.trim() === productName)
            {
                const btnAddToCart = this.productCardLocator.nth(i).locator(this.addToCartLocator)
                await btnAddToCart.waitFor()

                //NavigationBar class instance
                const navigationBar = new NavigationBar(this.page)

                const basketCounterBeforeAdding = await navigationBar.getBasketCount()
                await expect(btnAddToCart).toHaveText("Add to Basket")
                await btnAddToCart.click();
                const basketCounterAfterAdding = await navigationBar.getBasketCount()
                await expect(btnAddToCart).toHaveText("Remove from Basket")
                
                 expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding)
            
                break
            }
        }
    }

    sortByCheapest = async() => {
        await this.sortDropDown.waitFor()
        await this.sortDropDown.selectOption('price-asc')

        // expect(await this.sortDropDown.inputValue()).toBe("Price descending")
    }
}