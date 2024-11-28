import { ChainablePromiseElement } from 'webdriverio'
import { IssueModel } from '../../model/issue.model'
import { PageObject } from '../../../common/page-object/PageObject'

class IssuesPage extends PageObject { // добавить урл https://github.com/popenovairina4/autotest-ips/issues
    protected url: string = 'https://github.com/popenovairina4/autotest-ips/issues'

    protected createIssueUrl: string = `${this.url}/new`


    public async setDescription(discription: string): Promise<void> {
        await this.getDescriptionField().waitForDisplayed({
            timeoutMsg: 'Description input was not displayed',
        })
        await this.getDescriptionField().setValue(discription)
    }

    public async submitIssue(): Promise<void> { // этого метода раньше не было - от Саши задание разделить  await this.getSubmitIssuesButton().click() на два метода: ожидание кнопки и клик
        await this.getSubmitIssuesButton().waitForClickable({
            timeoutMsg: 'Submit button is not clickable'
        })
        await this.getSubmitIssuesButton().click()
    }

    public async setTitle(title: string): Promise<void> {
        await this.getTitleField().waitForDisplayed({
            timeoutMsg: 'Title input was not displayed',
        })
        await this.getTitleField().setValue(title)
    }

    private getDescriptionField(): ChainablePromiseElement {
        return this.browser.$('//*[@id="issue_body"]')
    }

    private getSubmitIssuesButton(): ChainablePromiseElement {
        return this.browser.$('//*[@id="new_issue"]/div/div/div[1]/div/div[1]/div/div[3]/button')
    }

    private getTitleField(): ChainablePromiseElement {
        return this.browser.$('//*[@id="issue_title"]')
    }

    public async createIssue(issue: IssueModel): Promise<void> { //тип указать issueModel
        await this.open(this.createIssueUrl)
        await this.setTitle(issue.title)
        await this.setDescription(issue.description)
        await this.submitIssue()
        issue.url = await this.browser.getUrl()
    }
}

export {
    IssuesPage
}
