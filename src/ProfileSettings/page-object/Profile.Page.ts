import { ChainablePromiseElement } from 'webdriverio'

class ProfileForm {
    protected browser: WebdriverIO.Browser
    private url: string = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async setUserProfileBio(userProfileBio: string): Promise<void> {
        await this.getUserProfileBio().waitForDisplayed({
            timeoutMsg: 'Full name was not displayed',
        })
        await this.getUserProfileBio().setValue(userProfileBio)
    }

    public async setFullName(fullName: string): Promise<void> {
        await this.getFullName().waitForDisplayed({
            timeoutMsg: 'Full name was not displayed',
        })
        await this.getFullName().setValue(fullName)
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    private getUserProfileBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//user-profile-bio')
    }

    private getFullName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//vcard-fullname')
    }
}

export {
    ProfileForm
}