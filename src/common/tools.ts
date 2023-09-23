async function skipPopups(browser: WebdriverIO.Browser, userID: string): Promise<void> {
    await browser.execute(ID => {
        localStorage.setItem(`ispring::learn::coursesPage::welcomePopup::${ID}`, '1')
    }, userID)
}

export {
    skipPopups,
}