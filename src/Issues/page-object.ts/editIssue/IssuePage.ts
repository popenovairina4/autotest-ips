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

        await this.saveTitle()
    }

    public async setTitle(title: string): Promise<void> {
        await this.getTitleField().waitForDisplayed({
            timeoutMsg: 'Title input was not displayed',
        })
        await this.getTitleField().setValue(title)
    }

    public async setDescription(description: string): Promise<void> {
        await this.getDescriptionField().waitForDisplayed({
            timeoutMsg: 'Description input was not displayed',
        })
        await this.getDescriptionField().setValue(description)
    }

    public async setComment(comment: string): Promise<void> {
        await this.getCommentField().waitForDisplayed({
            timeoutMsg: 'Comment input was not displayed',
        })
        await this.getCommentField().setValue(comment)
    }

    public async saveTitle(): Promise<void> {
        await this.getSaveTitleButton().waitForClickable({
            timeoutMsg: 'Save button was not clickable',
        })
        await this.getSaveTitleButton().click()
    }

    public async saveDescription(): Promise<void> {
        await this.getDescriptionUpdateButtonElement().waitForClickable({
            timeoutMsg: 'Description update button was not clickable',
        })
        await this.getDescriptionUpdateButtonElement().click()
    }

    public async saveComment(): Promise<void> {
        await this.getCommentButtonElement().waitForClickable({
            timeoutMsg: 'Comment button was not clickable',
        })
        await this.getCommentButtonElement().click()
    }

    public async getTitleText(): Promise<string> {// разбить на 2 команды: получить урл, потом брать + проверка отображения
        await this.getTitleTextElement().waitForDisplayed({
            timeoutMsg: 'Title element was not displayed',
        })
        return this.getTitleTextElement().getText() //берем элемент и читаем из него текст - путь элемента / неважно какой заголовок
    }

    public async getDescriptionText(): Promise<string> {
        await this.getDescriptionTextElement().waitForDisplayed({
            timeoutMsg: 'Description element was not displayed',
        })
        return this.getDescriptionTextElement().getText()
    }

    public async getConversationStatusText(): Promise<string> {
        await this.getLockConversationStatusTextElement().waitForDisplayed({
            timeoutMsg: 'Conversation status element was not displayed',
        })
        return this.getLockConversationStatusTextElement().getText()
    }

    public async getLastCommentText(): Promise<string> {
        await this.getLastCommentTextElement().waitForDisplayed({
            timeoutMsg: 'Last comment element was not displayed',
        })
        return this.getLastCommentTextElement().getText()
    }

    public async editIssueDescription(issue: IssueModel): Promise<void> {
        await this.getDescriptionMenuButtonElement().waitForDisplayed({
            timeoutMsg: 'Description menu button was not displayed',
        })

        await this.getDescriptionMenuButtonElement().click()

        await this.getDescriptionMenuEditElement().waitForDisplayed({
            timeoutMsg: 'Description menu edit button was not displayed',
        })

        await this.getDescriptionMenuEditElement().click()


        await this.getDescriptionField().waitForDisplayed({
            timeoutMsg: 'Description input was not displayed',
        })

        await this.setDescription(issue.description)

        await this.saveDescription()
    }

    public async addComment(comment: string): Promise<void> {
        await this.setComment(comment)

        await this.saveComment()
    }

    public async lockConversation(): Promise<void> {
        await this.getLockConversationButtonElement().waitForDisplayed({
            timeoutMsg: 'Lock conversation button was not displayed',
        })

        await this.getLockConversationButtonElement().click()

        await this.getLockConversationPopupButtonElement().waitForDisplayed({
            timeoutMsg: 'Lock conversation popup button was not displayed',
        })

        await this.getLockConversationPopupButtonElement().waitForClickable({
            timeoutMsg: 'Lock conversation popup button is not clickable',
        })

        await this.getLockConversationPopupButtonElement().click()
    }

    private getEditButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-header"]/div[1]/div/div/button')
    }

    private getSaveTitleButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@id, "edit_header")]/div/button[1]')
    }

    private getTitleField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getDescriptionField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@name="issue[body]"]')
    }

    private getTitleTextElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-header"]/div[1]/div/h1/bdi')
    }

    private getDescriptionTextElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@id, "issue")]/div[3]/div[2]/task-lists/table/tbody/tr[1]/td')
    }

    private getLastCommentTextElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('(//div[contains(@id,"issuecomment")])[last()-1]/div/div[2]/task-lists/table/tbody/tr/td')
    }

    private getCommentField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_comment_field"]')
    }

    private getDescriptionMenuButtonElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//details[1]/summary')
    }

    private getDescriptionMenuEditElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//details[1]/details-menu/button[contains(@class, "js-comment-edit-button")]')
    }

    private getDescriptionUpdateButtonElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@id,"edit-form")]/div/div[2]/div[2]/button[@type="submit"]')
    }

    private getCommentButtonElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-new-comment-form-actions"]/div[3]/div[2]/button')
    }

    private getLockConversationButtonElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-sidebar"]/div[7]/details/summary')
    }

    private getLockConversationPopupButtonElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-sidebar"]/div[7]/details/details-dialog/form/div[3]/button')
    }

    private getLockConversationStatusTextElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('(//*[contains(@id,"event")])[last()]/div[2]')
    }
}

export {
    IssuePage
}