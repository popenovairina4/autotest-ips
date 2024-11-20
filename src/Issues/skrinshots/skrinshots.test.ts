import { getRandomString } from "../../test/lab 1/laboratory 8"
import { CreateIssueRequest } from "../API/Createissue/IssueAPIData"
import { IssueAPIProvider } from "../API/Createissue/IssueAPIProvider"
import { Issue } from "../API/Createissue/issueAPIServise"
import { AxiosResponse } from "axios"

const OWNER = 'popenovairina4'
const REPO = 'autotest-ips'

const images: string[] = [
    '/Users/irina/autotests/autotest-ips/src/common/foto/пион.jpg',
    '/Users/irina/autotests/autotest-ips/src/common/foto/bird.jpg',
    '/Users/irina/autotests/autotest-ips/src/common/foto/ромашка.jpg',
]

it('Скриншотные тесты для вставки картинки в задачу', async () => {
    const data: CreateIssueRequest = {
        title: getRandomString(10),
        repo: REPO,
        owner: OWNER
    }

    const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider({
        isSuccessfulResponse: false,
    })

    const response: AxiosResponse<Issue> = await issueAPIProvider.create(OWNER, REPO, data)
    console.log(response.status, response.statusText, response.data)

})
