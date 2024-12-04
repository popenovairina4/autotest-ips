import { images } from "../data/issues.data"
import { IssuePage } from "../page-object/editIssue/Issue.Page"
import { Result } from '@wdio/visual-service/dist/types'
import { getRandomString } from '../../common/getRandomString'
import { createIssueModel, IssueModel } from "../model/issue.model"
import { LoginPage } from "../../Users/page-object/Login.page"
import { createUserModel, UserModel } from "../../Users/model/user.model"
import { userData } from "../../Users/data/user.data"
import { CreateIssueResponse, IssueAPIService } from '../API/IssueAPI/IssueAPIService'

const OWNER = 'popenovairina4'
const REPO = 'autotest-ips'


describe('picture test', () => {
    let issueUrl: string
    let issueForEdit: IssueModel = createIssueModel()
    let loginPage: LoginPage
    let issuePage: IssuePage
    let issueModel: IssueModel = createIssueModel({ title: getRandomString(10) })

    before(async () => {
        const createIssueResponse: CreateIssueResponse = await IssueAPIService.createIssue(OWNER, REPO, issueModel)//в сервис

        issueUrl = createIssueResponse.html_url

        issuePage = new IssuePage(browser, issueUrl)

        const user: UserModel = createUserModel(userData)
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })


    describe('upload picture', () => {
        images.forEach(image => {
            it(`Скриншотные тесты для вставки картинки в задачу: ${image.name}`, async () => {
                await issuePage.open()

                issueForEdit.description = `![${image.name}](${image.url})`

                await issuePage.editIssueDescription(issueForEdit)

                const result: Result = await browser.checkFullPageScreen(`issue image ${image.name}`)

                expect(result).toBeLessThan(0.5)
            })
        })
    })

    after(async () => {
        await issuePage.deleteIssue()
    })
})