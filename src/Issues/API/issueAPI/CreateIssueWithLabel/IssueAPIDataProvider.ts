import { LabelModel } from "../../model/label.issue.model"

type CreateIssueRequest = {
    name: string,
    description: string,
    title: string
}

class IssueAPIDataProvider {
    public static getIssueData(issue: LabelModel): CreateIssueRequest { // в модель ишью добавить лдейблы[]
        return {
            name: issue.name,
            description: issue.description,
            title: issue.title,
        }
    }
}
export {
    CreateIssueRequest,
    IssueAPIDataProvider,
}