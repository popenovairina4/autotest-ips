import { getSpecs } from "./common/getSpecs";

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: getSpecs(),   //['./src/**/*.test.ts'], //['./src/**/issue/**/*.test.ts']
    maxInstances: 5,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['window-size=1366,768'],
        },
        acceptInsecureCerts: true,
    }],
    logLevel: 'error',
    waitforTimeout: 20000,
    connectionRetryTimeout: 60000,
    connectionRetryCount: 3,
    services: [
        ['visual', {
            autoSaveBaseline: true,
            clearRuntimeFolder: true,
            baselineFolder: `./reference-screenshots`,
            formatImageName: `{tag}-{browserName}`,
            screenshotPath: `./actual-screenshots`,

        }],
    ],
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
        }],
    ],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },

    afterTest: async function (
        test: unknown,
        context: unknown,
        result: { error?: unknown, duration: unknown, passed: unknown },
    ) {
        if (result.error) {
            await browser.takeScreenshot()
        }
    },
}
