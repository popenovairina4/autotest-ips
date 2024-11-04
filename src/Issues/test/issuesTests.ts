import { userData } from "../../Users/data/user.data"
import { createUserModel, UserModel } from "../../Users/model/user.model"
import { LoginPage } from "../../Users/page-object/Login.page"
import { issueData } from "../data/issues.data"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { MainIssues } from "../pagobject.ts/Issues.main"
import { IssuesPage } from "../pagobject.ts/IssuesPage"

describe('Profile form', () => {
    let issuesPage: IssuesPage
    let mainIssues: MainIssues
    let loginPage: LoginPage
    let issue: IssueModel
    let issueURL: string

    before(async () => {
        // await browser.pause(30000)
        const user: UserModel = createUserModel(userData)
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
        issue = createIssueModel(issueData)
    })

    beforeEach(async () => {
        issuesPage = new IssuesPage(browser)
        await issuesPage.open()
        mainIssues = new MainIssues(browser)
    })

    describe.only('Positive cases', () => {
        it('Title and description"', async () => {
            issueURL = await issuesPage.createIssue(issue)

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainIssues.isDisplayedSuccessIssues()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Only title', async () => {
            const onlytitle = 'hjhkjlk'

            await issuesPage.createIssue({ ...issue, title: onlytitle })

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainIssues.isDisplayedSuccessIssues()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Rename title', async () => {
            const newtitle = 'green'

            await browser.url(issueURL)

            await issuesPage.setTitle(newtitle)

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainIssues.isDisplayedSuccessIssues()

            expect(isDisplayedElement).toEqual(true)
        })
    })

    describe('Negative cases', () => {
        it('Title with spaces', async () => {
            const onlytitle = '  '

            await issuesPage.createIssue({ ...issue, title: onlytitle })

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainIssues.isDisplayedFailedIssues()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Long title', async () => {
            const longtitle = 'jnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hgjnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hgjnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hgjnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hg'

            await issuesPage.createIssue({ ...issue, title: longtitle })

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainIssues.isDisplayedFailedIssues()

            expect(isDisplayedElement).toEqual(true)
        })
    })
})