import CheckboxPage from '../pageobjects/checkbox.page'

describe('checkboxes', function () {
    it('checkbox 2 should be enabled', function () {
        CheckboxPage.open()
        expect(CheckboxPage.firstCheckbox).not.toBeSelected()
        expect(CheckboxPage.lastCheckbox).toBeSelected()
    })

    it('checkbox 1 should be enabled after clicking on it', function () {
        CheckboxPage.open()
        expect(CheckboxPage.firstCheckbox).not.toBeSelected()
        CheckboxPage.firstCheckbox.click()
        expect(CheckboxPage.firstCheckbox).toBeSelected()
    })
})
