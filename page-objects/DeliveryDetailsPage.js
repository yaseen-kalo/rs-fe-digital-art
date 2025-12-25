export class DeliveryDetailsPage {

    constructor(page) {
        this.page = page
        this.fName = page.getByPlaceholder("First Name")
        this.lName = page.getByPlaceholder("Last Name")
        this.street = page.getByPlaceholder("Street")
        this.postCode = page.getByPlaceholder("Post code")
        this.city = page.getByPlaceholder("City")
        this.countryLocator = page.locator("[data-qa='country-dropdown']")
    }

    filltheDeliveryDetails = async(userAddress) => {
        await this.fName.waitFor()
        await this.fName.fill(userAddress.firstName)
        await this.lName.waitFor()
        await this.lName.fill(userAddress.lastName)
        await this.street.waitFor()
        await this.street.fill(userAddress.street)
        await this.postCode.waitFor()
        await this.postCode.fill(userAddress.zip)
        await this.city.waitFor()
        await this.city.fill(userAddress.city)
        await this.countryLocator.waitFor()
        console.info(userAddress.country)
        await this.countryLocator.selectOption(userAddress.country)

    }
}