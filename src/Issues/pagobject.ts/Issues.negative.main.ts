
import { ChainablePromiseElement } from 'webdriverio'
import { IssuesObject } from './Issues.Object'


class MainNegativeIssues extends IssuesObject {
    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getSectionMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_issue"]/div/div/div[1]/div/div[1]/div/tab-container/div[2]')
    }

    public isDisplayedMainNegativeIssues(): Promise<boolean> {
        return this.getSectionMassage().isDisplayed()
    }
}

export {
    MainNegativeIssues,
}