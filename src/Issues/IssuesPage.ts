import { ChainablePromiseElement } from 'webdriverio'
import { IssuesObject } from './Issues.Object'

class IssuesPage extends IssuesObject {
    public async setTitle(title: string): Promise<void> {
        await this.getTitleField().waitForDisplayed({
            timeoutMsg: 'Nane input was not displayed',
        })
        await this.getTitleField().setValue(title)
    }

    public async setDescription(discription: string): Promise<void> {
        await this.getDescriptionField().waitForDisplayed({
            timeoutMsg: 'Email input was not displayed',
        })
        await this.getDescriptionField().setValue(discription)
    }

    public async update(): Promise<void> {
        await this.getSubmitIssuesButton().waitForClickable({
            timeoutMsg: 'Update profile was not clickable',
        })
        await this.getSubmitIssuesButton().click()
    }

    private getTitleField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getDescriptionField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_body"]')
    }

    private getSubmitIssuesButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_issue"]/div/div/div[1]/div/div[1]/div/div[3]/button')
    }

    public async settings(createIssues: { title: string, description: string }): Promise<void> {
        await this.setTitle(createIssues.title)
        await this.setDescription(createIssues.description)
        await this.getSubmitIssuesButton().click()
    }
}

export {
    IssuesPage
}
