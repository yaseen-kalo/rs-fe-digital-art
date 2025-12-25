export class SignupPage {
    constructor(page) {
        this.page = page
        this.email = page.getByPlaceholder("E-Mail")
        this.password = page.getByPlaceholder("password")
        this.btnRegister = page.locator("form button")
    }

    createNewAccount = async(email, password) => {

        await this.email.waitFor()
        
        await this.email.fill(email)

        await this.password.waitFor()
        
        await this.password.fill(password)

        await this.btnRegister.waitFor()
        await this.btnRegister.click()
    }

}