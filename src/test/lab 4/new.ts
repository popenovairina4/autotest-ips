import { MainSettings } from "../../ProfileSettings/page-objects/Main.settings"
import { updateSettings } from "../../secrets/settings"
import { SettingsPage } from "../../ProfileSettings/page-objects/Settings.page"
import { MainNegativeSettings } from "../../ProfileSettings/page-objects/Main.negative.settings"
import { logIn } from "../../Users/page-object/login"
import { UploadFile } from "../../Settings/page-object/UploadFile"
import { CorrectAvatar } from "../../ProfileSettings/page-objects/Correctavatar"

describe('Profile form', () => {
    let settingsPage: SettingsPage
    let mainSettings: MainSettings
    let mainNegativeSettings: MainNegativeSettings
    let uploadFile: UploadFile
    let correctAvatar: CorrectAvatar


    beforeEach(async () => {
        await logIn()
        // await browser.pause(30000)
        settingsPage = new SettingsPage(browser)
        await settingsPage.open()
        mainSettings = new MainSettings(browser)
        mainNegativeSettings = new MainNegativeSettings(browser)
        uploadFile = new UploadFile(browser)
        correctAvatar = new CorrectAvatar(browser)
    })

    it('Spaces in Name', async () => {
        const spacesname = '  '

        await settingsPage.settings({ ...updateSettings, name: spacesname })

        await browser.pause(3000)

        const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings()

        expect(isDisplayedElement).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})