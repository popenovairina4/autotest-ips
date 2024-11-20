import { getRandomString } from "../../test/lab 1/laboratory 8"
import { IssueData } from "../data/issues.data"

type IssueModel = {
    title: string,
    description: string,
    comment: string,
    url: string
}

function createIssueModel(data?: Partial<IssueData>): IssueModel { //изменить тип передаваемого значения (было IssueModel)
    return {
        title: data?.title ?? getRandomString(),
        description: data?.description ?? getRandomString(),
        comment: data?.comment ?? getRandomString(),
        url: data?.url ?? '',
    }
}

export {
    createIssueModel,
    IssueModel
}