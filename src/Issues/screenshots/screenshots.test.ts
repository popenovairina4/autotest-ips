import { browser } from '@wdio/globals'
import { getRandomString } from "../../test/lab 1/laboratory 8"
import { CreateIssueRequest } from "../API/Createissue/IssueAPIData"
import { IssueAPIProvider } from "../API/Createissue/IssueAPIProvider"
import { CreateIssueResponse } from "../API/Createissue/issueAPIService"
import { AxiosResponse } from "axios"
import { images } from "../data/issues.data"
import VisualService from "@wdio/visual-service";
import { IssuePage } from "../page-object/editIssue/Issue.Page"
import { Result } from '@wdio/visual-service/dist/types'

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
        images.forEach(image => {
            it(`Скриншотные тесты для вставки картинки в задачу: ${image.name}`, async () => {
                const issuePage: IssuePage = new IssuePage(browser, issueUrl)
                await issuePage.open()

                const result: Result = await browser.checkFullPageScreen(`issue image ${image.name}`)
                console.log(result)
            })
        })
    })
})
