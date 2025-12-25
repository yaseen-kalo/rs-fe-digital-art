import {test} from "@playwright/test"
import { ProductsPage } from "../page-objects/ProductsPage"
import { NavigationBar } from "../page-objects/NavigationBar"
import { BasketPage } from "../page-objects/BasketPage"
import { LoginPage } from "../page-objects/LoginPage"
import { SignupPage } from "../page-objects/SignupPage"
import { DeliveryDetailsPage } from "../page-objects/DeliveryDetailsPage"
import { deliveryDetails as userAddress } from "../data/deliveryDetails"

import Chance from "chance"

test.only("e2e Product Order Test", async({page}) => {
    const productsPage = new ProductsPage(page)
    const navigationBar = new NavigationBar(page)
    const basketPage = new BasketPage(page)
    const loginPage = new LoginPage(page)
    const signupPage = new SignupPage(page)
    const deliveryDetailsPage = new DeliveryDetailsPage(page)

    const chance = new Chance()
    await productsPage.visit()
    
    await productsPage.addProductToBasket("Mountain Landscape")
    await productsPage.addProductToBasket("Young Man in hot air balloon")
    await productsPage.addProductToBasket("Astronaut dabbing")

    await navigationBar.NavigateToCheckOutPage()

    await basketPage.removeTheCheapestProductFromTheBasket()
    await basketPage.continueToCheckOut()
    await loginPage.navigateToRegisterPage()

    const email = chance.email()
    const password = chance.string({length: 13})
    await signupPage.createNewAccount(email, password)

    await deliveryDetailsPage.filltheDeliveryDetails(userAddress)
    await page.waitForTimeout(3000)
})


test("Product Sorting", async({page}) => {
    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    
    await productsPage.sortByCheapest()
    await page.waitForTimeout(6000)
})