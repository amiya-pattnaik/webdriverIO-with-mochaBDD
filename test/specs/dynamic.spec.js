import DynamicPage from '../pageobjects/dynamic.page'

describe('dynamic loading', function () {
    it('should be an button on the page', function () {
        DynamicPage.open()
        expect(DynamicPage.loadedPage).not.toBePresent()

        DynamicPage.btnStart.click()
        DynamicPage.loadedPage.waitForExist()
        expect(DynamicPage.loadedPage).toBePresent()
    })
})
