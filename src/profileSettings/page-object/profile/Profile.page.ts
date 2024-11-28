import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../../common/page-object/PageObject'


class ProfilePage extends PageObject {
    protected url: string = 'https://github.com/popenovairina4'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
        this.browser = browser
    }

    public getBioText(): Promise<string> { // проверка на displayed
        return this.getBioElement().getText()
    }

    public getFullNameText(): Promise<string> { // проверка на displayed
        return this.getFullNameElement().getText()
    }

    private getBioElement(): ChainablePromiseElement {
        return this.browser.$('//div[contains(@class, "js-profile-editable-area ")]//div[contains(@class, "user-profile-bio")]/div')
    }


    private getFullNameElement(): ChainablePromiseElement {
        return this.browser.$('//*[contains(@class, "vcard-fullname")]')
    }
}

export {
    ProfilePage
}