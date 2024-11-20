import { LabelModel } from "../../model/label.issue.model"

type PostIssueRequest = {
    name: string,
    description: string,
    title: string
}

class IssueAPIDataProvider {
    public static getIssueData(issue: LabelModel): PostIssueRequest {
        return {
            name: issue.name,
            description: issue.description,
            title: issue.title,
        }
    }
}
export {
    PostIssueRequest,
    IssueAPIDataProvider,
}