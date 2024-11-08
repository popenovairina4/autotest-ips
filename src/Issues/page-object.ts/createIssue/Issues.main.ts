import { ChainablePromiseElement } from 'webdriverio'
import { IssuesObject } from './Issues.Object'



class MainIssues extends IssuesObject {
    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public isDisplayedFailedIssues(): Promise<boolean> {
        return this.getFailedSectionMassage().isDisplayed()
    }

    public isDisplayedSuccessIssues(): Promise<boolean> {// переименовать метод 
        return this.getSuccessSectionMassage().isDisplayed()
    }

    private getFailedSectionMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_issue"]/div/div/div[1]/div/div[1]/div/tab-container/div[2]')
    }

    private getSuccessSectionMassage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-header"]/div[3]/div[4]')
    }
}

export {
    MainIssues,
}