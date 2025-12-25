class ProductsPage {

    constructor(page) {
        this.page = page
        this.productCard = this.page.locator("[data-qa='product-card']")
        this.titleLocator = "[data-qa='product-title']"
        this.addToCartLocator = "[data-qa='product-button']"
    }
    visit = async() => {
        await this.page.goto("/")
    }

    addProductToBasket = async(productName) => {
        const count = await this.productCard.count()

        for(var i=0; i<count; i++)
        {
            const productTitle = await this.productCard.nth(i).locator(this.titleLocator).textContent()
            if(productTitle.trim() === productName)
            {
                const btnAddToCart = this.productCard.nth(i).locator(this.addToCartLocator)
                await btnAddToCart.waitFor()
                await btnAddToCart.click()
                break
            }
        }
    }
}

export default ProductsPage;