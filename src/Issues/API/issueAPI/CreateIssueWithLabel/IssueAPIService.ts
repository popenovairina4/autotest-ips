import { AxiosResponse } from "axios"
import { IssueAPIProvider } from "./IssueAPIProvider"
import { LabelModel } from "../../model/label.issue.model"
import { CreateIssueRequest, IssueAPIDataProvider } from "./IssueAPIDataProvider"

type CreateIssueResponse = {
    node_id: string,
    name: string,
    description: string,
}

class IssueAPIService {
    public static async postCreateLabel(issue: LabelModel): Promise<CreateIssueResponse> {
        const data: CreateIssueRequest = IssueAPIDataProvider.getIssueData(issue)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(data)
        return response.data
    }
}

export {
    CreateIssueResponse,
    IssueAPIService
}