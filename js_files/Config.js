module.exports = {

    // Base URL
    baseUrl : 'https://parabank.parasoft.com/',

    // User Credentials
    user_fname :    'testFname', 
    user_lname :    'testLname',
    user_address :  '123 B. testAddress',
    user_city :     'testCity',
    user_state :    'testState',
    user_zip :      '1234',
    user_phone :    '+639123456789',
    user_ssn :      '1234 567 890',

    // Log In Credentials
    login_uname :   'user_'+Date.now(),
    login_pword :   'test@1234',

    // Global Navigation Menu
    global_menu : [ 
        'Open New Account',
        'Accounts Overview',
        'Transfer Funds',
        'Bill Pay',
        'Find Transactions',
        'Update Contact Info',
        'Request Loan',
        'Log Out'
    ],

    // Open New Account type
    new_account_type :  'SAVINGS',

    // Transfer Amount
    amount_transfer :   '150.0',

    // Pay Bill
    pay_other_account : '12345',
    pay_amount :        '75.0',
}