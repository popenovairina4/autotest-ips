import { ChainablePromiseElement } from 'webdriverio'
import { IssueModel } from '../../model/issue.model'
import { PageObject } from '../../../common/page-object/PageObject'

class IssuePage extends PageObject {
    protected browser: WebdriverIO.Browser
    protected url: string

    constructor(browser: WebdriverIO.Browser, url: string) {
        super(browser)
        this.browser = browser
        this.url = url
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

    public async getLastEventStatusText(): Promise<string> {
        await this.getLastEventTextElement().waitForDisplayed({
            timeoutMsg: 'Last event status element was not displayed',
        })
        return this.getLastEventTextElement().getText()
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

    public async closeIssue(): Promise<void> {
        await this.getCloseIssueButtonElement().waitForDisplayed({
            timeoutMsg: 'Close issue button was not displayed',
        })

        await this.getCloseIssueButtonElement().waitForClickable({
            timeoutMsg: 'Close issue button is not clickable',
        })

        await this.getCloseIssueButtonElement().click()

        await this.getReopenIssueButtonElement().waitForDisplayed({
            timeoutMsg: 'Reopen issue button was not displayed',
        })

        await this.getReopenIssueButtonElement().waitForClickable({
            timeoutMsg: 'Reopen issue button is not clickable',
        })
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

    public async deleteIssue(): Promise<void> {
        await this.getDeleteIssueButtonElement().waitForClickable({ // проверить на кликбл
            timeoutMsg: 'Delete issue button was not clickable',
        })
        await this.getDeleteIssueButtonElement().click()

        await this.getDeleteIssuePopupButtonElement().waitForClickable({
            timeoutMsg: 'Delete issue popup button is not clickable',
        })

        await this.getDeleteIssuePopupButtonElement().click()
    }

    public async addIssueLabel(labelNumber: number): Promise<void> {
        await this.getLabelButtonlement().waitForClickable({
            timeoutMsg: 'Label button was not clickable',
        })
        await this.getLabelButtonlement().click()

        await this.getLabelMenuItemElement(labelNumber).waitForClickable({
            timeoutMsg: 'Label menu item element is not clickable',
        })

        await this.getLabelMenuItemElement(labelNumber).click()

        await this.getLabelButtonlement().click()
    }

    public async deleteIssueLabel(labelNumber: number): Promise<void> {
        await this.getLabelButtonlement().waitForClickable({
            timeoutMsg: 'Label button was not clickable',
        })
        await this.getLabelButtonlement().click()

        await this.getCheckedLabelMenuItemElement(labelNumber).waitForClickable({
            timeoutMsg: 'Label menu item element is not clickable',
        })

        await this.getCheckedLabelMenuItemElement(labelNumber).click()

        await this.getLabelButtonlement().click()
    }

    public async isDisplayedDeletedIssue(): Promise<boolean> {
        const isDisplayed = await this.getIssueDeletedTextElement().isDisplayed()
        const text = await this.getIssueDeletedTextElement().getText()

        return isDisplayed && text === 'This issue has been deleted.'
    }

    public async isDisplayedIssueNoneLabels(): Promise<boolean> {
        await this.geIssueLabelNoneElement().waitForDisplayed({
            timeoutMsg: 'Issue none labels element was not displayed',
        })

        const isNoneLabels = await this.browser.waitUntil(async () => {
            return (await this.geIssueLabelNoneElement().getText()) === 'None yet'
        }, {
            timeout: 5000,
            timeoutMsg: 'expected text "None yet" to be different after 5s'
        })

        return isNoneLabels === true
    }

    public async isDisplayedIssueLabel(labelName: string): Promise<boolean> {
        await this.geIssueLabelElement(labelName).waitForDisplayed({
            timeoutMsg: 'Issue label element was not displayed',
        })

        const isDisplayed = await this.geIssueLabelElement(labelName).isDisplayed()

        return isDisplayed
    }

    private getEditButton(): ChainablePromiseElement {
        return this.browser.$('//*[@id="partial-discussion-header"]/div[1]/div/div/button')
    }

    private getSaveTitleButton(): ChainablePromiseElement {
        return this.browser.$('//*[contains(@id, "edit_header")]/div/button[1]')
    }

    private getTitleField(): ChainablePromiseElement {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getDescriptionField(): ChainablePromiseElement {
        return this.browser.$('//*[@name="issue[body]"]')
    }

    private getTitleTextElement(): ChainablePromiseElement {
        return this.browser.$('//*[@id="partial-discussion-header"]/div[1]/div/h1/bdi')
    }

    private getDescriptionTextElement(): ChainablePromiseElement {
        return this.browser.$('//*[contains(@id, "issue")]/div[3]/div[2]/task-lists/table/tbody/tr[1]/td')
    }

    private getLastCommentTextElement(): ChainablePromiseElement {
        return this.browser.$('(//div[contains(@id,"issuecomment")])[last()-1]/div/div[2]/task-lists/table/tbody/tr/td')
    }

    private getCommentField(): ChainablePromiseElement {
        return this.browser.$('//*[@id="new_comment_field"]')
    }

    private getDescriptionMenuButtonElement(): ChainablePromiseElement {
        return this.browser.$('//details[1]/summary')
    }

    private getDescriptionMenuEditElement(): ChainablePromiseElement {
        return this.browser.$('//details[1]/details-menu/button[contains(@class, "js-comment-edit-button")]')
    }

    private getDescriptionUpdateButtonElement(): ChainablePromiseElement {
        return this.browser.$('//*[contains(@id,"edit-form")]/div/div[2]/div[2]/button[@type="submit"]')
    }

    private getCommentButtonElement(): ChainablePromiseElement {
        return this.browser.$('//*[@id="partial-new-comment-form-actions"]/div[3]/div[2]/button')
    }

    private getLockConversationButtonElement(): ChainablePromiseElement {
        return this.browser.$('//*[@id="partial-discussion-sidebar"]/div[7]/details/summary')
    }

    private getLockConversationPopupButtonElement(): ChainablePromiseElement {
        return this.browser.$('//*[@id="partial-discussion-sidebar"]/div[7]/details/details-dialog/form/div[3]/button')
    }

    private getLastEventTextElement(): ChainablePromiseElement {
        return this.browser.$('(//*[contains(@id,"event")])[last()]/div[2]')
    }

    private getCloseIssueButtonElement(): ChainablePromiseElement {
        return this.browser.$('//close-reason-selector/div/button')
    }

    private getReopenIssueButtonElement(): ChainablePromiseElement {
        return this.browser.$('//reopen-reason-selector/div/button')
    }

    private getDeleteIssueButtonElement(): ChainablePromiseElement {
        return this.browser.$('//*[@id="partial-discussion-sidebar"]/div[9]/details/summary')
    }

    private getDeleteIssuePopupButtonElement(): ChainablePromiseElement {
        return this.browser.$('//details-dialog//*[contains(@id,"edit_issue")]/button')
    }

    private getIssueDeletedTextElement(): ChainablePromiseElement {
        return this.browser.$('//*[@id="repo-content-pjax-container"]/div/div[1]/div/h2')
    }

    private getLabelButtonlement(): ChainablePromiseElement {
        return this.browser.$('//*[@id="labels-select-menu"]/summary')
    }

    private getLabelMenuItemElement(labelNumber: number): ChainablePromiseElement {
        return this.browser.$(`//input[@value=${labelNumber}]/ancestor::label`)
    }

    private getCheckedLabelMenuItemElement(labelNumber: number): ChainablePromiseElement {
        return this.browser.$(`//input[@value=${labelNumber}]/ancestor::label[@aria-checked="true"]`)
    }

    private geIssueLabelElement(labelName: string): ChainablePromiseElement {
        return this.browser.$(`//div[contains(@class, "js-issue-labels")]/a[@data-name="${labelName}"]`)
    }

    private geIssueLabelNoneElement(): ChainablePromiseElement {
        return this.browser.$(`//*[@id="partial-discussion-sidebar"]/div[2]/div`)
    }
}

export {
    IssuePage
}