const config = require('./config');

exports.RegisterPage =
class RegisterPage {

    constructor(page){
        // Locators for Register Page
        this.page = page;
        this.registerLink = "//a[normalize-space()='Register']";
        this.fnameInput = "//input[@id='customer.firstName']";
        this.lnameInput = "//input[@id='customer.lastName']";
        this.addressInput = "//input[@id='customer.address.street']";
        this.cityInput = "input[id='customer.address.city']";
        this.stateInput = "//input[@id='customer.address.state']";
        this.zipInput = "//input[@id='customer.address.zipCode']";
        this.phoneInput = "//input[@id='customer.phoneNumber']";
        this.ssnInput = "//input[@id='customer.ssn']";
        this.unameInput = "//input[@id='customer.username']";
        this.pwordInput = "//input[@id='customer.password']";
        this.confirmInput = "//input[@id='repeatedPassword']";
        this.registerButton = "//input[@value='Register']";
        this.welcomeText = "//h1[@class='title']";
    }

    // Register New User
    async registerNewUser() {
        // Click Register Link
        await this.page.locator(this.registerLink).click();

        // User Credentials
        await this.page.locator(this.fnameInput).fill(config.user_fname);
        await this.page.locator(this.lnameInput).fill(config.user_lname);
        await this.page.locator(this.addressInput).fill(config.user_address);
        await this.page.locator(this.cityInput).fill(config.user_city);
        await this.page.locator(this.stateInput).fill(config.user_state);
        await this.page.locator(this.zipInput).fill(config.user_zip);
        await this.page.locator(this.phoneInput).fill(config.user_phone);
        await this.page.locator(this.ssnInput).fill(config.user_ssn);

        // Log In Credentials
        await this.page.locator(this.unameInput).fill(config.login_uname);
        await this.page.locator(this.pwordInput).fill(config.login_pword);
        await this.page.locator(this.confirmInput).fill(config.login_pword);

        // Click Register Button
        await this.page.locator(this.registerButton).click();
    }

    // Verify Registration Is Success
    async checkRegistrationStatus() {
        const welcomeBanner = await this.page.locator(this.welcomeText);
        if ((await welcomeBanner.textContent()) == ("Welcome "+config.login_uname)){
            return true;
        } else {
            return false;
        }
    }
    
}