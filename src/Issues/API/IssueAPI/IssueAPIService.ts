import {AxiosResponse} from "axios"
import {CreateIssueRequestData, IssueAPIDataProvider} from './IssueAPIDataProvider'
import {IssueAPIProvider} from './IssueAPIProvider'
import {IssueModel} from '../../model/issue.model'

type CreateIssueResponse = {
    id: number,
    number: number,
    labels: IssueLabel[],
    node_id: string,
    name: string,
    description: string,
    html_url: string,
}

type IssueLabel = {
    id: number,
    url: string,
    name: string,
}


class IssueAPIService {
    public static async createIssue(owner: string, repo: string, issue: IssueModel): Promise<CreateIssueResponse> {
        const data: CreateIssueRequestData = IssueAPIDataProvider.getIssueData(issue)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(owner, repo, data)
        return response.data
    }
}


export {
    CreateIssueResponse,
    IssueAPIService,
    IssueLabel,
}
