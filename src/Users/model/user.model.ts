import { UserData } from "../data/user.data"

type UserModel = {
    login: string,
    password: string
    name: string,
    company: string
}

function createUserModel(data: UserData): UserModel {
    return {
        login: data.email,
        password: data.password,
        name: data.name,
        company: data.company
    }
}

export {
    createUserModel,
    UserModel
}