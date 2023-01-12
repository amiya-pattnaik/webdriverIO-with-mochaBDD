export default class Page {
    open (path: string) {
        return browser.url(path)
    }
}
