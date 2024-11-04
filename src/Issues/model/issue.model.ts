import { getRandomString } from "../../test/lab 1. /laboratory 8"

type IssueModel = {
    title: string,
    description: string,
}

function createIssueModel(data?: Partial<IssueModel>): IssueModel {
    return {
        title: data?.title ?? getRandomString(),
        description: data?.description ?? getRandomString()
    }
}

export {
    createIssueModel,
    IssueModel
}