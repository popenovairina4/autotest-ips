import { userData } from "../../Users/data/user.data"
import { createUserModel, UserModel } from "../../Users/model/user.model"
import { LoginPage } from "../../Users/page-object/Login.page"
import { issueData } from "../data/issues.data"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { MainIssues } from "../page-object.ts/createIssue/Issues.main"
import { IssuesPage } from "../page-object.ts/createIssue/IssuesPage"
import { EditIssuesPage } from "../page-object.ts/editIssue/IssueFormPage"

describe('Issue form', () => {
    let issueWithoutDescription: IssueModel = createIssueModel()
    issueWithoutDescription.description = ''
    let issuesPage: IssuesPage
    let editIssuesPage: EditIssuesPage
    let mainIssues: MainIssues
    let loginPage: LoginPage
    let issueURL: string // определяем глобальную переменную: область видимости переменной определется скобками

    before(async () => {
        //await browser.pause(40000)
        const user: UserModel = createUserModel(userData)
        issuesPage = new IssuesPage(browser)
        mainIssues = new MainIssues(browser)
        loginPage = new LoginPage(browser)
        editIssuesPage = new EditIssuesPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    beforeEach(async () => {
        await issuesPage.open()
    })

    describe('Positive cases', () => {
        it('Создание задачи с названием и описанием', async () => {
            issueURL = await issuesPage.createIssue({ ...issueData }) // присваиваешь в переменную результат выполнения функции
            // указать тип issueURL

            const isDisplayedElement: boolean = await mainIssues.isDisplayedSuccessIssues()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Rename title', async () => {
            const newtitle = 'green'// моделдь задачи тут

            await browser.url(issueURL) // переходим по урлу созданной задачи

            await editIssuesPage.edit()

            await editIssuesPage.setTitle(newtitle) // в метод передать модель, вместо 3 долдна быть 1, в edit передать модель

            await editIssuesPage.save()

            //await browser.url(issueURL)

            const issueTitle = await editIssuesPage.getTitleText()

            expect(issueTitle).toEqual(newtitle)
        })

        it.only('Only title', async () => { // переименовать
            const onlytitle = 'hjhkjlk'// модель c пустым дескрипшеном

            await issuesPage.createIssue(issueWithoutDescription)

            const isDisplayedElement: boolean = await mainIssues.isDisplayedSuccessIssues()

            expect(isDisplayedElement).toEqual(true)
        })
    })

    describe('Negative cases', () => {
        it('Title with spaces', async () => {
            const onlytitle = '  '

            await issuesPage.createIssue({ ...issueData, title: onlytitle })

            const isDisplayedElement: boolean = await mainIssues.isDisplayedFailedIssues()// проверять не попапу, а по getTxt или название модели

            expect(isDisplayedElement).toEqual(true)
        })

        it('Long title', async () => {
            const longtitle = 'jnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hgjnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hgjnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hgjnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hg'

            await issuesPage.createIssue({ ...issueData, title: longtitle })

            const isDisplayedElement: boolean = await mainIssues.isDisplayedFailedIssues()

            expect(isDisplayedElement).toEqual(true)
        })
    })
})