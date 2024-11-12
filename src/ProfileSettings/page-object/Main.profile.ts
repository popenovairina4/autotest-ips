import { ChainablePromiseElement } from 'webdriverio'
import { ProfileObject } from './Profile.object';


class MainProfile extends ProfileObject {
    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

}

export {
    MainProfile
}
