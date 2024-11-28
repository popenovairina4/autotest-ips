import { AxiosRequestConfig, AxiosResponse } from "axios";
import { GitAPIProvider } from "../../../common/Api/GitAPIProvider";
import { CreateIssueRequest } from "./IssueAPIData";

class IssueAPIProvider extends GitAPIProvider {
    public create<T>(owner: string, repo: string, data: CreateIssueRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            `/repos/${owner}/${repo}/issues`,
            'POST',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }

    public getIssue<T>(owner: string, repo: string, issueNumber: number): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            `/repos/${owner}/${repo}/issues/${issueNumber}`,
            'GET',
        )
        return this.sendRequest(config)
    }

    public getList<T>(owner: string, repo: string): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            `/repos/${owner}/${repo}/issues`,
            'GET',
        )
        return this.sendRequest(config)
    }

    public deleteIssue<T>(owner: string, repo: string, issue_number: string): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            `/repos/${owner}/${repo}/issues/${issue_number}/`,
            'DELETE',
        )
        return this.sendRequest(config)
    }
}
export {
    IssueAPIProvider
}