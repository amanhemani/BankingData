
const APIKEY = "addb4a04857cc80855331a78b402d03c";
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
        customerDemo(apikey, customer, name, id);
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
        document.getElementById("welcome").innerText = customerData;

    }
    else{
        document.getElementById("welcome").innerText = "Error, no such bank account found!"
    }
}

function getPurchases(apikey, name, id){
    var getPurchase;
}

function start(){
    require(['customer'], function (customer) {
        var apikey = '33b2ec67eaa776d0a0e1ce35be9f2648';
        customerDemo2(apikey, customer);




    });
    require(['account'], function (account) {
        var apikey = '33b2ec67eaa776d0a0e1ce35be9f2648';


        accountDemo2(apikey, account);


    });

}

function customerDemo2 (apikey, customer) {
    var customerAccount = customer.initWithKey(apikey);
    var customerInfo = customerAccount.getCustomers()[0];
    console.log("[Customer - Get All Customers] : Sample Customer: " + customerInfo.first_name);
    $('#customer').html("Bank Customer: <b>" + customerInfo.first_name + " " + customerInfo.last_name +  "</b>");
}

function accountDemo2 (apikey, account) {
    console.log('Account Demo');
    var accountAccount = account.initWithKey(apikey);
    var accountNumber = "5c684310322fa06b6779463f";
    var customerAccount = accountAccount.getAllByCustomerId(accountNumber)[0];
    console.log("[test - Get ALL Deposits] : Sample Customer: " + customerAccount);
    $('#customer').html("Account Type: <b>" + customerAccount.type + "</b><br>Nickname: <b>" + customerAccount.nickname + "</b>");
}
