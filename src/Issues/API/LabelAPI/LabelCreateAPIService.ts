import {AxiosResponse} from "axios"
import {LabelModel} from "../model/label.issue.model"
import {LabelAPIDataProvider, LabelRequest} from "./LabelAPIDataProvider"
import {LabelAPIProvider} from "./LabelAPIProvider"

type LabelResponse = {
    name: string,
    id: number,
}

class LabelCreateAPIService {
    public static async createLabel(owner: string, repo: string, labelModel: LabelModel): Promise<LabelResponse> {
        const data: LabelRequest = LabelAPIDataProvider.getLabelData(labelModel)
        const labelAPIProvider: LabelAPIProvider = new LabelAPIProvider()
        const response: AxiosResponse<LabelResponse> = await labelAPIProvider.createLabel(owner, repo, data)
        return response.data
    }

    public static async deleteLabel(owner: string, repo: string, labelModel: LabelModel): Promise<void> {
        const data: LabelRequest = LabelAPIDataProvider.getLabelData(labelModel)
        const labelAPIProvider: LabelAPIProvider = new LabelAPIProvider()
        await labelAPIProvider.deleteLabel(owner, repo, data)
    }
}

export {
    LabelResponse,
    LabelCreateAPIService,
}