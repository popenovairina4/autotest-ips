import { AxiosResponse } from "axios"
import { LabelModel } from "../../model/label.issue.model"
import { LabelAPIProvider } from "./labelAPIProvider"
import { LabelAPIDataProvider, PostLabelRequest } from "./labelAPIDataProvider"

type GetLabelResponse = {
    name: string,
}

class LabelCreateAPIService {
    public static async postCreateLabel(label: LabelModel): Promise<GetLabelResponse> {
        //const data: PostLabelRequest = LabelAPIDataProvider.getLabelData(label)
        const labelAPIProvider: LabelAPIProvider = new LabelAPIProvider()
        const response: AxiosResponse<GetLabelResponse> = await labelAPIProvider.postCreateLabel.postCreateLabel()
        return response.data
    }
}

export {
    GetLabelResponse,
    LabelCreateAPIService
}