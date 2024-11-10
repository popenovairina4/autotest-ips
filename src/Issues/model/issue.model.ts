import { getRandomString } from "../../test/lab 1/laboratory 8"
import { IssueData } from "../data/issues.data"

type IssueModel = {
    title: string,
    description: string,
    url: string
}

function createIssueModel(data?: Partial<IssueData>): IssueModel { //изменить тип передаваемого значения
    return {
        title: data?.title ?? getRandomString(),
        description: data?.description ?? getRandomString(),
        url: data?.url ?? getRandomString()
    }
}

export {
    createIssueModel,
    IssueModel
}