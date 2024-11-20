import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../../common/page-object/PageObject'



class MainIssues extends PageObject { // переименовать наследуется от pageobject
    constructor(browser: WebdriverIO.Browser) {
        super(browser) // вызывает конструктор расширяемого класса
    }

    public isDisplayedFailedIssues(): Promise<boolean> {
        return this.getFailedSectionMessage().isDisplayed()
    }

    public async isDisplayedTitleBlankError(): Promise<boolean> {
        return (
            await this.isDisplayedFailedIssues() &&
            (await this.getFailedSectionMessage().getText()) === `There was an error creating your Issue: title can't be blank.`
        )
    }

    public async isDisplayedTitleMaxSymbolsError(): Promise<boolean> {
        return (
            await this.isDisplayedFailedIssues() &&
            (await this.getFailedSectionMessage().getText()).includes(`There was an error creating your Issue: title is too long (maximum is 256 characters).`)
        )
    }

    public successfulTaskCreationIsDisplayed(): Promise<boolean> {// переименовать метод (был isDisplayedSuccessIssues())
        return this.getSuccessSectionMessage().isDisplayed()
    }

    private getFailedSectionMessage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_issue"]/div/div/div[1]/div/div[1]/div/tab-container/div[2]')
    }

    private getSuccessSectionMessage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-header"]/div[3]/div[4]')
    }
}

export {
    MainIssues,
}