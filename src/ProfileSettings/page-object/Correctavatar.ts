import { ChainablePromiseElement } from 'webdriverio'
import { SettingsObject } from './Settings.object'


class CorrectAvatar extends SettingsObject {
    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getSectionMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-flash-container"]/div')
    }

    public isDisplayedCorrectAvatar(): Promise<boolean> { //
        return this.getSectionMassage().isDisplayed()
    }
}

export {
    CorrectAvatar,
}
