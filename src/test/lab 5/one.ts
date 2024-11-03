import { userData } from "../../Users/data/user.data"
import { MainIssues } from "../../Issues/Issues.main"
import { MainNegativeIssues } from "../../Issues/Issues.negative.main"
import { IssuesPage } from "../../Issues/IssuesPage"
import { createUserModel, UserModel } from "../../Users/model/user.model"
import { LoginPage } from "../../Users/Login.page"
import { createIssues } from "../../Issues/issues"

describe('Profile form', () => {
    let issuesPage: IssuesPage
    let mainIssues: MainIssues
    let mainNegativeIssues: MainNegativeIssues
    let loginPage: LoginPage

    beforeEach(async () => {
        const user: UserModel = createUserModel(userData)
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
        // await browser.pause(30000)
        issuesPage = new IssuesPage(browser)
        await issuesPage.open()
        mainIssues = new MainIssues(browser)
        mainNegativeIssues = new MainNegativeIssues(browser)
    })

    it('Long title', async () => {
        const longtitle = 'jnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hgjnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hgjnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hgjnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hg'

        await issuesPage.settings({ ...createIssues, title: longtitle })

        await browser.pause(3000)

        const isDisplayedElement: boolean = await mainNegativeIssues.isDisplayedMainNegativeIssues()

        expect(isDisplayedElement).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})