import { userData } from "../../Users/data/user.data"
import { createUserModel } from "../../Users/model/user.model"
import { createUser, User } from "../../Users/model/usermodeltwo"
import { GetUserResponse, UserAPIService } from "../../Users/userAPI/UserAPIService"

describe('Test API', () => {
    it('', async () => {
        const response: GetUserResponse = await UserAPIService.getUser()
        console.log(response.company)

        const user: User = createUser(userData)

        const patchResponse: GetUserResponse = await UserAPIService.patchUser(user)
        console.log(patchResponse.company)
    })
})