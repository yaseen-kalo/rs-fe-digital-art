import {test} from "@playwright/test"
import ProductsPage from "../page-objects/ProductsPage"
import BasketPage from "../page-objects/BasketPage";

test.only("e2e Product Order Test", async({page}) => {
    const productsPage = new ProductsPage(page)
    const basketPage = new BasketPage(page)
    await productsPage.visit();
    await productsPage.addProductToBasket("Mountain Landscape")
    await productsPage.addProductToBasket("Young Man in hot air balloon")
    await productsPage.addProductToBasket("Astronaut dabbing")

    await basketPage.NavigateToBasket()
    await page.waitForTimeout(5000)
})