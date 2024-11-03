import { UserData } from "../data/user.data"

type User = {
    name: string,
    company: string
}

function createUser(data: UserData): User {
    return {
        name: 'Test',
        company: 'New Company'
    }
}

export {
    createUser,
    User
}