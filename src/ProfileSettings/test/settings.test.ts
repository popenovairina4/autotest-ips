import { createUserModel, UserModel } from "../../Users/model/user.model"
import { ProfilePage } from "../page-object/profile/Profile.page"
import { MainSettings } from "../page-object/settings/Main.page.settings"
import { updateSettings } from "../../secrets/settings"
import { SettingsPage } from "../page-object/settings/Settings.page"
import { userData } from "../../Users/data/user.data"
import { getRandomString } from "../../common/getRandomString"
import { LoginPage } from "../../Users/page-object/Login.page"


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
        it('Вбить валидное имя в поле name', async () => {
            await settingsPage.setSettings({ ...updateSettings })

            await profilePage.open()

            const profileFullName = await profilePage.getFullNameText()

            expect(profileFullName).toEqual(updateSettings.name)
        })

        it.skip('Загрузка аватарки', async () => {
            await settingsPage.uploadFile('/Users/irina/autotests/autotest-ips/src/common/foto/пион.jpg')// перенести в common

            const isDisplayedElement: boolean = await mainSettings.isDisplayedCorrectAvatar()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Вбить в поле bio валидное количество символов, не больше 255', async () => { // переименовть
            const bio = getRandomString(100) // переименовать переменную

            await settingsPage.setSettings({ ...updateSettings, bio: bio })

            await profilePage.open()

            const profileBio = await profilePage.getBioText()

            expect(profileBio).toEqual(bio)
        })
    })

    describe('Negative cases', () => {
        it('Ошибка, если вбить невалидное количество символов', async () => { // говорящее имя
            const longname = getRandomString(256)

            await settingsPage.setSettings({ ...updateSettings, name: longname })

            const isDisplayedElement: boolean = await mainSettings.isDisplayedError()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Ошибка, если вбить невалидное колиство сиволов в поле bio', async () => {
            const longbio = getRandomString(300)

            await settingsPage.setSettings({ ...updateSettings, bio: longbio })

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings()

            expect(isDisplayedElement).toEqual(true)
        })

        it('Ошибка, если вбить в поле name только пробелы', async () => {
            const name = '  '

            await settingsPage.setSettings({ ...updateSettings, name: name })

            const isDisplayedElement: boolean = await mainSettings.isDisplayedMainSettings()

            expect(isDisplayedElement).toEqual(true)
        })
    })
})
