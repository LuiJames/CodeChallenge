const config = require('./config');

exports.LogInPage =
class LogInPage {

    constructor(page) {
        // Locators for Log In Page
        this.page = page;
        this.usernameInput = "//input[@name='username']";
        this.passwordInput = "//input[@name='password']";
        this.logoutLink = "//a[normalize-space()='Log Out']";
        this.loginButton = "//input[@value='Log In']";
        this.welcomeuserText = "//p[@class='smallText']";
    }

    // Go to Log In Page
    async gotoLogInPage() {
        await this.page.goto(config.baseUrl);
    }

    // Log In User
    async logInUser(){
        await this.page.locator(this.usernameInput).fill(config.login_uname);
        await this.page.locator(this.passwordInput).fill(config.login_pword);
        await this.page.locator(this.loginButton).click();
    }

    // Verify If Log In To Correct
    async checkLogInStatus() {
        const welcomeUser = await this.page.locator(this.welcomeuserText);
        if((await welcomeUser.textContent()) == ("Welcome "+config.user_fname+" "+config.user_lname)){
            return true;
        } else {
            return false;
        }
    }

    // Log Out User
    async logOutUser() {
        await this.page.locator(this.logoutLink).click();
    }


}