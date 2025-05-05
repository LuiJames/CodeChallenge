import { test, expect } from '@playwright/test';
import { LogInPage } from '../js_files/LogInPage';
import { RegisterPage } from '../js_files/RegisterPage';
import { HomePage } from '../js_files/HomePage';
import { AccountOverviewPage } from '../js_files/AccountOverviewPage'
import { OpenNewAccountPage } from '../js_files/OpenNewAccountPage';
import { TransferFundPage } from '../js_files/TransferFundPage';
import { PayBillPage } from '../js_files/PayBillPage';

const config = require('../js_files/config');

test("Validate User Can Register And Do Transactions In Parabank Site", async ({page, request}) => {

    const login = new LogInPage(page);
    const register = new RegisterPage(page);
    const homepage = new HomePage(page);
    const overview = new AccountOverviewPage(page);
    const opennew = new OpenNewAccountPage(page);
    const transfer = new TransferFundPage(page);
    const bill = new PayBillPage(page);

    // Get Initial Account ID
    const account_id = await overview.getInitialAccount();
    const new_account_id = await overview.getNewAccount();
    

// 1. Navigate to Para bank application.
    await login.gotoLogInPage();

// 2. Create a new user from user registration page (Ensure username is generated randomly and it is unique in every test execution).
    await register.registerNewUser();

    // Verify Registration Is Success
    const reg_status = await register.checkRegistrationStatus();
    expect(await reg_status).toBe(true);

    // Log Out New User
    await login.logOutUser();
    
// 3. Login to the application with the user created in step 2.
    await login.logInUser();

    // Verify If Log In To Correct
    const login_status = await login.checkLogInStatus();
    expect(await login_status).toBe(true);

// 4. Verify if the Global navigation menu in home page is working as expected.
    const nav_status = await homepage.checkGlobalNavigationMenu();
    expect(await nav_status).toBe(true);

// 5. Create a Savings account from “Open New Account Page” and capture the account number.
    // Get User Before State
    await overview.getBeforeUserState();

    // Open New Account
    await opennew.openNewAccount(config.new_account_type, account_id);

    // Verify If Successfully Added New Account
    const newaccount_status = await opennew.checkNewAccountStatus();
    expect(await newaccount_status).toBe(true);

// 6. Validate if Accounts overview page is displaying the balance details as expected.
    const newaccount_detail = await overview.getAfterUserState();
    expect(await newaccount_detail).toBe(true);

// 7. Transfer funds from account created in step 5 to another account.
    await transfer.transferFunds(account_id, new_account_id, config.amount_transfer);

// 8. Pay the bill with account created in step 5.
    await bill.payBills(config.pay_other_account, new_account_id, config.pay_amount );

// 9. API Test: Search transaction
    const getUrl = `${config.requestUrl}${new_account_id}/transactions/amount/${config.pay_amount}?timeout=30000`;
    console.log('API URL:', getUrl);

    const response = await request.get(getUrl);
    const responseText = await response.text();
    console.log('Response body:', responseText);

})