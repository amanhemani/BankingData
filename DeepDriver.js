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