import { labelData } from "../data/label.issue.data"
import { GetLabelResponse, LabelCreateAPIService } from "../issueAPI/createLabel.ts/labelCreateAPIService"
import { createLabelModel, LabelModel } from "../model/label.issue.model"

const OWNER = 'popenovairina4'
const REPO = 'autotest-ips'

describe('Positive cases', () => {
    it('Create label', async () => {
        const response: GetLabelResponse = await LabelCreateAPIService.postCreateLabel()
        console.log(response.name)

        const label: LabelModel = createLabelModel(labelData)
    })
})


