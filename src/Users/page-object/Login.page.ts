import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../common/page-object/PageObject'
import { UserModel } from '../model/user.model'

class LoginPage extends PageObject {
    public async setLogin(login: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login input was not displayed',
        })
        await this.getLoginField().setValue(login)
    }

    public async setPassword(password: string): Promise<void> {
        await this.getPasswordField().waitForDisplayed({
            timeoutMsg: 'Email input was not displayed',
        })
        await this.getPasswordField().setValue(password)
    }

    public async submit(): Promise<void> {
        await this.getSubmitButton().waitForDisplayed({
            timeoutMsg: 'Button was not displayed',
        })
        await this.getSubmitButton().click()
    }

    private getLoginForm(): ChainablePromiseElement {
        return this.browser.$('//*[@id="login"]')
    }
    private getLoginField() {
        return this.browser.$('//*[@id="login_field"]')
    }
    private getPasswordField() {
        return this.browser.$('//*[@id="password"]')
    }
    private getSubmitButton() {
        return this.browser.$('//*[@type="submit"]')
    }

    public async login(user: UserModel): Promise<void> {
        await this.setLogin(user.login)
        await this.setPassword(user.password)
        await this.getSubmitButton().click()
    }
}

export {
    LoginPage
}