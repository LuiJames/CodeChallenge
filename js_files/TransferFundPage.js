const config = require('./config');

exports.TransferFundPage =
class TransferFundPage {

    constructor(page) {
        // Locators for Open New Account Page
        this.page = page;
        this.transferfundLink = "//a[normalize-space()='Transfer Funds']";
        this.transferamountInput = "//input[@id='amount']";
        this.fromaccountBox = "//select[@id='fromAccountId']";
        this.toaccountBox = "//select[@id='toAccountId']"
        this.transferButton = "//input[@value='Transfer']"

    }

    // Transfer Funds
    async transferFunds(fromm, to, amount) {
        await this.page.locator(this.transferfundLink).click();
        await this.page.locator(this.transferamountInput).fill(amount);
        await this.page.locator(this.fromaccountBox).selectOption(fromm);
        await this.page.locator(this.toaccountBox).selectOption(to);
        await this.page.locator(this.transferButton).click();

    }

}