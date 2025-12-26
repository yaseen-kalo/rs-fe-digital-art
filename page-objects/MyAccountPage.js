import { getLoginToken } from "../api-calls/getLoginToken"
export class MyAccountPage {
    constructor(page)
    {
        this.page = page
    }

    visit = async() => {
        await this.page.goto("/my-account") 
    }

    injectCookieToBrowser = async () => {
        const loginToken = await getLoginToken()
        // console.warn({loginToken})

        await this.page.evaluate((token) => {
        document.cookie = "token=" + token + "; path=/"
        }, loginToken);

    }
}