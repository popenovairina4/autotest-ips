import { auth } from "../../secrets/passwords"


describe('Login form', () => {
    beforeEach(async () => {
        await browser.url('https://github.com/login')
    })

    it('login with valid data', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'Login form was not displayed',
        })

        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Email input was not displayed',
        })
        await browser.$('//*[@id="login_field"]').setValue(auth.login)

        await browser.$('//*[@id="password"]').waitForDisplayed({
            timeoutMsg: 'Password input was not displayed',
        })
        await browser.$('//*[@id="password"]').setValue(auth.password)

        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable',
        })
        await browser.$('//*[@type="submit"]').click()

        const isDisplayedElement: boolean = await browser.$('/html/body/div[1]/div[1]/header/div').isDisplayed()

        expect(isDisplayedElement).toEqual(true)
    })

    it('invalid login', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'Login form was not displayed',
        })

        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Email input was not displayed',
        })
        await browser.$('//*[@id="login_field"]').setValue(`hfdghjdfj`)

        await browser.$('//*[@id="password"]').waitForDisplayed({
            timeoutMsg: 'Password input was not displayed',
        })
        await browser.$('//*[@id="password"]').setValue(`KirianFrakiiscii`)

        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable',
        })
        await browser.$('//*[@type="submit"]').click()

        const isDisplayedElement: boolean = await browser.$('//*[@id="login"]/div[1] | //*[@id="login"]/div[4]').isDisplayed()

        expect(isDisplayedElement).toEqual(true)
    })

    it('invalid password', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'Login form was not displayed',
        })

        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Email input was not displayed',
        })
        await browser.$('//*[@id="login_field"]').setValue(`popenovairina4@gmail.com`)

        await browser.$('//*[@id="password"]').waitForDisplayed({
            timeoutMsg: 'Password input was not displayed',
        })
        await browser.$('//*[@id="password"]').setValue(`vghghjjk`)

        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable',
        })
        await browser.$('//*[@type="submit"]').click()

        const isDisplayedElement: boolean = await browser.$('//*[@id="login"]/div[1] | //*[@id="login"]/div[4]').isDisplayed()

        expect(isDisplayedElement).toEqual(true)
    })

    it('invalid login and password', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'Login form was not displayed',
        })

        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Email input was not displayed',
        })
        await browser.$('//*[@id="login_field"]').setValue(`popenovacoghghjhjjk`)

        await browser.$('//*[@id="password"]').waitForDisplayed({
            timeoutMsg: 'Password input was not displayed',
        })
        await browser.$('//*[@id="password"]').setValue(`vghghjjk`)

        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable',
        })
        await browser.$('//*[@type="submit"]').click()

        const isDisplayedElement: boolean = await browser.$('//*[@id="login"]/div[1] | //*[@id="login"]/div[4]').isDisplayed()

        expect(isDisplayedElement).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})