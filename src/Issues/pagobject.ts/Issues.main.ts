
import { ChainablePromiseElement } from 'webdriverio'
import { IssuesObject } from './Issues.Object'


class MainIssues extends IssuesObject {
    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getSectionMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-header"]/div[3]/div[4]')
    }

    public isDisplayedMainSettings(): Promise<boolean> {
        return this.getSectionMassage().isDisplayed()
    }
}

export {
    MainIssues,
}