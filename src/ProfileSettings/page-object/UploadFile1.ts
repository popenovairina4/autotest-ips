import { ChainablePromiseElement } from 'webdriverio'

class UploadFile {
    private browser: WebdriverIO.Browser

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
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

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('#avatar_upload')
    }
}

async function showHiddenFileInput(browser: WebdriverIO.Browser): Promise<void> {
    await browser.execute(() => {
        const htmlElement = document.querySelector('#avatar_upload') as HTMLElement
        htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
    })
}

export {
    UploadFile
}
