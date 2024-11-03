
import { ChainablePromiseElement } from 'webdriverio'
import { SettingsObject } from './Settings.object'


class MainSettings extends SettingsObject {
    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getSectionMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('/html/body/div[1]/div[4]/main/div[1]')
    }

    public isDisplayedMainSettings(): Promise<boolean> {
        return this.getSectionMassage().isDisplayed()
    }
}

export {
    MainSettings,
}








