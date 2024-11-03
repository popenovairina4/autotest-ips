import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, Method } from 'axios'
import { token } from "../../secrets/token"


class GitAPIProvider {
    protected headers: AxiosRequestHeaders
    protected personalToken = token

    constructor() {
        this.headers = {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${this.personalToken}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }

    protected configurateRequest(
        url: string,
        method: Method,
        data?: string | FormData,
    ): AxiosRequestConfig {
        return {
            url: `https://api.github.com${url}`,
            method,
            headers: this.headers,
            data,
        }
    }

    protected sendRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return axios(config)
    }
}

export {
    GitAPIProvider
}