import { LoginPage } from "../../page-objects/Login.page"
import { MainPage } from "../../page-objects/Main.page"
import { auth } from "../../secrets/passwords"

describe('Login form', () => {
    let loginPage: LoginPage
    let mainPage: MainPage

    before(async () => {
        loginPage = new LoginPage(browser)
        await loginPage.open()
        mainPage = new MainPage(browser)
    })

    it('login with valid data', async () => {
        await loginPage.login(auth)

        await browser.pause(3000)

        const isDisplayedElement: boolean = await browser.$('/html/body/div[1]/div[1]/header/div').isDisplayed()

        expect(isDisplayedElement).toEqual(true)
    })


})