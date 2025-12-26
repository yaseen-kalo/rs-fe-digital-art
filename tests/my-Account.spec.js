import {test} from "@playwright/test"

import { MyAccountPage } from "../page-objects/MyAccountPage"

test("My Account using cookie injection", async({page}) => {


    const myAccountPage = new MyAccountPage(page)
    await myAccountPage.visit()

    await myAccountPage.injectCookieToBrowser()
    // Optional: reload page to pick up cookie
    await myAccountPage.visit()
    await page.waitForTimeout(3000)
});