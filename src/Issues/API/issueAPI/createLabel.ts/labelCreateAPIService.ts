import { AxiosResponse } from "axios"
import { LabelModel } from "../../../model/label.issue.model"
import { LabelAPIProvider } from "./labelAPIProvider"
import { LabelAPIDataProvider, PostLabelRequest } from "./labelAPIDataProvider"

type GetLabelResponse = {
    name: string,
    id: number,
}

type DeleteLabelResponse = {

}

class LabelCreateAPIService {
    public static async createLabel(owner: string, repo: string, labelModel: LabelModel): Promise<GetLabelResponse> {
        const data: PostLabelRequest = LabelAPIDataProvider.getLabelData(labelModel)
        const labelAPIProvider: LabelAPIProvider = new LabelAPIProvider()
        const response: AxiosResponse<GetLabelResponse> = await labelAPIProvider.createLabel(owner, repo, data)
        return response.data
    }

    public static async deleteLabel(owner: string, repo: string, labelModel: LabelModel): Promise<DeleteLabelResponse> {
        const data: PostLabelRequest = LabelAPIDataProvider.getLabelData(labelModel)
        const labelAPIProvider: LabelAPIProvider = new LabelAPIProvider()
        const response: AxiosResponse<GetLabelResponse> = await labelAPIProvider.deleteLabel(owner, repo, data)
        return response.data
    }
}

export {
    GetLabelResponse,
    LabelCreateAPIService
}