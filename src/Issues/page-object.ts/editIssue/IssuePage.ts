import { ChainablePromiseElement } from 'webdriverio'
import { IssueModel } from '../../model/issue.model'

class IssuePage {
    protected browser: WebdriverIO.Browser

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async editTitleStart(): Promise<void> {
        await this.getEditButton().waitForClickable({
            timeoutMsg: 'Edit button was not clickable',
        })
        await this.getEditButton().click()
    }

    public async editIssueTitle(issue: IssueModel): Promise<void> {
        await this.editTitleStart()

        await this.setTitle(issue.title) // в метод передать модель, вместо 3 должна быть 1, в edit передать модель

        await this.save()
    }

    public async setTitle(title: string): Promise<void> {
        await this.getTitleField().waitForDisplayed({
            timeoutMsg: 'Title input was not displayed',
        })
        await this.getTitleField().setValue(title)
    }

    public async save(): Promise<void> {
        await this.getSaveButton().waitForClickable({
            timeoutMsg: 'Save button was not clickable',
        })
        await this.getSaveButton().click()
    }

    public async getTitleText(): Promise<string> {// разбить на 2 команды: получить урл, потом брать + проверка отображения
        await this.getTitleElement().waitForDisplayed({
            timeoutMsg: 'Title element was not displayed',
        })
        return this.getTitleElement().getText() //берем элемент и читаем из него текст - путь элемента / неважно какой заголовок
    }

    private getEditButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-header"]/div[1]/div/div/button')
    }

    private getSaveButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@id, "edit_header")]/div/button[1]')
    }

    private getTitleField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getTitleElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-header"]/div[1]/div/h1/bdi')
    }
}

export {
    IssuePage
}