import { expect } from "@playwright/test"
export class DeliveryDetailsPage {

    constructor(page) {
        this.page = page
        this.fName = page.getByPlaceholder("First Name")
        this.lName = page.getByPlaceholder("Last Name")
        this.street = page.getByPlaceholder("Street")
        this.postCode = page.getByPlaceholder("Post code")
        this.city = page.getByPlaceholder("City")
        this.countryLocator = page.locator("[data-qa='country-dropdown']")
        this.btnSaveAddressLocator = page.locator("[data-qa='save-address-button']")
        this.saveAddressContainerLocator = page.locator("[data-qa='saved-address-container']")
        this.savedFirstNameLocator = "[data-qa='saved-address-firstName']"
        this.savedLastNameLocator = "[data-qa='saved-address-lastName']"
        this.savedStreetLocator = "[data-qa='saved-address-street']"
        this.savedPostcodeLocator = "[data-qa='saved-address-postcode']"
        this.savedCityLocator = "[data-qa='saved-address-city']"
        this.savedCountryLocator = "[data-qa='saved-address-country']"
        this.btnContinueToPayment = page.locator("[data-qa='continue-to-payment-button']")
    }

    filltheDeliveryDetails = async(userAddress) => {

        console.log(userAddress)
        
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
        // console.info(userAddress.country)
        await this.countryLocator.selectOption(userAddress.country)
    }

    saveAddress = async() => {
        await this.btnSaveAddressLocator.waitFor()
        const beforeSaveAddress = await this.getAddressContainerCount()
        // console.info(beforeSaveAddress)
        await this.btnSaveAddressLocator.click()
        await expect(this.saveAddressContainerLocator).toBeVisible({timeout: 4000})
        const afterSaveAddress = await this.getAddressContainerCount()

        // console.warn(afterSaveAddress)
        expect(afterSaveAddress).toBeGreaterThan(beforeSaveAddress)
        this.assertEnteredAndSavedAddress()

    }

    continueToPayment = async() => {
        this.btnContinueToPayment.waitFor()
        this.btnContinueToPayment.click()
        expect(this.page).toHaveURL(/\/payment/, {timeout:2000})
    }

    getAddressContainerCount = async() => {
        const containerCount = await this.saveAddressContainerLocator.count()
        return containerCount;
    }

    assertEnteredAndSavedAddress = async() => {
        //Extracting Enter Values
        const txtFirstName = await this.fName.inputValue()
        const txtLastName = await this.lName.inputValue()
        const txtStreet = await this.street.inputValue()
        const txtPostcode = await this.postCode.inputValue()
        const txtCity = await this.city.inputValue()
        const txtCountry = await this.countryLocator.inputValue()

        //Extracting Saved Values from Container

        const savedContainer = await this.saveAddressContainerLocator.first()
        const savedFirstName = await savedContainer.locator(this.savedFirstNameLocator)
        const savedlastName = await savedContainer.locator(this.savedLastNameLocator)
        const savedStreet = await savedContainer.locator(this.savedStreetLocator)
        const savedPostCode = await savedContainer.locator(this.savedPostcodeLocator)
        const savedCity = await savedContainer.locator(this.savedCityLocator)
        const savedCountry = await savedContainer.locator(this.savedCountryLocator)

        //assertion

        await expect(savedFirstName).toHaveText(txtFirstName)
        await expect(savedlastName).toHaveText(txtLastName)
        await expect(savedStreet).toHaveText(txtStreet)
        await expect(savedPostCode).toHaveText(txtPostcode)
        await expect(savedCity).toHaveText(txtCity)
        await expect(savedCountry).toHaveText(txtCountry)

    }

}