import { LabelModel } from "../../model/label.issue.model"

type PostLabelRequest = {
    name: string
}

class LabelAPIDataProvider {
    public static getLabelData(label: LabelModel): PostLabelRequest {
        return {
            name: label.name
        }
    }
}

export {
    PostLabelRequest,
    LabelAPIDataProvider,
}