class SettingsObject {
    protected browser: WebdriverIO.Browser
    private url: string = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
        await browser.$('//*[@id="public-profile-heading"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable',
        })
    }
}

export {
    SettingsObject,
}