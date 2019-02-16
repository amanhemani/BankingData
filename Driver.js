
const APIKEY = "addb4a04857cc80855331a78b402d03c";
const NAME = "Madonna Howe";
const CUSTOMER_ID = "5c68428d322fa06b67794638";
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

function getPurchases(apikey, id){
    require(['purchase', 'account'], function (purchase, account) {
        var purchaseAccess = purchase.initWithKey(apikey);
        var accountAccess = account.initWithKey(apikey);
        var accounts = accountAccess.getAllAccounts();
        var accountToUse = accounts[0];
        var accountID = accountToUse._id;
        console.log(accountID);
        var purchases = purchaseAccess.getAll(accountID);
        console.log(purchases);
        return purchases;
    });
}

function pseudoPurchase(apikey, id, merchantJson){
    require(['purchase'], function (purchase) {
        var purchaseAccess = purchase.initWithKey(apikey);
        var accountAccess = account.initWithKey(apikey);
        var accounts = accountAccess.getAllAccounts();
        var accountToUse = accounts[0];
        var accountID = accountToUse._id;
        console.log(accountID);
        var responseCode = purchaseAccess.createPurchase(accountID, merchantJson);
    });
}
