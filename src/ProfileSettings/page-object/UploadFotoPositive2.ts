import { ChainablePromiseElement } from 'webdriverio'
import { SettingsObject } from './Settings.object';


class UploadAvatar extends SettingsObject {
    static isDisplayedUploadAvatar(): boolean | PromiseLike<boolean> {
        throw new Error("Method not implemented.");
    }
    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getSectionMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-flash-container"]/div')
    }

    public isDisplayedUploadAvatar(): Promise<boolean> {
        return this.getSectionMassage().isDisplayed()
    }
}

export {
    UploadAvatar,
}
