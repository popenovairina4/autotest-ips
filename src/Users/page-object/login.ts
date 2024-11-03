import { auth } from "../../secrets/passwords"
import { LoginPage } from "./Login.page"

async function logIn() {
    const loginPage = new LoginPage(browser)
    await loginPage.open()
    await loginPage.login(auth)
    await browser.pause(3000)
}

export {
    logIn
}