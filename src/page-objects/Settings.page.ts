import { ChainablePromiseElement } from 'webdriverio'
import { SettingsObject } from './Settings.object'


class SettingsPage extends SettingsObject {

    private getNameField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_name"]')
    }

    private getEmailField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_email"]')
    }

    private getBioField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_bio"]')
    }

    private getPronounsField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns_select"]')
    }

    private getAvatarField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="settings-frame"]/div[2]/div[2]/dl/dd/div/details/summary/img')
    }

    private getUpdateButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="edit_user_183081302"]/div/p[2]/button')
    }

    public async getName(Name: string): Promise<void> {
        await this.getNameField().waitForDisplayed({
            timeoutMsg: 'Nane input was not displayed',
        })
        await this.getNameField().setValue(Name)
    }

    public async getEmail(Emai: string): Promise<void> {
        await this.getEmailField().waitForDisplayed({
            timeoutMsg: 'Email input was not displayed',
        })
        await this.getEmailField().setValue(Emai)
    }

    public async getBio(Bio: string): Promise<void> {
        await this.getBioField().waitForDisplayed({
            timeoutMsg: 'Bio input was not displayed',
        })
        await this.getBioField().setValue(Bio)
    }

    public async getPronouns(Pronouns: string): Promise<void> {
        await this.getPronounsField().waitForDisplayed({
            timeoutMsg: 'Pronouns:input was not displayed',
        })
        await this.getPronounsField().setValue(Pronouns)
    }

    public async getAvatar(Avatar: string): Promise<void> {
        await this.getAvatarField().waitForDisplayed({
            timeoutMsg: 'Avatar input was not displayed',
        })
        await this.getAvatarField().setValue(Avatar)
    }

    public async update(): Promise<void> {
        await this.getUpdateButton().waitForClickable({
            timeoutMsg: 'Update profile was not clickable',
        })
        await this.getUpdateButton().click()
    }

    public async settings(updateSettings: { name: string, email: string, bio: string, pronouns: string, avatar: string }): Promise<void> {
        await this.getName(updateSettings.name)
        await this.getEmail(updateSettings.email)
        await this.getBio(updateSettings.bio)
        await this.getPronouns(updateSettings.pronouns)
        await this.getAvatar(updateSettings.avatar)
        await this.getUpdateButton().click()
    }
}

export {
    SettingsPage
}
