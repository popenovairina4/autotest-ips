
import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../common/page-object/PageObject'

class MainPage extends PageObject {
    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getUserLOgin(): ChainablePromiseElement {
        return this.browser.$('//form[@action="/sessions/verified-device"] | //*[@data-login="ines4348"]')
    }

    public isDisplayedUserLogin(): Promise<boolean> {
        return this.getUserLOgin().isDisplayed()
    }
}

export {
    MainPage,
}