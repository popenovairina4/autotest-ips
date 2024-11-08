import { ChainablePromiseElement } from 'webdriverio'

class IssuesFormPage {                          //переименовать класс - экран созданной задачи (+)
    protected browser: WebdriverIO.Browser

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async setDescription(discription: string): Promise<void> {
        await this.getDescriptionField().waitForDisplayed({
            timeoutMsg: 'Description input was not displayed',
        })
        await this.getDescriptionField().selectByAttribute("value", discription)
    }

    public async edit(): Promise<void> {
        await this.getEditButton().waitForClickable({
            timeoutMsg: 'Edit button was not clickable',
        })
        await this.getEditButton().click()
    }

    public async save(): Promise<void> {
        await this.getSaveButton().waitForClickable({
            timeoutMsg: 'Save button was not clickable',
        })
        await this.getSaveButton().click()
    }

    public async setTitle(title: string): Promise<void> {
        await this.getTitleField().waitForDisplayed({
            timeoutMsg: 'Title input was not displayed',
        })
        await this.getTitleField().setValue(title)
    }

    public async getTitleText(): Promise<string> {// разбить на 2 команды: получить урл, потом брать + проверка отображения
        return this.browser.$('//*[@id="partial-discussion-header"]/div[1]/div/h1/bdi').getText() //берем элемент и читаем из него текст - путь элемента / неважно какой заголовок
    }

    public async editIssue(issue: { title: string, description: string }): Promise<string> {
        await this.getEditButton().click()                                                      // паблик вверх(+)
        await this.setTitle(issue.title)
        await this.setDescription(issue.description)
        await this.getSaveButton().click()
        return this.browser.getUrl()
    }

    private getDescriptionField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_body"]')
    }

    private getEditButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-header"]/div[1]/div/div/button')
    }

    private getSaveButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//form[starts-with(@id, "edit_header")]/div/button[1]')
    }

    private getTitleField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }
}

export {
    IssuesFormPage as EditIssuesPage
}