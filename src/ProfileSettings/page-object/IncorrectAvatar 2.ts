import { ChainablePromiseElement } from 'webdriverio'
import { SettingsObject } from './Settings.object'


class IncorrectAvatar extends SettingsObject {
    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getSectionMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="settings-frame"]/div[2]/div[2]/dl/dd/form/file-attachment/div/div[4]')
    }

    public isDisplayedCorrectAvatar(): Promise<boolean> {
        return this.getSectionMassage().isDisplayed()
    }
}

export {
    IncorrectAvatar,
}