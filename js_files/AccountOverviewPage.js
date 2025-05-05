const config = require('./config');

exports.AccountOverviewPage =
class AccountOverviewPage {

    constructor(page) {
        // Locators for Account Overview Page
        this.page = page;
        this.accountoverviewLink = "//a[normalize-space()='Accounts Overview']";
        this.accountTable = "//table[@id='accountTable']";
        
        this.initialAccount = null;
        this.initialBalance = null;
        this.initialAvailable = null;

        this.newAccount = null;
        this.newBalance = null;
        this.newAvailable = null;

        this.prevAccount = null;
        this.prevalance = null;
        this.prevAvailable = null;

    }

    // Get The User Before State
    async getBeforeUserState() {
        await this.page.locator(this.accountoverviewLink).click();

        // Get Before Details
        const acctable = await this.page.locator(this.accountTable);
        const rowsAccount = await acctable.locator("tbody tr");
        const dataAccount = await rowsAccount.locator("td");

        this.initialAccount = await dataAccount.nth(0).textContent();
        this.initialBalance = await dataAccount.nth(1).textContent();
        this.initialAvailable = await dataAccount.nth(2).textContent();

        console.log("Initial User Detail : "+
            this.initialAccount+" "+
            this.initialBalance+" "+
            this.initialAvailable);
    }

    async getAfterUserState(){
        await this.page.locator(this.accountoverviewLink).click();
        
         // Count Max Number Of Account
        const acctable = await this.page.locator(this.accountTable);
        const totalaccount = await acctable.count();
        const t = totalaccount;

        // Get New Account Details
        const rowsAccount = await acctable.locator("tbody tr");
        const dataAccount = await rowsAccount.nth(t).locator("td");

        this.newAccount = await dataAccount.nth(0).textContent();
        this.newBalance = await dataAccount.nth(1).textContent();
        this.newAvailable = await dataAccount.nth(2).textContent();

        console.log("New Account Detail : "+
            this.newAccount+" "+
            this.newBalance+" "+
            this.newAvailable);

        if ((this.newBalance == "$100.00") && (this.newAvailable == "$100.00")){
            return true;
        }
            return false;
        
    }
   
    async getInitialAccount() {
        return {
            initialAccount : this.initialAccount
        };
    }

    async getInitialBalance() {
        return {
            initialBalance : this.initialBalance
        };
    }

    async getInitialAvailable() {
        return {
            initialAvailable : this.initialAvailable
        };
    }

    async getNewAccount() {
        return {
            newAccount : this.newAccount
        };
    }

    async getNewBalance() {
        return {
            newBalance : this.newBalance
        };
    }

    async getNewAvailable() {
        return {
            newAvailable : this.newAvailable
        };
    }
}