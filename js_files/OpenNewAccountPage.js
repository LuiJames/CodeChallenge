const config = require('./config');

exports.OpenNewAccountPage =
class OpenNewAccountPage {

    constructor(page) {
        // Locators for Open New Account Page
        this.page = page;
        this.opennewaccountLink = "//a[normalize-space()='Open New Account']";
        this.accounttypeBox = "//select[@id='type']";
        this.accountidBox = "//select[@id='fromAccountId']";
        this.opennewaccButton = "//input[@value='Open New Account']";
        this.successMessage = "//h1[normalize-space()='Account Opened!']";
        this.newaccountidLink = "//a[@id='newAccountId']";

        this.newAccountId = null;
    }

    // Open New Account
    async openNewAccount(type, account) {
        await this.page.locator(this.opennewaccountLink).click();
        await this.page.locator(this.accounttypeBox).selectOption(type);
        await this.page.locator(this.accountidBox).selectOption(account);
        await this.page.locator(this.opennewaccButton).click();
    }

    async checkNewAccountStatus() {
        const successtxt = await this.page.locator(this.successMessage).textContent();
        this.newAccountId = await this.page.$eval('#newAccountId', el => el.textContent.trim());

        if(successtxt != "Account Opened!"){
            return false;
        } else {
            return true;
        }
    }

    async getNewAccountId() {
        return {
            newAccountId : this.newAccountId
        };
    }
}