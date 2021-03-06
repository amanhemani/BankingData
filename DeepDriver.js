function ProcessLogin() {
    var FirstName = document.getElementById("FirstName").value;
    var LastName = document.getElementById("LastName").value;
    var CustomerId = document.getElementById("CustomerId").value;
    var BothName = FirstName + " " + LastName;
    NAME = BothName;
    sessionStorage.name = NAME;
    CUSTOMER_ID = CustomerId;
    sessionStorage.customerID = CUSTOMER_ID;
    console.log(NAME);
    login(BothName, CustomerId);

}

function getName(){
    return sessionStorage.name;
}
function setName(newName) {
    NAME = newName;
}
function getCustomID() {
    return sessionStorage.customerID;
}
function setCustomID(newID) {
    CUSTOMER_ID = newID;
}
function getWeekDaysPurchasesArray() {
    var arrayAsString = sessionStorage.weekDaysArray;
    var array = arrayAsString.split(",");
    var intsArr = new Array(7);
    for(var i=0; i<array.length; i++){
        intsArr[i] = parseInt(array[i]);
    }
    console.log(intsArr);
    return intsArr;
}
function setWeekDaysPurchasesArray(newArray) {
    weekDaysPurchasesArray = newArray;
}
function getLoginSuccess() {
    return sessionStorage.loginSucs;
}
function setLoginSuccess(newSuccess) {
    loginSuccess = newSuccess;
}
function getAllCustomerAccounts() {
    var arrayAsString = sessionStorage.customerAccounts;
    console.out(arrayAsString);
    var array = arrayAsString.split(",");
    return array;
}
function setAllCustomerAccounts(customerAccounts) {
    AllCustomerAccounts = customerAccounts;
}
function getAPIKey() {
    return "addb4a04857cc80855331a78b402d03c";
}

function validate(){
    if(loginSuccess === 0) {
        alert("Login Successful");
        //loginSuccess = 9;
        window.location = "Homepage.html"; //Redirecting to other page
        return false;
    }
    if (loginSuccess !== 0){
        alert("Login Failed");
        return 0;
    }
}


function start(){
    var apikey = '33b2ec67eaa776d0a0e1ce35be9f2648';

    //NOTE: CUSTOMER ID IS CURRENTLY HARDCODED AND SHOULD NOT BE!!!!!!!!
    var CustomerId = CUSTOMER_ID;
    require(['customer'], function (customer) {
        //var apikey = '33b2ec67eaa776d0a0e1ce35be9f2648';
        //customerDemo2(apikey, customer);

    });

    require(['account'], function (account) {
        //var apikey = '33b2ec67eaa776d0a0e1ce35be9f2648';
        //The following uses the Account
        //accountDemo2(apikey, account, CustomerId);
        var Num_Accounts = getNumberOfAccounts(apikey, account, CustomerId); //Return the # of accounts
        console.log("Number of Accounts Found: " + Num_Accounts);
        var number = Num_Accounts-1; //Return the first Account_id, number represents which account to select. For 5 accounts use 0-4.
        while(number >= 0){
        var Account_id = getAccountIsd(apikey, account, CustomerId, number);
        console.log("Account Id: " + Account_id);
        //The following uses AccountId, unique to account!
        var Account_type = getAccountType(apikey, account, Account_id);
        console.log("Account Type: " + Account_type);
        var Account_nickname = getAccountNickname(apikey, account, Account_id);
        console.log("Account Nickname: " + Account_nickname);
        var Account_rewards = getAccountRewards(apikey, account, Account_id);
        console.log("Account Rewards: " + Account_rewards);
        var Account_balance = getAccountBalance(apikey, account, Account_id);
        console.log("Account Balance: " + Account_balance);
        var Account_Customer_Id = getAccountCustomerId(apikey, account, Account_id);
        console.log("Account Customer Id: " + Account_Customer_Id);

        number = number - 1;
        //NOTE: Add Frontend code here using above variables in loop.
        }
    });



}
/*
function customerDemo2 (apikey, customer) {
    var customerAccount = customer.initWithKey(apikey);
    var customerInfo = customerAccount.getCustomers()[0];
    //console.log("[Customer - Get All Customers] : Sample Customer: " + customerInfo.first_name);
    //$('#customer').html("Bank Customer: <b>" + customerInfo.first_name + " " + customerInfo.last_name +  "</b>");
}
*/
function getNumberOfAccounts (apikey, account, CustomerId) {
    console.log('Function getAccountId');
    var accountAccount = account.initWithKey(apikey);
    var customerAccount = accountAccount.getAllByCustomerId(CustomerId);
    // $('#customer').html("Account ID's: <b>" + customerAccount._id);
    return Object.keys(customerAccount).length;
}


function getAccountId (apikey, account, CustomerId, number) {
    console.log('Function getAccountId');
    var accountAccount = account.initWithKey(apikey);
    var customerAccount = accountAccount.getAllByCustomerId(CustomerId)[number];
   // $('#customer').html("Account ID's: <b>" + customerAccount._id);
    return customerAccount._id;
}

function getAccountType (apikey, account, Account_id) {
    console.log('Function getAccountType');
    var accountAccount = account.initWithKey(apikey);
    var customerAccount = accountAccount.getAccountById(Account_id);
    // $('#customer').html("Account ID's: <b>" + customerAccount._id);
    return customerAccount.type;
}

function getAccountNickname (apikey, account, Account_id) {
    console.log('Function getAccountNickname');
    var accountAccount = account.initWithKey(apikey);
    var customerAccount = accountAccount.getAccountById(Account_id);
    // $('#customer').html("Account ID's: <b>" + customerAccount._id);
    return customerAccount.nickname;
}

function getAccountRewards (apikey, account, Account_id) {
    console.log('Function getAccountRewards');
    var accountAccount = account.initWithKey(apikey);
    var customerAccount = accountAccount.getAccountById(Account_id);
    // $('#customer').html("Account ID's: <b>" + customerAccount._id);
    return customerAccount.rewards;
}

function getAccountBalance (apikey, account, Account_id) {
    console.log('Function getAccountBalance');
    var accountAccount = account.initWithKey(apikey);
    var customerAccount = accountAccount.getAccountById(Account_id);
    // $('#customer').html("Account ID's: <b>" + customerAccount._id);
    return customerAccount.balance;
}

function getAccountCustomerId (apikey, account, Account_id) {
    console.log('Function getAccountRewards');
    var accountAccount = account.initWithKey(apikey);
    var customerAccount = accountAccount.getAccountById(Account_id);
    // $('#customer').html("Account ID's: <b>" + customerAccount._id);
    return customerAccount.customer_id;
}







/*function accountDemo2 (apikey, account, CustomerId) {
    console.log('Function accountDemo2');
    var accountAccount = account.initWithKey(apikey);
    var customerAccount = accountAccount.getAllByCustomerId(CustomerId)[0];
    //console.log("[test - Get ALL Deposits] : Sample Customer: " + customerAccount);
    //$('#customer').html("Account Type: <b>" + customerAccount.type + "</b><br>Nickname: <b>" + customerAccount.nickname + "</b>");
}*/