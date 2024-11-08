import { AxiosRequestConfig, AxiosResponse } from "axios";
import { GitAPIProvider } from "../../common/Api/GitAPIProvider";
import { CreateTeamRequest } from "../TeamAPIData";

class TeamAPIProvider extends GitAPIProvider {
    public create<T>(organisation: string, data: CreateTeamRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configurateRequest(
            `/orgs/${organisation}/teams`,
            'POST',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }
}

export {
    TeamAPIProvider
}