import { getRandomString } from "../../test/lab 1/laboratory 8"
import { userData } from "../../Users/data/user.data"
import { createUserModel, UserModel } from "../../Users/model/user.model"
import { LoginPage } from "../../Users/page-object/Login.page"
import { issueData } from "../data/issues.data"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { createIssueUrlModel, IssueUrlModel } from "../model/issueUrl.model"
import { MainIssues } from "../page-object.ts/createIssue/Issues.main"
import { IssuesPage } from "../page-object.ts/createIssue/IssuesPage"
import { IssuePage } from "../page-object.ts/editIssue/IssuePage"


describe('Issue form', () => {
    let issueWithoutDescription: IssueModel = createIssueModel() // правка от Саши Платова
    issueWithoutDescription.description = ''
    let newIssue: IssueModel = createIssueModel(issueData)
    let newIssueUrl: IssueUrlModel = createIssueUrlModel()
    let issuesPage: IssuesPage
    let issuePage: IssuePage
    let mainIssues: MainIssues
    let loginPage: LoginPage

    before(async () => {
        //await browser.pause(40000)
        const user: UserModel = createUserModel(userData)
        issuesPage = new IssuesPage(browser)
        mainIssues = new MainIssues(browser)
        loginPage = new LoginPage(browser)
        issuePage = new IssuePage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    beforeEach(async () => {
        await issuesPage.open()
    })

    describe.only('Positive cases', () => {
        it('Создание задачи с названием и описанием', async () => {
            newIssueUrl.url = await issuesPage.createIssue(newIssue) // присваиваешь в переменную результат выполнения функции

            const isDisplayedElement: boolean = await mainIssues.successfulTaskCreationIsDisplayed()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Rename title', async () => {
            const issue = createIssueModel({ ...issueData, title: 'green' }) // моделдь задачи тут

            await browser.url(newIssueUrl.url) // переходим по урлу созданной задачи

            await issuePage.editIssueTitle(issue)

            const issueDescription = await issuePage.getTitleText()

            expect(issueDescription).toEqual(issue.title)
        })

        it('Update description', async () => {
            const issue = createIssueModel({ ...issueData, description: getRandomString(100) })

            await browser.url(newIssueUrl.url)

            await issuePage.editIssueDescription(issue)

            const issueDescription = await issuePage.getDescriptionText()

            expect(issueDescription).toEqual(issue.description)
        })

        it('Add comment', async () => {
            await browser.url(newIssueUrl.url)

            const comment = getRandomString(100)

            await issuePage.addComment(comment)

            const issueComment = await issuePage.getLastCommentText()

            expect(issueComment).toEqual(comment)
        })

        it('Lock conversation', async () => {
            await browser.url(newIssueUrl.url)

            await issuePage.lockConversation()

            const statusText = await issuePage.getConversationStatusText()

            expect(statusText).toContain('locked and limited conversation to collaborators')
        })

        it('Create issue with title', async () => { // переименовать (было Only title)
            await issuesPage.createIssue(issueWithoutDescription)  // модель c пустым дескрипшеном (было:  const onlytitle = 'hjhkjlk')

            const isDisplayedElement: boolean = await mainIssues.successfulTaskCreationIsDisplayed()

            expect(isDisplayedElement).toEqual(true)
        })
    })

    describe('Negative cases', () => {
        it('Title with spaces', async () => {
            const title = '  '

            await issuesPage.createIssue({ ...issueData, title })

            const isDisplayedElement: boolean = await mainIssues.isDisplayedTitleBlankError() // проверять не попапу, а по getTxt или название модели

            expect(isDisplayedElement).toEqual(true)
        })

        it('Задача с заголовком свыше 1255 символов', async () => {
            const longtitle = getRandomString(1256)

            await issuesPage.createIssue({ ...issueData, title: longtitle })

            const isError: boolean = await mainIssues.isDisplayedTitleMaxSymbolsError()

            expect(isError).toEqual(true)
        })
    })
})