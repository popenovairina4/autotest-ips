import { ChainablePromiseElement } from 'webdriverio'

class Page404 {
    protected browser: WebdriverIO.Browser

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async isDisplayedPage404(): Promise<boolean> {
        await this.get404ImgElement().waitForDisplayed({
            timeoutMsg: '404 image was not displayed',
        })

        return await this.get404ImgElement().isDisplayed()
    }

    private get404ImgElement(): ChainablePromiseElement {
        return this.browser.$('//img[@alt="404 “This is not the web page you are looking for”"]')
    }
}


export {
    Page404
}