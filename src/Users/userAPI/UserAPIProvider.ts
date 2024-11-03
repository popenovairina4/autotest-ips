import { AxiosRequestConfig, AxiosResponse } from "axios"
import { GitAPIProvider } from "../../common/Api/GitAPIProvider"
import { PatchUserRequest } from "./UserAPIDataProvider"

class UserAPIProvider extends GitAPIProvider {
    public getUser<T>(): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            '/user',
            'GET'
        )
        return this.sendRequest(config)
    }
    public patchUser<T>(data: PatchUserRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            '/user',
            'PATCH',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }
}

export {
    UserAPIProvider
}