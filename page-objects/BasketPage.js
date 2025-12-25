class BasketPage {
    constructor(page) 
    {
        this.page = page
    }

    NavigateToBasket = async() => {
        const btnCheckout = this.page.getByRole("link", {name: 'Checkout'})
        await btnCheckout.waitFor()
        await btnCheckout.click()
    }
}

export default BasketPage