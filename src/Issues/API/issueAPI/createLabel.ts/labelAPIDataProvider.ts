import { LabelModel } from "../../model/label.issue.model"

type LabelRequest = {
    name: string
}

class LabelAPIDataProvider {
    public static getLabelData(label: LabelModel): LabelRequest {
        return {
            name: label.name
        }
    }
}

export {
    LabelRequest,
    LabelAPIDataProvider,
}