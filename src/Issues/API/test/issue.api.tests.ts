import { createLabelModel, LabelModel } from "../model/label.issue.model"
import { getRandomString } from "../../../common/getRandomString"
import { IssuePage } from "../../page-object/editIssue/Issue.Page"
import { LoginPage } from "../../../Users/page-object/Login.page"
import { createUserModel, UserModel } from "../../../Users/model/user.model"
import { userData } from "../../../Users/data/user.data"
import { LabelCreateAPIService, LabelResponse } from "../LabelAPI/LabelCreateAPIService"
import { CreateIssueResponse, IssueAPIService } from '../IssueAPI/IssueAPIService'
import { createIssueModel, IssueModel } from '../../model/issue.model'
import { Reporter } from '../../../common/reporter/Reporter'

const OWNER = 'popenovairina4'
const REPO = 'autotest-ips'

describe('Issue API test', () => {
    let issueUrl: string
    let issueWithLabelUrl: string
    let labelId: number
    let labelName: string
    let issueLabelModel: LabelModel = createLabelModel({ name: getRandomString(10) })
    let issueModel: IssueModel = createIssueModel({ title: getRandomString(10) })
    let loginPage: LoginPage

    before(async () => {
        const labelResponse: LabelResponse = await LabelCreateAPIService.createLabel(OWNER, REPO, issueLabelModel)
        labelId = labelResponse.id
        labelName = labelResponse.name

        const issueWithLabelModel: IssueModel = createIssueModel({
            title: getRandomString(10),
            labels: [
                labelResponse.name,
            ],
        })

        const createIssueResponse: CreateIssueResponse = await IssueAPIService.createIssue(OWNER, REPO, issueModel)//в сервис
        const createIssueWithLabelResponse: CreateIssueResponse = await IssueAPIService.createIssue(OWNER, REPO, issueWithLabelModel)

        issueUrl = createIssueResponse.html_url
        issueWithLabelUrl = createIssueWithLabelResponse.html_url

        const user: UserModel = createUserModel(userData)
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    describe('Positive cases', () => {
        it('Create issue and add label', async () => {
            const issuePage: IssuePage = new IssuePage(browser, issueUrl)
            Reporter.addStep('Open issue page')
            await issuePage.open()

            Reporter.addStep('Add Issue Label')
            await issuePage.addIssueLabel(labelId)

            Reporter.addStep('Check if Label in issue')
            const isLabelInIssue = await issuePage.isDisplayedIssueLabel(labelName)  //х пасс с лейблом (пасс итак ведет в лейбл)

            expect(isLabelInIssue).toEqual(true)
        })

        it('Create issue with label and remove label', async () => {
            const issuePage: IssuePage = new IssuePage(browser, issueWithLabelUrl)
            await issuePage.open()

            await issuePage.deleteIssueLabel(labelId)

            const isNoneLabels = await issuePage.isDisplayedIssueNoneLabels()

            expect(isNoneLabels).toEqual(true)
        })
    })

    after(async () => {
        await LabelCreateAPIService.deleteLabel(OWNER, REPO, issueLabelModel)
    })
})
