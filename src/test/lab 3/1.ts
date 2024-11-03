import { LoginPage } from "../../User/Login.page"
import { MainPage } from "../../User/Main.page"
import { auth } from "../../secrets/passwords"

describe('Login form', () => {
    let loginPage: LoginPage


    before(async () => {
        loginPage = new LoginPage(browser)
        await loginPage.open()
    })

    it('login with valid data', async () => {
        await loginPage.login(auth)

        await browser.pause(3000)

        const mainPage: MainPage = new MainPage(browser)
        const isDisplayedElement: boolean = await browser.$('/html/body/div[1]/div[1]/header/div').isDisplayed()

        expect(isDisplayedElement).toEqual(true)
    })
})