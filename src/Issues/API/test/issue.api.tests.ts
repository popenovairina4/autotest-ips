import { createLabelModel, LabelModel } from "../model/label.issue.model"
import { CreateIssueRequest } from "../Createissue/IssueAPIData"
import { getRandomString } from "../../../common/getRandomString"
import { IssueAPIProvider } from "../Createissue/IssueAPIProvider"
import { AxiosResponse } from "axios"
import { CreateIssueResponse } from "../Createissue/issueAPIService"
import { IssuePage } from "../../page-object/editIssue/Issue.Page"
import { LoginPage } from "../../../Users/page-object/Login.page"
import { createUserModel, UserModel } from "../../../Users/model/user.model"
import { userData } from "../../../Users/data/user.data"
import { LabelCreateAPIService, LabelResponse } from "../issueAPI/createLabel.ts/LabelCreateAPIService"

const OWNER = 'popenovairina4'
const REPO = 'autotest-ips'

describe('Issue API test', () => {
    let issueUrl: string
    let issueWithLabelUrl: string
    let labelId: number
    let labelName: string
    let issueLabelModel: LabelModel = createLabelModel({ name: getRandomString(10) })
    let loginPage: LoginPage

    before(async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider({
            isSuccessfulResponse: false,
        })
        const labelResponse: LabelResponse = await LabelCreateAPIService.createLabel(OWNER, REPO, issueLabelModel)
        labelId = labelResponse.id
        labelName = labelResponse.name

        const createIssueData: CreateIssueRequest = {
            title: getRandomString(10),
            repo: REPO,
            owner: OWNER,
        }
        const createIssueWithLabelData: CreateIssueRequest = {
            ...createIssueData,
            labels: [
                labelResponse.name,
            ]
        }

        const createIssueResponse: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(OWNER, REPO, createIssueData)
        const createIssueWithLabelResponse: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(OWNER, REPO, createIssueWithLabelData)

        issueUrl = createIssueResponse.data.html_url
        issueWithLabelUrl = createIssueWithLabelResponse.data.html_url

        const user: UserModel = createUserModel(userData)
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    describe('Positive cases', () => {
        it('Create issue and add label', async () => {
            const issuePage: IssuePage = new IssuePage(browser, issueUrl)
            await issuePage.open()

            await issuePage.addIssueLabel(labelId)

            const isLabelInIssue = await issuePage.isDisplayedIssueLabel(labelName)

            expect(isLabelInIssue).toEqual(true)
        })

        it('Create issue with label and remove label', async () => {
            const issuePage: IssuePage = new IssuePage(browser, issueWithLabelUrl)
            await issuePage.open()

            let isLabelInIssue = await issuePage.isDisplayedIssueLabel(labelName)

            expect(isLabelInIssue).toEqual(true)

            await issuePage.deleteIssueLabel(labelId)

            const isNoneLabels = await issuePage.isDisplayedIssueNoneLabels()

            expect(isNoneLabels).toEqual(true)
        })
    })

    after(async () => {
        await LabelCreateAPIService.deleteLabel(OWNER, REPO, issueLabelModel)
    })
})
