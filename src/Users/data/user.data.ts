import { auth } from "../../secrets/passwords"

type UserData = {
    email: string,
    password: string,
    name: string,
    company: string
}

const userData: UserData = {
    email: auth.login,
    password: auth.password,
    name: 'Fine',
    company: 'Lena'
}

export {
    UserData,
    userData
}