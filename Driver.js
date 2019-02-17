
const APIKEY = "addb4a04857cc80855331a78b402d03c";
const NAME = "Eva Donnelly";
const CUSTOMER_ID = "5c68428e322fa06b6779463a";
var weekDaysPurchasesArray = [];
function onLoad() {
    console.log("hi")
}

function requireAPIKey(){
    require(['account'], function (account) {
        var apikey = 'YOUR-API-KEY';
        accountDemo(apikey, account);
    });
}

function accountDemo (apikey, account) {
    console.log('Account Demo');
    var custAccount = account.initWithKey(apikey);
    console.log("[Account - Get All] : Sample Account Nickname: (" + custAccount.getAllAccounts()[0].nickname + ")");
}

function getAccountID(apikey, account){
    var accountAccess = account.initWithKey(apikey);
    var accounts = accountAccess.getAllAccounts();
    var accountToUse = accounts[0];
    var accountID = accountToUse._id;
    return accountID
}

function login(name, id){
    require(['customer'], function (customer) {
        var apikey = APIKEY;
        return customerDemo(apikey, customer, name, id);
    });
}

function customerDemo (apikey, customer, login_name, id) {
    var customerAccount = customer.initWithKey(apikey);
    var customerInfo = customerAccount.getCustomerById(id);
    var index_value = 0;
    var foundUser = false;
    // for (var i = 0; i < customerInfo.length; i++) {
    //     var name = customerInfo[i].first_name + " " + customerInfo[i].last_name;
    //     if(name === login_name){
    //         foundUser = true;
    //         index_value = i;
    //         console.log("[Customer - Get All Customers] : Sample Customer: " + customerInfo[i].first_name);
    //     }
    // }
    if(customerInfo.first_name + " " + customerInfo.last_name === login_name){
        foundUser = true;
    }
    if(foundUser){
        var customerData ="Bank Customer: " + customerInfo.first_name + " " + customerInfo.last_name;
        console.log(customerData);
        return customerData

    }
    else{
        console.log("error! Could not log in!");
        return "error!"
    }
}

function getPurchases(apikey, id, account_name, cb){
    require(['purchase', 'account'], function (purchase, account) {
        var purchaseAccess = purchase.initWithKey(apikey);
        var accountAccess = account.initWithKey(apikey);
        var accounts = accountAccess.getAllByCustomerId(id);
        var accountToUse;
        var found = false;
        var idx = 0;
        for(var i=0; i<accounts.length; i++){
            if(accounts[i].nickname === account_name){
                found = true;
                idx = i;
            }
        }
        if(found){
            accountToUse = accounts[idx];
            console.log(accountToUse);
            var accountID = accountToUse._id;
            console.log(accountID);
            var purchases = purchaseAccess.getAll(accountID);
            console.log(purchases);
            cb(purchases);
            return purchases;
        } else {
            console.log("error, no such account exists!");
            cb("error!");
            return "error!"
        }

    });
}

function getPurchasesWeekArray(purchases){
    var weekArray = [0,0,0,0,0,0,0];
    for(var i=0; i<purchases.length; i++){
        console.log(purchases[i].purchase_date);
        weekArray[dateStringToDayOfWeek(purchases[i].purchase_date)]+=purchases[i].amount;
    }
    console.log(weekArray);
    console.log(weekDaysPurchasesArray);
    weekDaysPurchasesArray = weekArray;
    console.log(weekDaysPurchasesArray);
}

function dateStringToDayOfWeek(dateString) {
    var year = dateString.substring(0, 4);
    var month = dateString.substring(5,7);
    var day = dateString.substring(8,10);
    console.log(year);
    console.log(month);
    console.log(day);
    var d = new Date(year, month, day,0,0,0,0);
    return d.getDay();
}

function pseudoPurchase(apikey, id, merchantJson){
    require(['purchase', 'account'], function (purchase) {
        var purchaseAccess = purchase.initWithKey(apikey);
        var accountAccess = account.initWithKey(apikey);
        var accounts = accountAccess.getAllAccounts();
        var accountToUse = accounts[0];
        var accountID = getAccountID(apikey, accountToUse);
        console.log(accountID);
        var responseCode = purchaseAccess.createPurchase(accountID, merchantJson);
    });
}