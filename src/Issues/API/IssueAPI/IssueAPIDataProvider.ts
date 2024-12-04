import {IssueModel} from '../../model/issue.model'

type CreateIssueRequestData = {
    title: string
    body?: string,
    labels?: string[],
}

class IssueAPIDataProvider {
    public static getIssueData(issue: IssueModel): CreateIssueRequestData { // в модель ишью добавить лдейблы[]
        return {
            body: issue.description,
            title: issue.title,
            labels: issue.labels,
        }
    }
}

export {
    CreateIssueRequestData,
    IssueAPIDataProvider,
}
