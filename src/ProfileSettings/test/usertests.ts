

import { updateSettings } from "../../../secrets/settings"
import { SettingsPage } from "../../ProfileSettings/page-objects/Settings.page"
import { MainNegativeSettings } from "../../ProfileSettings/page-objects/Main.negative.settings"
import { logIn } from "../../../Users/page-object/login"
import { UploadFile } from "../../../Settings/page-object/UploadFile"
import { CorrectAvatar } from "../../ProfileSettings/page-objects/Correctavatar"
import { MainSettings } from "../page-object/Main.settings"

describe('Profile form', () => {
    let settingsPage: SettingsPage
    let mainSettings: MainSettings
    let mainNegativeSettings: MainNegativeSettings
    let uploadFile: UploadFile
    let correctAvatar: CorrectAvatar

    before(async () => {
        // await browser.pause(30000)
        await logIn()
    })

    beforeEach(async () => {
        settingsPage = new SettingsPage(browser)
        await settingsPage.open()
        mainSettings = new MainSettings(browser)
        mainNegativeSettings = new MainNegativeSettings(browser)
        uploadFile = new UploadFile(browser)
        correctAvatar = new CorrectAvatar(browser) //впихнуть все в один page.object
    })

    describe('Profile form', () => {
        it('Correct Name', async () => {
            await settingsPage.settings(updateSettings)

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Incorrect Name', async () => {
            const longname = 'hjnbhg hjhhjnbhg hjhhjnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hg'

            await settingsPage.settings({ ...updateSettings, name: longname })

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainNegativeSettings.isDisplayedUserLogin()

            expect(isDisplayedElement).toEqual(true)
        })
    })

    describe('Profile form', () => {
        it('Long bio', async () => {
            const longbio = 'nhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjug   jk'

            await settingsPage.settings({ ...updateSettings, bio: longbio })

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Correct Avatar', async () => {
            await uploadFile.uploadFile('/Users/irina/autotests/autotest-ips/src/foto/пион.jpg')

            await browser.pause(3000)

            const isDisplayedElement: boolean = await correctAvatar.isDisplayedCorrectAvatar()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Spaces in Name', async () => {
            const spacesname = '  '

            await settingsPage.settings({ ...updateSettings, name: spacesname })

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Spaces in bio', async () => {
            const spacesbio = '   '
            await settingsPage.settings({ ...updateSettings, bio: spacesbio })

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings() //correctSavedSettingsPopup

            expect(isDisplayedElement).toEqual(true)
        })
    })

})