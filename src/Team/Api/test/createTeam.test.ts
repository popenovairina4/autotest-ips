import { AxiosResponse } from "axios"
import { CreateTeamRequest } from "../../TeamAPIData"
import { TeamAPIProvider } from "../TeamAPIProvider"



const ORGANIZOTION_NAME = 'Mirraaa3456'

describe('Create team test', () => {
    it('team should be createDebuggerStatement, code is OK', async () => {
        const data: CreateTeamRequest = {
            name: 'Team one',
        }

        const teamAPIProvider: TeamAPIProvider = new TeamAPIProvider({
            isSuccessfulResponse: false,
        })

        const response: AxiosResponse = await teamAPIProvider.create(ORGANIZOTION_NAME, data)
        console.log(response.status, response.statusText, response.data)
        // const t = response.data.creates_at.match(\d\d\d\d -\d\d -\d\dT\d\d\: \d\d: \d\dZ)

        expect(response.status).toEqual(201)
        expect(response.data.name).toEqual(data.name)
        expect(response.data.description).toBeNull()
        expect(response.data.created_at.match).toBeDefined()
    })
})