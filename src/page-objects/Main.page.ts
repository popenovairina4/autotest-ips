import { PageObject } from "./PageObject";
import { ChainablePromiseElement } from 'webdriverio'

class MainPage extends PageObject {
    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getUserLOgin(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//form[@action="/sessions/verified-device"] | //*[@data-login="ines4348"]')
    }

    public isDisplayedUserLogin(): Promise<boolean> {
        return this.getUserLOgin().isDisplayed()
    }
}

export {
    MainPage,
}