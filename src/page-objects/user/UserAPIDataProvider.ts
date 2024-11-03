import { User } from "../../Users/model/usermodeltwo";

type GetUserRequest = {
    name: string,
    company: string,
}

class UserAPIDataProvider {
    public getUserData(user: User): GetUserRequest {
        return {
            name: user.name,
            company: user.company
        }
    }
}
export {
    GetUserRequest
    UserAPIDataProvider
}