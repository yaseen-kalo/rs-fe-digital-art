import { expect } from "@playwright/test"
export class PaymentPage {
    constructor(page) {
        this.page = page
        this.iframe = page.frameLocator("[data-qa='active-discount-container']")
        this.discountCodeLocator = "[data-qa='discount-code']"
        this.txtDiscount = page.getByPlaceholder("Discount code")
        this.btnSubmitDiscount = page.locator("[data-qa='submit-discount-button']")
        this.discountActiveMessage = page.locator("[data-qa='discount-active-message']")
        this.totalAmountValueLocator = page.locator("[data-qa='total-value']")
        this.totalDiscountedValueLocator = page.locator("[data-qa='total-with-discount-value']")

        //Credit Card Fields
        this.cardOwner = page.getByPlaceholder("Credit card owner")
        this.cardNumber = page.getByPlaceholder("Credit card number")
        this.cardExpiry = page.getByPlaceholder("Valid until")
        this.cardCVC = page.getByPlaceholder("Credit card CVC")

        //payButton
        this.btnPay = page.locator("[data-qa='pay-button']")

    }

    submitDiscount = async() => {
        const grabDiscountCode = await this.getDiscountCode()
        await this.txtDiscount.waitFor()
        await this.txtDiscount.fill(grabDiscountCode.trim())
        //did assertion before click because inputting is really slow here.
        await expect(this.txtDiscount).toHaveValue(/^[0-9]{6}[a-z]{2}[0-9a-z]{4}$/)
        await this.btnSubmitDiscount.waitFor()
        await expect(this.discountActiveMessage).toBeHidden()
        await this.btnSubmitDiscount.click()
        await this.page.waitForLoadState('networkidle')
        await expect(this.discountActiveMessage).toHaveText("Discount activated!")
        const totalValue = await this.totalAmountValueLocator.textContent()
        const totalPrice = this.getAmount(totalValue)
        await expect(this.totalDiscountedValueLocator).toHaveText(/^\d+\$$/)
        const discountedValue = await this.totalDiscountedValueLocator.textContent()
        const discountPrice = this.getAmount(discountedValue)
        // console.info(totalPrice)
        // console.info(discountPrice)

        expect(discountPrice).toBeLessThan(totalPrice)

    }

    fillPaymentDetails = async(creditCard) => {

        // console.log(creditCard);

        await this.cardOwner.waitFor()
        await this.cardOwner.fill(creditCard.ownerName)

        await this.cardNumber.waitFor()
        await this.cardNumber.fill(creditCard.number)

        await this.cardExpiry.waitFor()
        await this.cardExpiry.fill(creditCard.expiry)

        await this.cardCVC.waitFor()
        await this.cardCVC.fill(creditCard.cvc)

    }

    placeAnOrder = async() => {
        await this.btnPay.waitFor()
        await expect(this.btnPay).toHaveText("Pay")
        await this.btnPay.click()
    } 


    //helper method
    getDiscountCode = async() => {

        const discountCode = await this.iframe.locator(this.discountCodeLocator).textContent()
        // console.info(typeof(discountCode))
        return discountCode

    }

    getAmount = (price) => {

        const itemPrice = Number(price.replace(/[^0-9.]/g, ''));
        return itemPrice
    }
}