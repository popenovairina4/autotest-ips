import { AxiosRequestConfig, AxiosResponse } from "axios";
import { GitAPIProvider } from "../../../common/Api/GitAPIProvider";
import { CreateIssueRequest } from "./IssueAPIData";
import { Issue } from "./issueAPIServise";

class IssueAPIProvider extends GitAPIProvider {
    public create(owner: string, repo: string, data: CreateIssueRequest): Promise<AxiosResponse<Issue>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            `/repos/${owner}/${repo}/issues`,
            'POST',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }

    public getList(owner: string, repo: string): Promise<AxiosResponse<Issue[]>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            `/repos/${owner}/${repo}/issues`,
            'GET',
        )
        return this.sendRequest(config)
    }

    public deleteIssue(owner: string, repo: string, issue_number: string): Promise<AxiosResponse<Issue[]>> {
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