class IssuesObject {
    protected browser: WebdriverIO.Browser
    private url: string = 'https://github.com/popenovairina4/autotest-ips/issues/new'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
        await browser.$('//*[@id="issue_title_header"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable',
        })
    }
}

export {
    IssuesObject,
}