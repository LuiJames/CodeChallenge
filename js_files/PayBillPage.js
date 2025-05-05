const config = require('./config');

exports.PayBillPage =
class PayBillPage {

    constructor(page) {
        // Locators for Open New Account Page
        this.page = page;
        this.paybillLink = "//a[normalize-space()='Bill Pay']";
        this.paynameInput = "//input[@name='payee.name']",
        this.payaddressInput = "//input[@name='payee.address.street']",
        this.paycityInput = "//input[@name='payee.address.city']",
        this.paystateInput = "//input[@name='payee.address.state']",
        this.payzipInput = "//input[@name='payee.address.zipCode']",
        this.payphoneInput = "//input[@name='payee.phoneNumber']",
        this.payaccountInput = "//input[@name='payee.accountNumber']",
        this.payverifyInput = "//input[@name='verifyAccount']",
        this.payamountInput = "//input[@name='amount']",
        this.payacccountfromBox = "//select[@name='fromAccountId']"
        this.sendpaymentButton = "//input[@value='Send Payment']";
    }

    // Pay Bills
    async payBills(to, from, amount) {
        // Click Register Link
        await this.page.locator(this.paybillLink).click();

        // User Credentials
        await this.page.locator(this.paynameInput).fill(config.user_fname);
        await this.page.locator(this.payaddressInput).fill(config.user_address);
        await this.page.locator(this.paycityInput).fill(config.user_city);
        await this.page.locator(this.paystateInput).fill(config.user_state);
        await this.page.locator(this.payzipInput).fill(config.user_zip);
        await this.page.locator(this.payphoneInput).fill(config.user_phone);
        await this.page.locator(this.payaccountInput).fill(to);
        await this.page.locator(this.payverifyInput).fill(to);
        await this.page.locator(this.payamountInput).fill(amount);
        await this.page.locator(this.payacccountfromBox).selectOption(from);

        await this.page.locator(this.sendpaymentButton).click();

    }
}