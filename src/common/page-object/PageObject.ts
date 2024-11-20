class PageObject {
    protected browser: WebdriverIO.Browser
    protected url: string = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async open(url?: string): Promise<void> {
        await this.browser.url(url ?? this.url)
    }
}

export {
    PageObject,
}