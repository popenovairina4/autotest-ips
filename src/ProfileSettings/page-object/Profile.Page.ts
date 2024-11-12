import { ChainablePromiseElement } from 'webdriverio'
import { ProfileObject } from './Profile.object'

class ProfilePage extends ProfileObject {
    public getBioText(): Promise<string> {
        return this.getBioElement().getText()
    }

    public getFullNameText(): Promise<string> {
        return this.getFullNameElement().getText()
    }

    private getFullNameElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "vcard-fullname")]')
    }

    private getBioElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div[contains(@class, "js-profile-editable-area ")]//div[contains(@class, "user-profile-bio")]/div')
    }
}

export {
    ProfilePage
}