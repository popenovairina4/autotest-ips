import { UserData, userData } from "../../Users/data/user.data"
import { createUserModel, UserModel } from "../../Users/model/user.model"
import { GetUserResponse, UserAPIService } from "../../Users/userAPI/UserAPIService"

describe('Test API', () => {
    it('', async () => {
        const response: GetUserResponse = await UserAPIService.getUser()
        console.log(response.company)

        const user: UserModel = createUserModel(userData)

        const patchResponse: GetUserResponse = await UserAPIService.patchUser(user)
        console.log(patchResponse.company)
    })
})