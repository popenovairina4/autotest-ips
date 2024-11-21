import { labelData } from "../../data/label.issue.data"
import { GetLabelResponse, LabelCreateAPIService } from "../issueAPI/createLabel.ts/labelCreateAPIService"
import { createLabelModel, LabelModel } from "../../model/label.issue.model"
import { CreateIssueRequest } from "../Createissue/IssueAPIData"
import { getRandomString } from "../../../test/lab 1/laboratory 8"
import { IssueAPIProvider } from "../Createissue/IssueAPIProvider"
import { AxiosResponse } from "axios"
import { Issue } from "../Createissue/issueAPIService"
import { IssuePage } from "../../page-object/editIssue/Issue.Page"
import { LoginPage } from "../../../Users/page-object/Login.page"
import { createUserModel, UserModel } from "../../../Users/model/user.model"
import { userData } from "../../../Users/data/user.data"

const OWNER = 'popenovairina4'
const REPO = 'autotest-ips'

describe('Issue API test', () => {
    let issueAddedLabelModel: LabelModel = createLabelModel({ name: getRandomString(10) })
    let issueLabelModel: LabelModel = createLabelModel({ name: getRandomString(10) })
    let loginPage: LoginPage

    before(async () => {
        const user: UserModel = createUserModel(userData)
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)

    })

    describe('Positive cases', () => {
        it('Create issue and add label', async () => {
            const createLabelResponse: GetLabelResponse = await LabelCreateAPIService.createLabel(OWNER, REPO, issueAddedLabelModel)

            const data: CreateIssueRequest = {
                title: getRandomString(10),
                repo: REPO,
                owner: OWNER,
            }

            const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider({
                isSuccessfulResponse: false,
            })

            const createIssueResponse: AxiosResponse<Issue> = await issueAPIProvider.create(OWNER, REPO, data)

            const issuePage: IssuePage = new IssuePage(browser, createIssueResponse.data.html_url)
            await issuePage.open()

            await issuePage.addIssueLabel(createLabelResponse.id)

            const isLabelInIssue = await issuePage.isDisplayedIssueLabel(createLabelResponse.name)

            expect(createLabelResponse.name).toEqual(issueAddedLabelModel.name)
            expect(createIssueResponse.status).toEqual(201)
            expect(isLabelInIssue).toEqual(true)
        })

        it('Create issue with label and remove label', async () => {
            const createLabelResponse: GetLabelResponse = await LabelCreateAPIService.createLabel(OWNER, REPO, issueLabelModel)

            const data: CreateIssueRequest = {
                title: getRandomString(10),
                labels: [
                    createLabelResponse.name,
                ],
                repo: REPO,
                owner: OWNER,
            }

            const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider({
                isSuccessfulResponse: false,
            })

            const createIssueResponse: AxiosResponse<Issue> = await issueAPIProvider.create(OWNER, REPO, data)

            const issuePage: IssuePage = new IssuePage(browser, createIssueResponse.data.html_url)
            await issuePage.open()

            let isLabelInIssue = await issuePage.isDisplayedIssueLabel(createLabelResponse.name)

            expect(isLabelInIssue).toEqual(true)

            await issuePage.deleteIssueLabel(createLabelResponse.id)

            const isNoneLabels = await issuePage.isDisplayedIssueNoneLabels()

            expect(createLabelResponse.name).toEqual(issueLabelModel.name)
            expect(createIssueResponse.status).toEqual(201)
            expect(isNoneLabels).toEqual(true)
        })
    })


    after(async () => {
        await LabelCreateAPIService.deleteLabel(OWNER, REPO, issueAddedLabelModel)
    })
})
