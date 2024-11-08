import { SettingsPage } from "../page-object/Settings.page"
import { MainSettings } from "../page-object/Main.settings"
import { updateSettings } from "../../secrets/settings"
import { createUserModel, UserModel } from "../../Users/model/user.model"
import { userData } from "../../Users/data/user.data"
import { LoginPage } from "../../Users/page-object/Login.page"
import { getRandomString } from "../../test/lab 1/laboratory 8"

describe('Profile form', () => {
    let settingsPage: SettingsPage
    let mainSettings: MainSettings
    let loginPage: LoginPage

    before(async () => {
        // await browser.pause(30000)
        const user: UserModel = createUserModel(userData)
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    beforeEach(async () => {
        settingsPage = new SettingsPage(browser)
        await settingsPage.open()
        mainSettings = new MainSettings(browser)
    })

    describe('Positive cases', () => {
        it('Correct Name', async () => {
            await settingsPage.setSettings({ ...updateSettings })

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Correct Avatar', async () => {
            await settingsPage.uploadFile('/Users/irina/autotests/autotest-ips/src/foto/пион.jpg')

            const isDisplayedElement: boolean = await mainSettings.isDisplayedCorrectAvatar()

            expect(isDisplayedElement).toEqual(true)
        })

        it.only('bio 255', async () => {
            const spacesbio = getRandomString(255) //использовать getRandomString, //255

            await settingsPage.setSettings({ ...updateSettings, bio: spacesbio })

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings()

            expect(isDisplayedElement).toEqual(true)
        })
    })

    describe('Negative cases', () => {
        it('Long name', async () => {
            const longname = getRandomString(256) // использовать getRandomString, конкретно 256

            await settingsPage.setSettings({ ...updateSettings, name: longname })

            const isDisplayedElement: boolean = await mainSettings.isDisplayedError()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Long bio', async () => {
            const longbio = getRandomString(300)

            await settingsPage.setSettings({ ...updateSettings, bio: longbio })

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Spaces in Name', async () => {
            const spacesname = '  '

            await settingsPage.setSettings({ ...updateSettings, name: spacesname })

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings()

            expect(isDisplayedElement).toEqual(true)
        })
    })

})