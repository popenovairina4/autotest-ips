import { AxiosRequestConfig, AxiosResponse } from "axios"
import { GitAPIProvider } from "../../../../common/Api/GitAPIProvider"
import { PostLabelRequest } from "./labelAPIDataProvider"

class LabelAPIProvider extends GitAPIProvider {
    public createLabel<T>(owner: string, repo: string, data: PostLabelRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            `/repos/${owner}/${repo}/labels`,
            'POST',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }

    public deleteLabel<T>(owner: string, repo: string, data: PostLabelRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            `/repos/${owner}/${repo}/labels/${data.name}`,
            'DELETE',
        )
        return this.sendRequest(config)
    }
}

export {
    LabelAPIProvider
}