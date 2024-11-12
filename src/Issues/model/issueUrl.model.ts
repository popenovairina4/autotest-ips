type IssueUrlModel = {
    url: string
}

function createIssueUrlModel(data?: { url?: string }): IssueUrlModel {
    return {
        url: data?.url ?? ''
    }
}

export {
    createIssueUrlModel,
    IssueUrlModel
}