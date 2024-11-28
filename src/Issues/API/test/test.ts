import { AxiosResponse } from "axios"
import { getRandomString } from "../../../test/lab 1/laboratory 8"
import { IssueAPIProvider } from "../Createissue/IssueAPIProvider"
import { CreateIssueResponse } from "../Createissue/issueAPIService"
import { CreateIssueRequest } from "../Createissue/IssueAPIData"

const OWNER = 'popenovairina4'
const REPO = 'autotest-ips'
const REPOWITHOUTISSUE = 'for-410'
const INVALIDREPO = '%###'

describe('Create issue test', () => {
    it('issue should be createDebuggerStatement, code is 201', async () => {
        const data: CreateIssueRequest = {
            title: getRandomString(10),
            repo: REPO,
            owner: OWNER
        }

        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider({
            isSuccessfulResponse: false,
        })

        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(OWNER, REPO, data)
        console.log(response.status, response.statusText, response.data)

        expect(response.status).toEqual(201)

        const listResponse: AxiosResponse<CreateIssueResponse[]> = await issueAPIProvider.getList(OWNER, REPO)

        const isIssueInList = listResponse.data.some(listIssue => listIssue.id === response.data.id)// listIssue аргумент стрелочной функции
        console.log(listResponse) // метод some() - позволяет узнать, есть ли в массиве хотя бы один элемент, удовлетворяющий условию в функции

        expect(isIssueInList).toEqual(true)
    })

    it('should return 422 error, code is Unprocessable Entity', async () => {
        const data: CreateIssueRequest = {
            title: getRandomString(0),
            repo: REPO,
            owner: OWNER
        }

        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider({
            isSuccessfulResponse: false,
        })

        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(OWNER, REPO, data)
        console.log(response.status, response.statusText, response.data)

        expect(response.status).toEqual(422)
    })

    it('should be 410, code is Gone', async () => {
        const data: CreateIssueRequest = {
            title: getRandomString(10),
            repo: REPOWITHOUTISSUE,
            owner: OWNER
        }

        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider({
            isSuccessfulResponse: false,
        })

        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(OWNER, REPOWITHOUTISSUE, data)
        console.log(response.status, response.statusText, response.data)

        expect(response.status).toEqual(410)
    })

    it('issue should be createDebuggerStatement, code is 400', async () => {
        const data: CreateIssueRequest = {
            title: getRandomString(10),
            repo: INVALIDREPO,
            owner: OWNER
        }

        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider({
            isSuccessfulResponse: false,
        })

        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(OWNER, INVALIDREPO, data)
        console.log(response.status, response.statusText, response.data)

        expect(response.status).toEqual(400)
    })
})