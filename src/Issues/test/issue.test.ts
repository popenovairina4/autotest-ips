import { browser, expect } from '@wdio/globals'
import { getRandomString } from "../../test/lab 1/laboratory 8"
import { userData } from "../../Users/data/user.data"
import { createUserModel, UserModel } from "../../Users/model/user.model"
import { LoginPage } from "../../Users/page-object/Login.page"
import { issueData } from "../data/issues.data"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { MainIssues } from "../page-object/createIssue/Main.page.issues"
import { IssuesPage } from "../page-object/createIssue/Issues.page"
import { IssuePage } from "../page-object/editIssue/Issue.Page"


describe('Issue form', () => {
    let issueWithoutDescription: IssueModel = createIssueModel({
        description: ''
    })
    let issueWithouLongTitle: IssueModel = createIssueModel({
        title: getRandomString(1256)
    })
    let issueWithEmptyTitle: IssueModel = createIssueModel({
        title: ' '
    })
    let issue: IssueModel = createIssueModel(issueData)
    let issueForEdit: IssueModel = createIssueModel()
    let issueForDelete: IssueModel = createIssueModel()
    let issuesPage: IssuesPage
    let mainIssues: MainIssues
    let loginPage: LoginPage

    before(async () => {
        //await browser.pause(40000)
        const user: UserModel = createUserModel(userData)
        issuesPage = new IssuesPage(browser)
        mainIssues = new MainIssues(browser)
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    describe('Positive cases', () => {
        it('Create issue with title and description', async () => {
            await issuesPage.createIssue(issue)

            const isDisplayedElement: boolean = await mainIssues.successfulTaskCreationIsDisplayed()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Create issue with title', async () => {
            await issuesPage.createIssue(issueWithoutDescription)

            const isDisplayedElement: boolean = await mainIssues.successfulTaskCreationIsDisplayed()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Update title', async () => {
            await issuesPage.createIssue(issue)

            issueForEdit.title = getRandomString(20) // создать в бефор при создании заполнить урл модели: редактировать в тесте

            const issuePage: IssuePage = new IssuePage(browser, issue.url)
            await issuePage.open()

            await issuePage.editIssueTitle(issueForEdit)

            const issueDescription = await issuePage.getTitleText()

            expect(issueDescription).toEqual(issueForEdit.title)
        })

        it('Update description', async () => { // как в третьем
            await issuesPage.createIssue(issue)

            issueForEdit.description = getRandomString(100)

            const issuePage: IssuePage = new IssuePage(browser, issue.url)
            await issuePage.open()

            await issuePage.editIssueDescription(issueForEdit)

            const issueDescription = await issuePage.getDescriptionText()

            expect(issueDescription).toEqual(issueForEdit.description)
        })

        it('Add comment', async () => { //  как в третьем
            await issuesPage.createIssue(issue)

            const issuePage: IssuePage = new IssuePage(browser, issue.url)
            await issuePage.open()

            await issuePage.addComment(issue.comment)

            const issueComment = await issuePage.getLastCommentText()

            expect(issueComment).toEqual(issue.comment)
        })

        it('Lock conversation', async () => {
            const issuePage: IssuePage = new IssuePage(browser, issue.url)
            await issuePage.open()

            await issuePage.lockConversation()

            const statusText: string = await issuePage.getLastEventStatusText()

            expect(statusText).toContain('locked and limited conversation to collaborators')
        })

        it('Close issue', async () => {
            const issuePage: IssuePage = new IssuePage(browser, issue.url)
            await issuePage.open()

            await issuePage.closeIssue()

            const statusText: string = await issuePage.getLastEventStatusText()

            expect(statusText).toContain('closed this as completed')
        })
    })

    describe('Negative cases', () => {
        it('Title with spaces', async () => {
            await issuesPage.createIssue(issueWithEmptyTitle)

            const isDisplayedElement: boolean = await mainIssues.isDisplayedTitleBlankError()
            expect(isDisplayedElement).toEqual(true)
        })

        it('Задача с заголовком свыше 1255 символов', async () => {
            await issuesPage.createIssue(issueWithouLongTitle)

            const isError: boolean = await mainIssues.isDisplayedTitleMaxSymbolsError()

            expect(isError).toEqual(true)
        })
    })

    describe('Delete issue', () => {
        it('Delete issue', async () => {
            await issuesPage.createIssue(issueForDelete)

            await browser.url(issueForDelete.url)

            const issuePage: IssuePage = new IssuePage(browser, issueForDelete.url)
            await issuePage.open()

            await issuePage.deleteIssue()

            await browser.url(issueForDelete.url)

            const isDeleted = await issuePage.isDisplayedDeletedIssue()

            expect(isDeleted).toEqual(true)
        })
    })
})