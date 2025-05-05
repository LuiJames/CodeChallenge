const config = require('./config');

exports.HomePage =
class HomePage {

    constructor(page) {
        // Locators for Home Page
        this.page = page;
        this.globalmenuLinks = [
            "//a[normalize-space()='Open New Account']",
            "//a[normalize-space()='Accounts Overview']",
            "//a[@href='transfer.htm']",
            "//a[@href='billpay.htm']",
            "//a[normalize-space()='Find Transactions']",
            "//a[normalize-space()='Update Contact Info']",
            "//a[normalize-space()='Request Loan']",
            "//a[normalize-space()='Log Out']"
        ];
    }

    async checkGlobalNavigationMenu() {
        // Verify Each Item In Menu
        for (let i = 0; i < this.globalmenuLinks.length; i++) {
            const globalNavMenu = await this.page.locator(this.globalmenuLinks[i]);
            const menutext = await globalNavMenu.textContent();
            
            // Verify The Link Title
            if (menutext != config.global_menu[i]){
                break;
            }
            // Confirm The Link Until Before Log Out
            if(i < this.globalmenuLinks.length-1){
                await globalNavMenu.click();
                console.log("Page is Good :" + config.global_menu[i]);
                continue;
            }
            return true;
            
        }
    }

}
