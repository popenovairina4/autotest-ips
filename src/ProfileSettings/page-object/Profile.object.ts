class ProfileObject {
    protected browser: WebdriverIO.Browser
    private url: string = 'https://github.com/popenovairina4'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
        await (await browser.$('//*[contains(@class, "js-profile-editable-edit-button")]')).waitForDisplayed({
            timeoutMsg: 'Edit Profile button is not visible',
        })
    }
}

export {
    ProfileObject,
}