class PageObject {
    protected browser: WebdriverIO.Browser
    private url: string = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }
}

export {
    PageObject,
}