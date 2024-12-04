import {AxiosRequestConfig, AxiosResponse} from "axios"
import {GitAPIProvider} from "../../../common/Api/GitAPIProvider"
import {LabelRequest} from "./LabelAPIDataProvider"


class LabelAPIProvider extends GitAPIProvider {
    public createLabel<T>(owner: string, repo: string, data: LabelRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            `/repos/${owner}/${repo}/labels`,
            'POST',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }

    public deleteLabel<T>(owner: string, repo: string, data: LabelRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            `/repos/${owner}/${repo}/labels/${data.name}`,
            'DELETE',
        )
        return this.sendRequest(config)
    }
}

export {
    LabelAPIProvider,
}