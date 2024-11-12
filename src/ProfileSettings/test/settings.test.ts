import { SettingsPage } from "../page-object/Settings.page"
import { MainSettings } from "../page-object/Main.settings"
import { updateSettings } from "../../secrets/settings"
import { createUserModel, UserModel } from "../../Users/model/user.model"
import { userData } from "../../Users/data/user.data"
import { LoginPage } from "../../Users/page-object/Login.page"
import { getRandomString } from "../../test/lab 1/laboratory 8"
import { ProfilePage } from "../page-object/Profile.Page"

describe('Profile form', () => {
    let settingsPage: SettingsPage
    let profilePage: ProfilePage
    let mainSettings: MainSettings
    let loginPage: LoginPage

    before(async () => {
        // await browser.pause(30000)
        const user: UserModel = createUserModel(userData)
        settingsPage = new SettingsPage(browser)
        mainSettings = new MainSettings(browser)
        profilePage = new ProfilePage(browser)
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    beforeEach(async () => {
        await settingsPage.open()
    })

    describe('Positive cases', () => {
        it('Correct Name', async () => {
            await settingsPage.setSettings({ ...updateSettings })

            await profilePage.open()

            const profileFullName = await profilePage.getFullNameText()

            expect(profileFullName).toEqual(updateSettings.name)
        })

        it('Correct Avatar', async () => {
            await settingsPage.uploadFile('/Users/irina/autotests/autotest-ips/src/Users/foto/пион.jpg')

            const isDisplayedElement: boolean = await mainSettings.isDisplayedCorrectAvatar()

            expect(isDisplayedElement).toEqual(true)
        })

        it('bio 100', async () => {
            const spacesbio = getRandomString(100)

            await settingsPage.setSettings({ ...updateSettings, bio: spacesbio })

            await profilePage.open()

            const profileBio = await profilePage.getBioText()

            expect(profileBio).toEqual(spacesbio)
        })
    })

    describe('Negative cases', () => {
        it('Long name', async () => {
            const longname = getRandomString(256)

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

// В тестах использовать  getRandomString для проверки валидации, где можно;
// Проверить создание Имени и Био на странице Profile, url аватрки проверить никак нельзя, т.к. он всегда одинаковый;
// Убрать ожидание браузера 3 миинуты