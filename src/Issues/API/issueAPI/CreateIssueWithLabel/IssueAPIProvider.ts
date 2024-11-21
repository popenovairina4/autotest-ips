import { GitAPIProvider } from "../../../../common/Api/GitAPIProvider"
import { AxiosRequestConfig, AxiosResponse } from "axios"
import { PostIssueRequest } from "./IssueAPIDataProvider"


class IssueAPIProvider extends GitAPIProvider {
    public postCreateLabel<T>(data: PostIssueRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            '/repos/${owner}/${repo}/labels',
            'POST',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }

    public postCreateIssue<T>(data: PostIssueRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            '/repos/${owner}/${repo}/issues',
            'POST',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }

    public deleteDeleteLabel<T>(): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            '/repos/${owner}/${repo}/labels/${name}',
            'DELETE'
        )
        return this.sendRequest(config)
    }
}

export {
    IssueAPIProvider
}