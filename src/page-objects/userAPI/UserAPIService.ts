import { AxiosRequestConfig, AxiosResponse } from "axios"
import { User } from "../../Users/model/usermodeltwo"
import { PatchUserRequest, UserAPIDataProvider } from "./UserAPIDataProvider"
import { UserAPIProvider } from "./UserAPIProvider"

type GetUserResponse = {
    name: string,
    company: string,
    email: string
}

class UserAPIService {
    public static async getUser(): Promise<GetUserResponse> {
        const userAPIProvider: UserAPIProvider = new UserAPIProvider()
        const response: AxiosResponse<GetUserResponse> = await userAPIProvider.getUser()
        return response.data
    }

    public static async patchUser(user: User): Promise<GetUserResponse> {
        const data: PatchUserRequest = UserAPIDataProvider.getUserData(user)
        const userAPIProvider: UserAPIProvider = new UserAPIProvider()
        const response: AxiosResponse<GetUserResponse> = await userAPIProvider.patchUser(data)
        return response.data
    }
}

export {
    GetUserResponse,
    UserAPIService,

}