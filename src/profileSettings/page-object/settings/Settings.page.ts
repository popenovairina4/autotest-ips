import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../../common/page-object/PageObject'

class SettingsPage extends PageObject {
    protected url: string = 'https://github.com/settings/profile' // сделала наследование от PageObgect, добавила урл страницы, на которую нужно перейти.

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
        this.browser = browser
    }

    public async setBio(bio: string): Promise<void> {
        await this.getBioField().waitForDisplayed({
            timeoutMsg: 'Bio input was not displayed',
        })
        await this.getBioField().setValue(bio)
    }

    public async setEmail(email: string): Promise<void> {
        await this.getEmailField().waitForDisplayed({
            timeoutMsg: 'Email input was not displayed',
        })
        await this.getEmailField().selectByAttribute("value", email)
    }

    public async setName(name: string): Promise<void> {
        await this.getNameField().waitForDisplayed({
            timeoutMsg: 'Name input was not displayed',
        })
        await this.getNameField().setValue(name)
    }

    public async setPronouns(pronouns: string): Promise<void> {
        await this.getPronounsField().waitForDisplayed({
            timeoutMsg: 'Pronouns:input was not displayed',
        })
        await this.getPronounsField().selectByAttribute("value", pronouns)
    }

    public async setSettings(updateSettings: { name: string, email: string, bio: string, pronouns: string, avatar: string }): Promise<void> { //назвать глаголом
        await this.setName(updateSettings.name)
        await this.setEmail(updateSettings.email)
        await this.setBio(updateSettings.bio)
        await this.setPronouns(updateSettings.pronouns)
        await this.update()
    }

    public async uploadFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not existed',
        })
        await showHiddenFileInput(this.browser)
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
        const submitButton = this.browser.$('//*[@id="avatar-crop-form"]/div[2]/button')
        await submitButton.click()
    }

    public async update(): Promise<void> {
        await this.getUpdateButton().waitForClickable({
            timeoutMsg: 'Update profile was not clickable',
        })
        await this.getUpdateButton().click()
    }

    private getAvatarField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="settings-frame"]/div[2]/div[2]/dl/dd/div/details/summary/img')
    }

    private getBioField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_bio"]')
    }

    private getEmailField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_email"]')
    }

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('#avatar_upload')
    }

    private getNameField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_name"]')
    }

    private getPronounsField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns_select"]')
    }

    private getUpdateButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="edit_user_183081302"]/div/p[2]/button')
    }
}

async function showHiddenFileInput(browser: WebdriverIO.Browser): Promise<void> {
    await browser.execute(() => {
        const htmlElement = document.querySelector('#avatar_upload') as HTMLElement
        htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
    })
}

export {
    SettingsPage
}
