import { AxiosRequestConfig, AxiosResponse } from "axios"
import { GitAPIProvider } from "../../../common/Api/GitAPIProvider"
import { PostLabelRequest } from "./labelAPIDataProvider"


class LabelAPIProvider extends GitAPIProvider {
    public postCreateLabel<T>(): Promise<AxiosResponse<T>> {   //(data: PostLabelRequest)
        const config: AxiosRequestConfig = this.configurateRequest(
            '/repos/${owner}/${repo}/labels',
            'POST',
            //JSON.stringify(data),
        )
        return this.sendRequest(config)
    }

    public deleteLabel<T>(data: PostLabelRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            '/repos/${owner}/${repo}/labels/${name}',
            'DELETE',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }
}

export {
    LabelAPIProvider
}