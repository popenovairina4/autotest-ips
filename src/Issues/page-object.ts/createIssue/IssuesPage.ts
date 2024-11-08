import { ChainablePromiseElement } from 'webdriverio'
import { IssuesObject } from './Issues.Object'

class IssuesPage extends IssuesObject {

    public async setDescription(discription: string): Promise<void> {
        await this.getDescriptionField().waitForDisplayed({
            timeoutMsg: 'Description input was not displayed',
        })
        await this.getDescriptionField().setValue(discription)
    }

    public async update(): Promise<void> { // переименовать 
        await this.getSubmitIssuesButton().waitForClickable({
            timeoutMsg: 'Submit issues button was not clickable',
        })
        await this.getSubmitIssuesButton().click()
    }

    public async setTitle(title: string): Promise<void> {
        await this.getTitleField().waitForDisplayed({
            timeoutMsg: 'Title input was not displayed',
        })
        await this.getTitleField().setValue(title)
    }

    private getDescriptionField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_body"]')
    }

    private getSubmitIssuesButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_issue"]/div/div/div[1]/div/div[1]/div/div[3]/button')
    }

    private getTitleField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    public async createIssue(issue: { title: string, description: string }): Promise<string> { //тип указать issueModel
        await this.setTitle(issue.title)
        await this.setDescription(issue.description)
        await this.getSubmitIssuesButton().click()// создать метод, который будет проверять отображение и потом клик
        return this.browser.getUrl()
    }
}

export {
    IssuesPage
}
