import { CreateIssueRequest } from "../API/Createissue/IssueAPIData"
import { IssueAPIProvider } from "../API/Createissue/IssueAPIProvider"
import { CreateIssueResponse } from "../API/Createissue/issueAPIService"
import { AxiosResponse } from "axios"
import { images } from "../data/issues.data"
import { IssuePage } from "../page-object/editIssue/Issue.Page"
import { Result } from '@wdio/visual-service/dist/types'
import { getRandomString } from '../../common/getRandomString'
import { createIssueModel, IssueModel } from "../model/issue.model"
import { LoginPage } from "../../Users/page-object/Login.page"
import { createUserModel, UserModel } from "../../Users/model/user.model"
import { userData } from "../../Users/data/user.data"

const OWNER = 'popenovairina4'
const REPO = 'autotest-ips'


describe('picture test', () => {
    let issueUrl: string
    let issueAPIProvider: IssueAPIProvider
    let issueForEdit: IssueModel = createIssueModel()
    let loginPage: LoginPage

    before(async () => {
        issueAPIProvider = new IssueAPIProvider({
            isSuccessfulResponse: false,
        })

        const createIssueData: CreateIssueRequest = {
            title: getRandomString(10),
            repo: REPO,
            owner: OWNER,
        }

        const createIssueResponse: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(OWNER, REPO, createIssueData)

        issueUrl = createIssueResponse.data.html_url

        const user: UserModel = createUserModel(userData)
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })


    describe('upload picture', () => {
        images.forEach(image => {
            it(`Скриншотные тесты для вставки картинки в задачу: ${image.name}`, async () => {
                const issuePage: IssuePage = new IssuePage(browser, issueUrl)
                await issuePage.open()

                issueForEdit.description = `![${image.name}](${image.url})`

                await issuePage.editIssueDescription(issueForEdit)

                const result: Result = await browser.checkFullPageScreen(`issue image ${image.name}`)

                expect(result).toBeLessThan(0.5)
            })
        })
    })
})
