import { GitAPIProvider } from "../../../../common/Api/GitAPIProvider"
import { AxiosRequestConfig, AxiosResponse } from "axios"
import { CreateIssueRequest } from "./IssueAPIDataProvider"


class IssueAPIProvider extends GitAPIProvider {
    public createLabel<T>(data: CreateIssueRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            '/repos/${owner}/${repo}/labels',
            'POST',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }

    public createIssue<T>(data: CreateIssueRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            '/repos/${owner}/${repo}/issues',
            'POST',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }

    public deleteLabel<T>(): Promise<AxiosResponse<T>> {
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