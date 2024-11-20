import { AxiosResponse } from "axios"
import { IssueAPIProvider } from "./IssueAPIProvider"
import { IssueAPIDataProvider, PostIssueRequest } from "./IssueAPIDataProvider"
import { LabelModel } from "../../model/label.issue.model"

type PostCreateIssueResponse = {
    node_id: string,
    name: string,
    description: string,
}

class IssueAPIService {
    public static async postCreateLabel(issue: LabelModel): Promise<PostCreateIssueResponse> {
        const data: PostIssueRequest = IssueAPIDataProvider.getIssueData(issue)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        const response: AxiosResponse<PostCreateIssueResponse> = await issueAPIProvider.postCreateIssue(data)
        return response.data
    }
}

export {
    PostCreateIssueResponse,
    IssueAPIService
}