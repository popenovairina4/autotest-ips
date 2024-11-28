import { getRandomString } from "../../../test/lab 1/laboratory 8"
import { LabelData } from "../../data/label.issue.data"

type LabelModel = {
    name: string,
    description: string,
    title: string
}

function createLabelModel(data?: Partial<LabelData>): LabelModel {
    return {
        name: data?.name ?? getRandomString(),
        description: getRandomString(),
        title: getRandomString(),

    }
}

export {
    LabelModel,
    createLabelModel
}