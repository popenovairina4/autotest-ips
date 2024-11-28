import { getRandomString } from "../../test/lab 1/laboratory 8"
import { CreateIssueRequest } from "../API/Createissue/IssueAPIData"
import { IssueAPIProvider } from "../API/Createissue/IssueAPIProvider"
import { CreateIssueResponse } from "../API/Createissue/issueAPIService"
import { AxiosResponse } from "axios"
import { imagePath } from "../data/issues.data"
import VisualService from "@wdio/visual-service";
import { IssuePage } from "../page-object/editIssue/Issue.Page"

const OWNER = 'popenovairina4'
const REPO = 'autotest-ips'


describe('picture test', () => {
    let issueUrl: string
    let issueAPIProvider: IssueAPIProvider

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
    })


    describe('upload picture', () => {
        imagePath.forEach(imagePath => {
            it(`Скриншотные тесты для вставки картинки в задачу: ${imagePath}`, async () => {
                const issuePage: IssuePage = new IssuePage(browser, issueUrl)
                await issuePage.open()

                const result = await browser.checkFullPageScreen('name')
                console.log(111, result)
            })
        })
    })
})
