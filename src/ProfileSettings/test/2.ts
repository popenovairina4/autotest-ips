import { SettingsPage } from "../page-object/Settings.page"
import { logIn } from "../../Users/page-object/login"
import { MainSettings } from "../page-object/Main.settings"
import { updateSettings } from "../../secrets/settings"

describe('Profile form', () => {
    let settingsPage: SettingsPage
    let mainSettings: MainSettings

    before(async () => {
        // await browser.pause(30000)
        await logIn()
    })

    beforeEach(async () => {
        settingsPage = new SettingsPage(browser)
        await settingsPage.open()
        mainSettings = new MainSettings(browser)
    })

    describe('Positive cases', () => {
        it('Correct Name', async () => {
            await settingsPage.setSettings(updateSettings)

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Correct Avatar', async () => {
            await settingsPage.uploadFile('/Users/irina/autotests/autotest-ips/src/foto/пион.jpg')

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainSettings.isDisplayedCorrectAvatar()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Spaces in bio', async () => {
            const spacesbio = '   '
            await settingsPage.setSettings({ ...updateSettings, bio: spacesbio })

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings() //correctSavedSettingsPopup

            expect(isDisplayedElement).toEqual(true)
        })
    })

    describe('Negative cases', () => {
        it('Incorrect Name', async () => {
            const longname = 'hjnbhg hjhhjnbhg hjhhjnbhg hjhhjnbhg hjhhjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hjnbhg hjh"hg'

            await settingsPage.setSettings({ ...updateSettings, name: longname })

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainSettings.isDisplayedError()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Long bio', async () => {
            const longbio = 'nhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjugnhjk hnjug   jk'

            await settingsPage.setSettings({ ...updateSettings, bio: longbio })

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Spaces in Name', async () => {
            const spacesname = '  '

            await settingsPage.setSettings({ ...updateSettings, name: spacesname })

            await browser.pause(3000)

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings()

            expect(isDisplayedElement).toEqual(true)
        })
    })

})