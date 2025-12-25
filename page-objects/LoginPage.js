import { expect } from "@playwright/test"

export class LoginPage {
    constructor(page) 
    {
        this.page = page
        this.email = page.getByRole("textbox", {name: "E-Mail"})
        this.password = page.getByRole("textbox", {name: "Password"})
        this.btnRegister = page.getByRole("button", {name: "Register"})
    }

    navigateToRegisterPage = async() => {
        await this.btnRegister.waitFor()
        await expect(this.btnRegister).toBeAttached()
        await expect(this.btnRegister).toBeVisible()
        await this.btnRegister.click()
        await expect(this.page).toHaveURL(/\/signup/)
    }
}