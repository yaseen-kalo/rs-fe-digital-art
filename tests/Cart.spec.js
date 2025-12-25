import {test, expect} from "@playwright/test"

test("Add a item to the cart and Navigate to the Cart Page", async({page}) => {
    await page.goto("/")

    await page.waitForLoadState("networkidle")
    const productCard = page.locator("[data-qa='product-card']")
    const count = await productCard.count();
    const digitalArt = "Night background with rental of house"
    const basketCounter = page.locator("[data-qa='header-basket-count']")
    console.log(count)
    for(let i=0; i<count; i++)
    {
        const productName = await productCard.nth(i).locator("[data-qa='product-title']").textContent()
        if(productName.trim() === digitalArt)
        {
            const addToCard = productCard.nth(i).locator("[data-qa='product-button']")
            console.log("Your selected Digital Art is: "+ productName.trim())
            await expect(addToCard).toBeVisible()
            await expect(addToCard).toBeAttached()
            await expect(basketCounter).toHaveText("0")
            await addToCard.click()
            await expect(basketCounter).toHaveText("1")
            await expect(addToCard).toHaveText("Remove from Basket")
            break
        }
    }

    const btnCheckOut = page.getByRole("link",{name:"checkout"})
    await expect(btnCheckOut).toBeVisible()
    await expect(btnCheckOut).toBeAttached()
    await btnCheckOut.click()

    await expect(page).toHaveURL(/basket/)
    await expect(page.getByRole("heading",{name:"Basket"})).toHaveText("Basket")

    const basketItem = page.locator(".text-center").locator("[class='font-bold w-full']").first()
    await expect(basketItem).toHaveText(digitalArt)
    await page.waitForTimeout(1200)
})