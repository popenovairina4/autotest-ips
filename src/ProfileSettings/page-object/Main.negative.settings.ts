
import { ChainablePromiseElement } from 'webdriverio'
import { SettingsObject } from './Settings.object';


class MainNegativeSettings extends SettingsObject {
    static isDisplayedUserLogin(): boolean | PromiseLike<boolean> { //указать паблик или прайвет, возможно это не надо
        throw new Error("Login is not displayed.");
    }
    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getSectionMassage(): ChainablePromiseElement<WebdriverIO.Element> { //переименовать для логина
        return this.browser.$('//*[@id="js-flash-container"]') //прайвет внизу, паблик наверху, протектед в середине
    }

    public isDisplayedUserLogin(): Promise<boolean> {
        return this.getSectionMassage().isDisplayed()
    }
}

export {
    MainNegativeSettings,
}
