import {test} from "@playwright/test"
import { ProductsPage } from "../page-objects/ProductsPage"
import { NavigationBar } from "../page-objects/NavigationBar"
import { BasketPage } from "../page-objects/BasketPage"
import { LoginPage } from "../page-objects/LoginPage"
import { SignupPage } from "../page-objects/SignupPage"
import { DeliveryDetailsPage } from "../page-objects/DeliveryDetailsPage"
import { deliveryDetails as userAddress } from "../data/deliveryDetails"
import { PaymentPage } from "../page-objects/PaymentPage"
import { creditCard } from "../data/creditCardDetails"

import { faker } from '@faker-js/faker'; 

test("e2e Product Order Test", async({page}) => {
    const productsPage = new ProductsPage(page)
    const navigationBar = new NavigationBar(page)
    const basketPage = new BasketPage(page)
    const loginPage = new LoginPage(page)
    const signupPage = new SignupPage(page)
    const deliveryDetailsPage = new DeliveryDetailsPage(page)
    const paymentPage = new PaymentPage(page)

    await productsPage.visit()
    
    await productsPage.addProductToBasket("Mountain Landscape")
    await productsPage.addProductToBasket("Young Man in hot air balloon")
    await productsPage.addProductToBasket("Astronaut dabbing")

    await navigationBar.NavigateToCheckOutPage()

    await basketPage.removeTheCheapestProductFromTheBasket()
    await basketPage.continueToCheckOut()
    await loginPage.navigateToRegisterPage()

    const email = faker.internet.username()
    //just hardcoded it so, I can run github action properly, locally I am generating new password again and again
    const password = "P@ssw0rd!"
    await signupPage.createandSaveNewAccount(email, password)

    await deliveryDetailsPage.filltheDeliveryDetails(userAddress)

    await page.waitForTimeout(3000)
    await deliveryDetailsPage.saveAddress()
    await deliveryDetailsPage.continueToPayment()
    await paymentPage.submitDiscount()

    await paymentPage.fillPaymentDetails(creditCard)
    await paymentPage.placeAnOrder()
    await page.waitForTimeout(5000)
    // await page.pause()
})


test("Product Sorting", async({page}) => {
    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    
    await productsPage.sortByCheapest()
    await page.waitForTimeout(6000)
})