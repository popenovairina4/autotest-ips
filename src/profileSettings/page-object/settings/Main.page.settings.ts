import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../../common/page-object/PageObject';

class MainSettings extends PageObject {
    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public isDisplayedCorrectAvatar(): Promise<boolean> {
        return this.getAvatarSectionMessage().isDisplayed()
    }

    public isDisplayedError(): Promise<boolean> {
        return this.getFailedSectionMassage().isDisplayed();
    }

    public isDisplayedMainSettings(): Promise<boolean> {
        return this.getSuccessSectionMassage().isDisplayed()
    }

    private getAvatarSectionMessage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-flash-container"]/div')
    }

    private getFailedSectionMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-flash-container"]');
    }

    private getSuccessSectionMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('/html/body/div[1]/div[4]/main/div[1]')
    }
}

export {
    MainSettings
}
