
function registerFun(){
    console.log("----in registerFun----")
    var Mail=$("#mailId").val();
    var Password=$("#passwordId").val();
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var ok= reg.test(Mail );
    if(!ok)
    {
            alert("邮箱格式不正确，请重新输入！");
            return;

    }
    if (Mail == "" || Password == "") {
        alert("账号/密码不能为空！");
        return;
    }
    $.ajax({
        data: JSON.stringify({mail:Mail,password:Password}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/register",
        success: function(data){
            //前端调用成功后，可以处理后端传回的json格式数据。
            /*if(response.success){
                alert(response.message);
            }*/
            alert(data);
        },
        error:function(data){
            alert("error");
        }

    });
}

function loginFun(){
    console.log("----in loginFun----");
     var Mail=$("#mailId").val();
     var Password=$("#passwordId").val();
     console.log("Mail:"+Mail)

    $.ajax({
        data: JSON.stringify({mail:Mail,password:Password}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/login",
        success: function(data){
            //前端调用成功后，可以处理后端传回的json格式数据。
            /*if(response.success){
                alert(response.message);
            }*/
            if(data=="账号/密码不能为空"||data=="账号/密码错误")
                alert(data);
            else
                //原来窗口
                window.location.href="http://101.201.121.174:80/api/showGoodsPage?"+'mail='+Mail;
            //新窗口
            // window.open('你所要跳转的页面');

        },
        error:function(data){
            alert("error");
        }

    });


}

function salesmanLoginFun(){
    console.log("----in salesmanLoginFun----");
    var Mail=$("#mailId").val();
    var Password=$("#passwordId").val();
    console.log("Mail:"+Mail)
    $.ajax({
        data: JSON.stringify({mail:Mail,password:Password}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/salesmanLogin",
        success: function(data){
            if(data=="账号/密码不能为空"||data=="账号/密码错误")
                alert(data);
            else
            //原来窗口
                window.location.href="http://101.201.121.174:80/api/salesmanPage?"+'id='+Mail;
        },
        error:function(data){
            alert("error");
        }
    });
}

function adminLoginFun(){
    console.log("----in adminLoginFun----");
    var Mail=$("#mailId").val();
    var Password=$("#passwordId").val();
    console.log(Mail+"  "+Password);
    if(Mail=="admin"&&Password=="123")
    {
        window.location.href="http://101.201.121.174:80/api/administratorPage"
        return;
    }
    else if(Mail==""||Password=="")
    {
        alert("账号/密码为空");
    }
    else
    {
        alert("账号/密码错误");
    }
}

function getDataRow(h){

    var row = document.createElement('tr'); //创建行  
    var delCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(delCell);
    var btnDel = document.createElement('input'); //创建一个input控件  
    btnDel.setAttribute('type','checkbox'); //type="button"  

    delCell.appendChild(btnDel);  //把删除按钮加入td，别忘了  


    var idCell = document.createElement('td');//创建第二列name  
    idCell.innerHTML = h.id;
    idCell.setAttribute('name','id');
    row.appendChild(idCell);


    var nameCell = document.createElement('td');//创建第二列name  
    nameCell.innerHTML = h.goods_name;
    nameCell.setAttribute('name','name');
    row.appendChild(nameCell);
    var priceCell = document.createElement('td');//创建第三列job  
    priceCell.innerHTML = h.price;
    priceCell.setAttribute('name','price');
    row.appendChild(priceCell);

    var amountCell = document.createElement('td');//创建第三列job  
    amountCell.innerHTML = h.amount;
    amountCell.setAttribute('name','amount');
    row.appendChild(amountCell);

    var kindCell = document.createElement('td');//创建第三列job  
    kindCell.innerHTML = h.kind;
    kindCell.setAttribute('name','kind');
    row.appendChild(kindCell);
 
    var purchasedAmountCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(purchasedAmountCell);
    var pa = document.createElement('input'); //创建一个input控件  
    pa.setAttribute('type','text'); //type="button"  
    pa.setAttribute('name','purchasedAmount');
    pa.setAttribute('value',1);
    purchasedAmountCell.appendChild(pa);  //把删除按钮加入td，别忘了  

    return row; //返回tr数据      
}

function addShoppingChartsFun() {
    var mail=getParam('mail');
    console.log("getParam:"+mail);
    var i=0;
    var Check = $("table input[type=checkbox]:checked");//在table中找input下类型为checkbox属性为选中状态的数据
    if(Check.length==0)
    {
        alert("请选择商品加购");
    }
    else
    {
    Check.each(function () {//遍历
        i=i+1;
        var row = $(this).parent("td").parent("tr");//获取选中行
        var goods_id = row.find("[name='id']").html();//获取name='Sid'的值
        var amount=row.find("[name='purchasedAmount']").val();
        console.log(mail+"  "+goods_id+"  "+amount);
        var bool=insertShoppingChartsFun(mail,goods_id,amount);
        console.log(bool);

        if(i<=Check.length&&bool=="库存不足")
            alert(row.find("[name='name']").html()+"的库存不足，加入购物车失败，但不影响其他商品加入购物车")
        else if(i<=Check.length&&bool=="error")
            alert(row.find("[name='name']").html()+"的加购数量出错，加入购物车失败，但不影响其他商品加入购物车");
        else if(i==Check.length&&bool=="成功加入购物车")
            alert(bool);


    })
        windowOfShowGoods();
              }
}

function insertShoppingChartsFun(userId,goodsId,amountF) {

    var bool="";
    $.ajax({
        data: JSON.stringify({user_id:userId,goods_id:goodsId,amount:amountF}),
        //type、contentType必填,指明传参方式
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/insertShoppingCharts",
        success: function(data){
            //前端调用成功后，可以处理后端传回的json格式数据。
            /*if(response.success){
                alert(response.message);
            }*/
            bool=data;
            // alert(data);
        },
        error:function(data){
                bool="error";
        }

    });
    return bool;
}

function getParam(paramName) {
    var paramValue = "";
    var isFound = false;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        var arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
        var i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].split("=")[1];
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}

function windowOfShoppingCharts() {

    var Mail=getParam('mail');
    window.location.href="http://101.201.121.174:80/api/shoppingChartsPage?"+'mail='+Mail;

}

function windowOfSalesman() {

    var id=getParam('id');
    window.location.href="http://101.201.121.174:80/api/salesmanPage?"+'id='+id;

}

function windowOfSales() {

    var id=getParam('id');
    window.location.href="http://101.201.121.174:80/api/salesPage?"+'id='+id;

}

function windowOfLog() {

    var id=getParam('id');
    window.location.href="http://101.201.121.174:80/api/logPage?"+'id='+id;

}

function windowOfSalesPerformance() {

    window.location.href="http://101.201.121.174:80/api/salesPerformancePage";

}

function windowOfAdmin() {

    window.location.href="http://101.201.121.174:80/api/administratorPage";

}

function windowOfStockManagement() {

    window.location.href="http://101.201.121.174:80/api/stockManagementPage";

}

function getShoppingChartsRow(h){


    var goodsId=h.goods_id;
    // var goods=selectGoodsByIdFun(goodsId);
    // console.log("goods:"+goods);
    var row = document.createElement('tr'); //创建行  

    var data=selectGoodsByIdFun(goodsId);
            var delCell = document.createElement('td');//创建第四列，操作列  
            row.appendChild(delCell);
            var btnDel = document.createElement('input'); //创建一个input控件  
            btnDel.setAttribute('type','checkbox'); //type="button"  
            delCell.appendChild(btnDel);  //把删除按钮加入td，别忘了 


    var idCell = document.createElement('td');//创建第二列name  
    idCell.innerHTML =data[0].id;
    idCell.setAttribute('name','id');
    row.appendChild(idCell);

            var nameCell = document.createElement('td');//创建第二列name  
            nameCell.innerHTML =data[0].goods_name;
            nameCell.setAttribute('name','name');
            row.appendChild(nameCell);

            var priceCell = document.createElement('td');//创建第二列name  
            priceCell.innerHTML =data[0].price;
            priceCell.setAttribute('name','price');
            row.appendChild(priceCell);

            var kindCell = document.createElement('td');//创建第二列name  
            kindCell.innerHTML =data[0].kind;
            kindCell.setAttribute('name','kind');
            row.appendChild(kindCell);

            var amountCell = document.createElement('td');//创建第二列name  
            amountCell.innerHTML =h.amount;
            amountCell.setAttribute('name','amount');
            row.appendChild(amountCell);

            var totalCell = document.createElement('td');//创建第二列name  
            var total=parseFloat(h.amount)*data[0].price;
            total=total.toFixed(2);
            totalCell.innerHTML =total;
            totalCell.setAttribute('name','total');
            row.appendChild(totalCell);
            return row;

    return row;


}
// $.ajax接收的是一个goods
function selectGoodsByIdFun(goodsId) {
    var good=[];
    $.ajax({
        //type、contentType必填,指明传参方式
        data: JSON.stringify({id:goodsId}),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/selectGoodsById",
        success: function(data){
            good=data;
        }
    })
        return good;
}

function windowOfShowGoods() {
    var Mail=getParam('mail');
    window.location.href="http://101.201.121.174:80/api/showGoodsPage?"+'mail='+Mail;

}

//$.ajax接收的是一个user
function selectMoneyByMailFun() {

    var Mail=getParam('mail');
    var  money=0

    $.ajax({
        data: JSON.stringify({mail:Mail}),
        //type、contentType必填,指明传参方式
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/selectUserByMail",
        success: function(data){
            //前端调用成功后，可以处理后端传回的json格式数据。
            /*if(response.success){
                alert(response.message);
            }*/

            money=data[0].money

        }
})
    return money;
}

function checkboxOnclick() {
    var totals=0.00;
    var Check = $("table input[type=checkbox]:checked");
    var p=document.getElementById('total');

    if(Check.length==0)
        return totals;
        // p.innerHTML='你选择的商品总价是'+totals;
    else {


        Check.each(function () {//遍历

            var row = $(this).parent("td").parent("tr");//获取选中行
            var total = row.find("[name='total']").html();
            // console.log(goods_id+"  "+amount+"  ");
            totals = totals + parseFloat(total);
            // total=total.toFixed(2);

        })
        totals=totals.toFixed(2);
        return totals;
        // p.innerHTML='你选择的商品总价是'+totals;
    }

}

function placeOrder() {

    var total=checkboxOnclick();
    var address = prompt("你选择的商品总价是"+total,"请输入收货地址");
    if(address)
    {
        // window.location.href="http://101.201.121.174:80/api/orderPage?"+'mail='+Mail;
        var Check = $("table input[type=checkbox]:checked");//在table中找input下类型为checkbox属性为选中状态的数据\
        var goodsIds="";
        var goodsAmounts="";
        var totals=0.00;
        var Mail=getParam('mail');

        var myDate = new Date();
        var year=myDate.getFullYear();
        var month=myDate.getMonth()+1;
        var date=myDate.getDate();
        var timing=year+"-"+month+"-"+date;

        // myDate.toLocaleDateString();     //获取当前日期
        console.log(timing);
        if(Check.length==0)
        {
            alert("你没有选中要下单的商品");
        }
        else if(address=="")
        {
            alert("你输入的地址为空，请重新输入");
        }
        else
        {
            Check.each(function () {//遍历
                var row = $(this).parent("td").parent("tr");//获取选中行
                var goods_id = row.find("[name='id']").html();//获取name='Sid'的值
                var amount=row.find("[name='amount']").html();
                var total=row.find("[name='total']").html();
                // console.log(goods_id+"  "+amount+"  ");
                goodsIds=goodsIds+goods_id+",";
                goodsAmounts=goodsAmounts+amount+",";
                totals=totals+parseFloat(total);
                // total=total.toFixed(2);

            })
            if(totals>selectMoneyByMailFun())
            {
                alert("你的余额不足，请先充值后购买");
            }
            else {


                console.log(Mail + " " + goodsIds + " " + goodsAmounts + " " + address + " " + timing + totals);
                deleteShoppingChartsFun(Mail,goodsIds);
                deductMoneyFun(totals);
                insertOrdersFun(Mail, goodsIds, goodsAmounts, timing,address, totals);
                alert("下单成功");
                windowOfShoppingCharts();

            }
        }
    }

}

function insertOrdersFun(Mail,goodsIds,goodsAmounts,timing,address,total) {

    $.ajax({
        data: JSON.stringify({mail:Mail,goods_id_list:goodsIds,goods_amount_list:goodsAmounts,address:address,timing:timing,total:total}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/insertOrders",
        success: function(data){
            //前端调用成功后，可以处理后端传回的json格式数据。
            /*if(response.success){
                alert(response.message);
            }*/
            // alert("下单成功");
        },
        error:function(data){
            // alert("insertOrdersFun error");

        }

    });
    
}

function deleteShoppingChartsFun(mail,goodsIds) {

    $.ajax({
        data: JSON.stringify({mail:mail,goods_id_list:goodsIds}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/deleteShoppingCharts",
        success: function(data){
            //前端调用成功后，可以处理后端传回的json格式数据。
            /*if(response.success){
                alert(response.message);
            }*/
        },
        error:function(data){
            // alert("deleteShoppingChartsFun error");
        }

    });

}

//扣钱
function deductMoneyFun(total) {
    var mail=getParam('mail');
    $.ajax({
        data: JSON.stringify({mail:mail,money:total}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/deductMoney",
        success: function(data){
            //前端调用成功后，可以处理后端传回的json格式数据。
            /*if(response.success){
                alert(response.message);
            }*/
        },
        error:function(data){
            // alert("deductMoneyFun error");
        }

    });


}

// function rechargeFun() {
//
//     console.log("in recharge");
//     ajaxRecharge();
//
//
// }

function rechargeSCFun() {

    console.log("in rechargeSCFun");
   // ajaxRecharge();
    var money = prompt("请输入充值金额：","");
    if(money) {
        console.log(money);
        var mail = getParam('mail');
        //todo:无法进入ajax
        $.ajax({
            data: JSON.stringify({mail: mail, money: money}),
            //type、contentType必填,指明传参方式
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "http://101.201.121.174:80/api/recharge",
            success: function (data) {
                alert(data);
                console.log("recharge ajax");
                windowOfShoppingCharts();

            },
            error: function (data) {
                alert("error");
                console.log("recharge ajax fail");
            }
        });
    }
    return 0;

}

function rechargeFun() {
    console.log("in rechargeFun");
    var money = prompt("请输入充值金额：","");
    if(money) {
        console.log(money);
        var mail = getParam('mail');
        //todo:无法进入ajax
        $.ajax({
            data: JSON.stringify({mail: mail, money: money}),
            //type、contentType必填,指明传参方式
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "http://101.201.121.174:80/api/recharge",
            success: function (data) {
                alert(data);
                console.log("recharge ajax");
                windowOfShowGoods();

            },
            error: function (data) {
                alert("error");
                console.log("recharge ajax fail");
            }
        });
    }
    return 0;
}


function setAll() {
    $("input[type='checkbox']").prop("checked", true);

}

function setNo() {
    $("input[type='checkbox']").prop("checked", false);
}

function logOffFun(){
    console.log("----in logOffFun----");
    var Mail=$("#mailId").val();
    var Password=$("#passwordId").val();

    $.ajax({
        data: JSON.stringify({mail:Mail,password:Password}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/logoff",
        success: function(data){
                alert(data);
        },
        error:function(data){
            alert("logoffFun error");
        }

    });


}

function getDataRowSalesman(h){

    var row = document.createElement('tr'); //创建行  

    var idCell = document.createElement('td');//创建第二列name  
    idCell.innerHTML = h.id;
    idCell.setAttribute('name','id'+h.id);
    idCell.setAttribute('class','id'+h.id);
    idCell.setAttribute('id','id'+h.id);
    row.appendChild(idCell);

    var nameCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(nameCell);
    var name = document.createElement('input'); //创建一个input控件  
    name.setAttribute('type','text'); //type="button"  
    name.setAttribute('name','name'+h.id);
    name.setAttribute('id','name'+h.id);
    name.setAttribute('value',h.goods_name);
    name.setAttribute('class','name'+h.id);
    nameCell.appendChild(name);  //把删除按钮加入td，别忘了 


    var costCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(costCell);
    var cost = document.createElement('input'); //创建一个input控件  
    cost.setAttribute('type','text'); //type="button"  
    cost.setAttribute('name','cost'+h.id);
    cost.setAttribute('id','cost'+h.id);
    cost.setAttribute('class','cost'+h.id);
    cost.setAttribute('value',h.cost);
    costCell.appendChild(cost);  //把删除按钮加入td，别忘了 

    // var priceCell = document.createElement('td');//创建第三列job  
    // priceCell.innerHTML = h.price;
    // priceCell.setAttribute('name','price');
    // row.appendChild(priceCell);

    var priceCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(priceCell);
    var price = document.createElement('input'); //创建一个input控件  
    price.setAttribute('type','text'); //type="button"  
    price.setAttribute('name','price'+h.id);
    price.setAttribute('id','price'+h.id);
    price.setAttribute('class','price'+h.id);
    price.setAttribute('value',h.price);
    priceCell.appendChild(price);  //把删除按钮加入td，别忘了 



    // var amountCell = document.createElement('td');//创建第三列job  
    // amountCell.innerHTML = h.amount;
    // amountCell.setAttribute('name','amount');
    // row.appendChild(amountCell);

    var amountCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(amountCell);
    var amount = document.createElement('input'); //创建一个input控件  
    amount.setAttribute('type','text'); //type="button"  
    amount.setAttribute('name','amount'+h.id);
    amount.setAttribute('id','amount'+h.id);
    amount.setAttribute('class','amount'+h.id);
    amount.setAttribute('value',h.amount);
    amountCell.appendChild(amount);  //把删除按钮加入td，别忘了 


    // var kindCell = document.createElement('td');//创建第三列job  
    // kindCell.innerHTML = h.kind;
    // kindCell.setAttribute('name','kind');
    // row.appendChild(kindCell);

    var kindCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(kindCell);
    var kind = document.createElement('input'); //创建一个input控件  
    kind.setAttribute('type','text'); //type="button"  
    kind.setAttribute('name','kind'+h.id);
    kind.setAttribute('id','kind'+h.id);
    kind.setAttribute('class','kind'+h.id);
    kind.setAttribute('value',h.kind);
    kindCell.appendChild(kind);  //把删除按钮加入td，别忘了 

    // var purchasedAmountCell = document.createElement('td');//创建第四列，操作列  
    // row.appendChild(purchasedAmountCell);
    // var pa = document.createElement('input'); //创建一个input控件  
    // pa.setAttribute('type','text'); //type="button"  
    // pa.setAttribute('name','purchasedAmount');
    // pa.setAttribute('value',1);
    // purchasedAmountCell.appendChild(pa);  //把删除按钮加入td，别忘了  

    var operationCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(operationCell);
    var del= document.createElement('input'); //创建一个input控件  
    del.setAttribute('type','button'); //type="button"  
    del.setAttribute('name','delete');
    del.setAttribute('value',"清仓");
    del.setAttribute('class',"submit");
    del.setAttribute('onclick',"deleteGoodsFun("+h.id+")");
    var store= document.createElement('input'); //创建一个input控件  
    store.setAttribute('type','button'); //type="button"  
    store.setAttribute('name','store');
    store.setAttribute('class',"submit");
    store.setAttribute('value',"保存修改");
    store.setAttribute('onclick',"updateGoodsFun("+h.id+")");
    operationCell.appendChild(del);  //把删除按钮加入td，别忘了 
    operationCell.appendChild(store);

    return row; //返回tr数据      
}

function getDataRowSM(h){

    var row = document.createElement('tr'); //创建行  

    var idCell = document.createElement('td');//创建第二列name  
    idCell.innerHTML = h.id;
    idCell.setAttribute('name','id'+h.id);
    idCell.setAttribute('class','id'+h.id);
    idCell.setAttribute('id','id'+h.id);
    row.appendChild(idCell);

    var nameCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(nameCell);
    var name = document.createElement('input'); //创建一个input控件  
    name.setAttribute('type','text'); //type="button"  
    name.setAttribute('name','name'+h.id);
    name.setAttribute('id','name'+h.id);
    name.setAttribute('value',h.goods_name);
    name.setAttribute('class','name'+h.id);
    nameCell.appendChild(name);  //把删除按钮加入td，别忘了 


    var costCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(costCell);
    var cost = document.createElement('input'); //创建一个input控件  
    cost.setAttribute('type','text'); //type="button"  
    cost.setAttribute('name','cost'+h.id);
    cost.setAttribute('id','cost'+h.id);
    cost.setAttribute('class','cost'+h.id);
    cost.setAttribute('value',h.cost);
    costCell.appendChild(cost);  //把删除按钮加入td，别忘了 

    // var priceCell = document.createElement('td');//创建第三列job  
    // priceCell.innerHTML = h.price;
    // priceCell.setAttribute('name','price');
    // row.appendChild(priceCell);

    var priceCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(priceCell);
    var price = document.createElement('input'); //创建一个input控件  
    price.setAttribute('type','text'); //type="button"  
    price.setAttribute('name','price'+h.id);
    price.setAttribute('id','price'+h.id);
    price.setAttribute('class','price'+h.id);
    price.setAttribute('value',h.price);
    priceCell.appendChild(price);  //把删除按钮加入td，别忘了 



    // var amountCell = document.createElement('td');//创建第三列job  
    // amountCell.innerHTML = h.amount;
    // amountCell.setAttribute('name','amount');
    // row.appendChild(amountCell);

    var amountCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(amountCell);
    var amount = document.createElement('input'); //创建一个input控件  
    amount.setAttribute('type','text'); //type="button"  
    amount.setAttribute('name','amount'+h.id);
    amount.setAttribute('id','amount'+h.id);
    amount.setAttribute('class','amount'+h.id);
    amount.setAttribute('value',h.amount);
    amountCell.appendChild(amount);  //把删除按钮加入td，别忘了 


    // var kindCell = document.createElement('td');//创建第三列job  
    // kindCell.innerHTML = h.kind;
    // kindCell.setAttribute('name','kind');
    // row.appendChild(kindCell);

    var kindCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(kindCell);
    var kind = document.createElement('input'); //创建一个input控件  
    kind.setAttribute('type','text'); //type="button"  
    kind.setAttribute('name','kind'+h.id);
    kind.setAttribute('id','kind'+h.id);
    kind.setAttribute('class','kind'+h.id);
    kind.setAttribute('value',h.kind);
    kindCell.appendChild(kind);  //把删除按钮加入td，别忘了 

    // var purchasedAmountCell = document.createElement('td');//创建第四列，操作列  
    // row.appendChild(purchasedAmountCell);
    // var pa = document.createElement('input'); //创建一个input控件  
    // pa.setAttribute('type','text'); //type="button"  
    // pa.setAttribute('name','purchasedAmount');
    // pa.setAttribute('value',1);
    // purchasedAmountCell.appendChild(pa);  //把删除按钮加入td，别忘了  

    var operationCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(operationCell);
    var del= document.createElement('input'); //创建一个input控件  
    del.setAttribute('type','button'); //type="button"  
    del.setAttribute('name','delete');
    del.setAttribute('value',"清仓");
    del.setAttribute('class',"submit");
    del.setAttribute('onclick',"deleteGoodsSMFun("+h.id+")");
    var store= document.createElement('input'); //创建一个input控件  
    store.setAttribute('type','button'); //type="button"  
    store.setAttribute('name','store');
    store.setAttribute('class',"submit");
    store.setAttribute('value',"保存修改");
    store.setAttribute('onclick',"updateGoodsSMFun("+h.id+")");
    operationCell.appendChild(del);  //把删除按钮加入td，别忘了 
    operationCell.appendChild(store);

    return row; //返回tr数据      
}

function getDataRowAdmin(h){

    var row = document.createElement('tr'); //创建行  

    var idCell = document.createElement('td');//创建第二列name  
    idCell.innerHTML = h.sid;
    idCell.setAttribute('name','id'+h.sid);
    idCell.setAttribute('class','id'+h.sid);
    idCell.setAttribute('id','id'+h.sid);
    row.appendChild(idCell);

    var pwdCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(pwdCell);
    var pwd = document.createElement('input'); //创建一个input控件  
    pwd.setAttribute('type','text'); //type="button"  
    pwd.setAttribute('name','pwd'+h.sid);
    pwd.setAttribute('id','pwd'+h.sid);
    pwd.setAttribute('value',h.password);
    pwd.setAttribute('class','pwd'+h.sid);
    pwdCell.appendChild(pwd);  //把删除按钮加入td，别忘了 

    var kindCell = document.createElement('td');//创建第二列name  
    kindCell.innerHTML = h.kind;
    kindCell.setAttribute('name','kind'+h.sid);
    kindCell.setAttribute('class','kind'+h.sid);
    kindCell.setAttribute('id','kind'+h.sid);
    row.appendChild(kindCell);

    var operationCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(operationCell);
    var del= document.createElement('input'); //创建一个input控件  
    del.setAttribute('type','button'); //type="button"  
    del.setAttribute('name','delete');
    del.setAttribute('value',"删除");
    del.setAttribute('class',"submit");
    del.setAttribute('onclick',"deleteSalesmanFun("+h.sid+")");

    var store= document.createElement('input'); //创建一个input控件  
    store.setAttribute('type','button'); //type="button"  
    store.setAttribute('name','store');
    store.setAttribute('class',"submit");
    store.setAttribute('value',"重置");
    store.setAttribute('onclick',"updateSalesmanFun("+h.sid+")");
    operationCell.appendChild(del);  //把删除按钮加入td，别忘了 
    operationCell.appendChild(store);
    return row; //返回tr数据      
}

function getDataRowSP(h){

    var row = document.createElement('tr'); //创建行  

    var idCell = document.createElement('td');//创建第二列name  
    idCell.innerHTML = h.sid;
    row.appendChild(idCell);

    var kindCell = document.createElement('td');//创建第二列name  
    kindCell.innerHTML = h.kind;
    row.appendChild(kindCell);

    var amountCell = document.createElement('td');//创建第二列name  
    amountCell.innerHTML = h.amount;
    row.appendChild(amountCell);

    var moneyCell = document.createElement('td');//创建第二列name  
    moneyCell.innerHTML = h.money;
    row.appendChild(moneyCell);
    return row; //返回tr数据      
}
// var flag1=0;
function addRowAdmin() {

    if(flag>0)
    {
        alert("一次只能入库一件商品");
        return;
    }
    flag=flag+1;
    var i=0;
    console.log(i);
    var tbody = document.getElementById('tbodyOfGoods');
    var row = document.createElement('tr'); //创建行   

    var idCell = document.createElement('td');//创建第二列name  
    idCell.innerHTML = "自增";
    idCell.setAttribute('id',i+'id');
    row.appendChild(idCell);


    var pwdCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(pwdCell);
    var pwd = document.createElement('input'); //创建一个input控件  
    pwd.setAttribute('type','text'); //type="button"  
    pwd.setAttribute('name','pwd');
    pwd.setAttribute('id',i+'pwd');
    pwdCell.appendChild(pwd);  //把删除按钮加入td，别忘了 

    var kindCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(kindCell);
    var kind = document.createElement('input'); //创建一个input控件  
    kind.setAttribute('type','text'); //type="button"  
    kind.setAttribute('name','kind');
    // name.setAttribute('id','userName');
    kind.setAttribute('id',i+'kind');
    // name.setAttribute('value',h.goods_name);
    kindCell.appendChild(kind);  //把删除按钮加入td，别忘了 

    var operationCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(operationCell);
    var del= document.createElement('input'); //创建一个input控件  
    del.setAttribute('type','button'); //type="button"  
    del.setAttribute('name','insert');
    del.setAttribute('class','submit');
    del.setAttribute('value',"添加");
    del.setAttribute('id','insert');
    // del.setAttribute('class','delHero');
    del.setAttribute('onclick',"insertSalesmanFun("+i+")");
    operationCell.appendChild(del);  //把删除按钮加入td，别忘了 
    tbody.appendChild(row);
}

var flag=0;
function addRow() {

    if(flag>0)
    {
        alert("一次只能入库一件商品");
        return;
    }
    flag=flag+1;
    var i=0;
    console.log(i);
    var tbody = document.getElementById('tbodyOfGoods');
    var row = document.createElement('tr'); //创建行   


    var idCell = document.createElement('td');//创建第二列name  
    idCell.innerHTML = "自增";
    idCell.setAttribute('id',i+'id');
    row.appendChild(idCell);

    // var nameCell = document.createElement('td');//创建第二列name  
    // nameCell.innerHTML = h.goods_name;
    // nameCell.setAttribute('name','name');
    // row.appendChild(nameCell);

    var nameCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(nameCell);
    var name = document.createElement('input'); //创建一个input控件  
    name.setAttribute('type','text'); //type="button"  
    name.setAttribute('name','name');
    // name.setAttribute('id','userName');
    name.setAttribute('id',i+'name');
    // name.setAttribute('value',h.goods_name);
    nameCell.appendChild(name);  //把删除按钮加入td，别忘了 


    var costCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(costCell);
    var cost = document.createElement('input'); //创建一个input控件  
    cost.setAttribute('type','text'); //type="button"  
    cost.setAttribute('id',i+'cost');
    // cost.setAttribute('value',h.cost);
    costCell.appendChild(cost);  //把删除按钮加入td，别忘了 

    // var priceCell = document.createElement('td');//创建第三列job  
    // priceCell.innerHTML = h.price;
    // priceCell.setAttribute('name','price');
    // row.appendChild(priceCell);

    var priceCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(priceCell);
    var price = document.createElement('input'); //创建一个input控件  
    price.setAttribute('type','text'); //type="button"  
    price.setAttribute('id',i+'price');
    // price.setAttribute('value',h.price);
    priceCell.appendChild(price);  //把删除按钮加入td，别忘了 



    // var amountCell = document.createElement('td');//创建第三列job  
    // amountCell.innerHTML = h.amount;
    // amountCell.setAttribute('name','amount');
    // row.appendChild(amountCell);

    var amountCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(amountCell);
    var amount = document.createElement('input'); //创建一个input控件  
    amount.setAttribute('type','text'); //type="button"  
    amount.setAttribute('id',i+'amount');
    // amount.setAttribute('value',h.amount);
    amountCell.appendChild(amount);  //把删除按钮加入td，别忘了 


    // var kindCell = document.createElement('td');//创建第三列job  
    // kindCell.innerHTML = h.kind;
    // kindCell.setAttribute('name','kind');
    // row.appendChild(kindCell);

    var kindCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(kindCell);
    var kind = document.createElement('input'); //创建一个input控件  
    kind.setAttribute('type','text'); //type="button"  
    kind.setAttribute('id',i+'kind');
    // kind.setAttribute('value',h.kind);
    kindCell.appendChild(kind);  //把删除按钮加入td，别忘了 

    // var purchasedAmountCell = document.createElement('td');//创建第四列，操作列  
    // row.appendChild(purchasedAmountCell);
    // var pa = document.createElement('input'); //创建一个input控件  
    // pa.setAttribute('type','text'); //type="button"  
    // pa.setAttribute('name','purchasedAmount');
    // pa.setAttribute('value',1);
    // purchasedAmountCell.appendChild(pa);  //把删除按钮加入td，别忘了  

    var operationCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(operationCell);
    var del= document.createElement('input'); //创建一个input控件  
    del.setAttribute('type','button'); //type="button"  
    del.setAttribute('name','insert');
    del.setAttribute('class','submit');
    del.setAttribute('value',"入库");
    del.setAttribute('id','insert');
    // del.setAttribute('class','delHero');
    del.setAttribute('onclick',"insertGoodsFun("+i+")");
    operationCell.appendChild(del);  //把删除按钮加入td，别忘了 

    tbody.appendChild(row);
}

function addRowSM() {

    if(flag>0)
    {
        alert("一次只能入库一件商品");
        return;
    }
    flag=flag+1;
    var i=0;
    console.log(i);
    var tbody = document.getElementById('tbodyOfGoods');
    var row = document.createElement('tr'); //创建行   


    var idCell = document.createElement('td');//创建第二列name  
    idCell.innerHTML = "自增";
    idCell.setAttribute('id',i+'id');
    row.appendChild(idCell);

    // var nameCell = document.createElement('td');//创建第二列name  
    // nameCell.innerHTML = h.goods_name;
    // nameCell.setAttribute('name','name');
    // row.appendChild(nameCell);

    var nameCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(nameCell);
    var name = document.createElement('input'); //创建一个input控件  
    name.setAttribute('type','text'); //type="button"  
    name.setAttribute('name','name');
    // name.setAttribute('id','userName');
    name.setAttribute('id',i+'name');
    // name.setAttribute('value',h.goods_name);
    nameCell.appendChild(name);  //把删除按钮加入td，别忘了 


    var costCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(costCell);
    var cost = document.createElement('input'); //创建一个input控件  
    cost.setAttribute('type','text'); //type="button"  
    cost.setAttribute('id',i+'cost');
    // cost.setAttribute('value',h.cost);
    costCell.appendChild(cost);  //把删除按钮加入td，别忘了 

    // var priceCell = document.createElement('td');//创建第三列job  
    // priceCell.innerHTML = h.price;
    // priceCell.setAttribute('name','price');
    // row.appendChild(priceCell);

    var priceCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(priceCell);
    var price = document.createElement('input'); //创建一个input控件  
    price.setAttribute('type','text'); //type="button"  
    price.setAttribute('id',i+'price');
    // price.setAttribute('value',h.price);
    priceCell.appendChild(price);  //把删除按钮加入td，别忘了 



    // var amountCell = document.createElement('td');//创建第三列job  
    // amountCell.innerHTML = h.amount;
    // amountCell.setAttribute('name','amount');
    // row.appendChild(amountCell);

    var amountCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(amountCell);
    var amount = document.createElement('input'); //创建一个input控件  
    amount.setAttribute('type','text'); //type="button"  
    amount.setAttribute('id',i+'amount');
    // amount.setAttribute('value',h.amount);
    amountCell.appendChild(amount);  //把删除按钮加入td，别忘了 


    // var kindCell = document.createElement('td');//创建第三列job  
    // kindCell.innerHTML = h.kind;
    // kindCell.setAttribute('name','kind');
    // row.appendChild(kindCell);

    var kindCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(kindCell);
    var kind = document.createElement('input'); //创建一个input控件  
    kind.setAttribute('type','text'); //type="button"  
    kind.setAttribute('id',i+'kind');
    // kind.setAttribute('value',h.kind);
    kindCell.appendChild(kind);  //把删除按钮加入td，别忘了 

    // var purchasedAmountCell = document.createElement('td');//创建第四列，操作列  
    // row.appendChild(purchasedAmountCell);
    // var pa = document.createElement('input'); //创建一个input控件  
    // pa.setAttribute('type','text'); //type="button"  
    // pa.setAttribute('name','purchasedAmount');
    // pa.setAttribute('value',1);
    // purchasedAmountCell.appendChild(pa);  //把删除按钮加入td，别忘了  

    var operationCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(operationCell);
    var del= document.createElement('input'); //创建一个input控件  
    del.setAttribute('type','button'); //type="button"  
    del.setAttribute('name','insert');
    del.setAttribute('class','submit');
    del.setAttribute('value',"入库");
    del.setAttribute('id','insert');
    // del.setAttribute('class','delHero');
    del.setAttribute('onclick',"insertGoodsSMFun("+i+")");
    operationCell.appendChild(del);  //把删除按钮加入td，别忘了 

    tbody.appendChild(row);
}

function insertGoodsFun(i) {

    console.log("in insertGoodsFun")
    $.ajax({
        data: JSON.stringify({name:$("#"+i+"name").val(),cost:$("#"+i+"cost").val(),price:$("#"+i+"price").val(),amount:$("#"+i+"amount").val(),kind:$("#"+i+"kind").val()}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/insertGoods",
        success: function(data)
        {
            alert("入库成功");
            window.location.href="http://101.201.121.174:80/api/salesmanPage?"+"id="+getParam("id");

        },
        error:function(data){
            alert("入库失败，请输入正确的数据格式");
        }

    });



}

function insertGoodsSMFun(i) {

    console.log("in insertGoodsFun")
    $.ajax({
        data: JSON.stringify({name:$("#"+i+"name").val(),cost:$("#"+i+"cost").val(),price:$("#"+i+"price").val(),amount:$("#"+i+"amount").val(),kind:$("#"+i+"kind").val()}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/insertGoods",
        success: function(data)
        {
            alert("入库成功");
            windowOfStockManagement();

        },
        error:function(data){
            alert("入库失败，请输入正确的数据格式");
        }

    });



}

function insertSalesmanFun(i) {

    console.log("in insertSalesmanFun")
    $.ajax({
        data: JSON.stringify({pwd:$("#"+i+"pwd").val(),kind:$("#"+i+"kind").val()}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/insertSalesman",
        success: function(data)
        {
            alert("添加成功");
            window.location.href="http://101.201.121.174:80/api/administratorPage";

        },
        error:function(data){
            alert("添加失败，请输入正确的数据格式");
        }

    });



}

function deleteGoodsFun(rowId) {
    console.log("in deleteGoodsFun");
    $.ajax({
        data: JSON.stringify({id:$("#id"+rowId).html()}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/deleteGoods",
        success: function(data){
            alert("清仓成功");
            window.location.href="http://101.201.121.174:80/api/salesmanPage?"+"id="+getParam("id");

        },
        error:function(data){
            alert("deleteGoodsFun error");
        }

    });


}

function deleteGoodsSMFun(rowId) {
    console.log("in deleteGoodsFun");
    $.ajax({
        data: JSON.stringify({id:$("#id"+rowId).html()}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/deleteGoods",
        success: function(data){
            alert("清仓成功");
            windowOfStockManagement();

        },
        error:function(data){
            alert("deleteGoodsFun error");
        }

    });


}

function deleteSalesmanFun(rowId) {
    console.log("in deleteSalesmanFun");
    $.ajax({
        data: JSON.stringify({id:$("#id"+rowId).html()}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/deleteSalesman",
        success: function(data){
            alert("删除成功");
            window.location.href="http://101.201.121.174:80/api/administratorPage";

        },
        error:function(data){
            alert("deleteSalesmanFun error");
        }

    });


}

function updateGoodsFun(rowId) {
    console.log("in updateGoodsFun");
    console.log($("#id"+rowId).html()+" "+$("#name"+rowId).val()+" "+$("#cost"+rowId).val()+" "+$("#price"+rowId).val()+" "+$("#amount"+rowId).val()+" "+$("#kind"+rowId).val());
    $.ajax({
        data: JSON.stringify({id:$("#id"+rowId).html(),name:$("#name"+rowId).val(),cost:$("#cost"+rowId).val(),price:$("#price"+rowId).val(),amount:$("#amount"+rowId).val(),kind:$("#kind"+rowId).val()}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/updateGoods",
        success: function(data){
            alert("修改成功");
            window.location.href="http://101.201.121.174:80/api/salesmanPage?"+"id="+getParam("id");

        },
        error:function(data){
            alert("updateGoodsFun error");
        }

    });
}

function updateGoodsSMFun(rowId) {
    console.log("in updateGoodsFun");
    console.log($("#id"+rowId).html()+" "+$("#name"+rowId).val()+" "+$("#cost"+rowId).val()+" "+$("#price"+rowId).val()+" "+$("#amount"+rowId).val()+" "+$("#kind"+rowId).val());
    $.ajax({
        data: JSON.stringify({id:$("#id"+rowId).html(),name:$("#name"+rowId).val(),cost:$("#cost"+rowId).val(),price:$("#price"+rowId).val(),amount:$("#amount"+rowId).val(),kind:$("#kind"+rowId).val()}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/updateGoods",
        success: function(data){
            alert("修改成功");
            windowOfStockManagement();

        },
        error:function(data){
            alert("updateGoodsFun error");
        }

    });
}

function updateSalesmanFun(rowId) {
    console.log("in updateSalesmanFun");
    $.ajax({
        data: JSON.stringify({id:$("#id"+rowId).html(),pwd:$("#pwd"+rowId).val()}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/updateSalesman",
        success: function(data){
            alert("修改成功");
            window.location.href="http://101.201.121.174:80/api/administratorPage";

        },
        error:function(data){
            alert("updateGoodsFun error");
        }

    });
}

function getDataRowSales(h) {

var nameAmount=nameAmountFun(h.id);
if(nameAmount=="")
{
    return 0;
}
        var row = document.createElement('tr'); //创建行  
        var idCell = document.createElement('td');//创建第二列name  
        idCell.innerHTML = h.id;
        idCell.setAttribute('name','id'+h.id);
        idCell.setAttribute('class','id'+h.id);
        idCell.setAttribute('id','id'+h.id);
        row.appendChild(idCell);

    var mailCell = document.createElement('td');//创建第二列name  
    mailCell.innerHTML = h.mail;
    row.appendChild(mailCell);

    var goodsCell= document.createElement('td');//创建第二列name  
    goodsCell.innerHTML = nameAmount;
    row.appendChild(goodsCell);

    var timeCell = document.createElement('td');//创建第二列name  
    timeCell.innerHTML = h.time;
    row.appendChild(timeCell);

    var addressCell = document.createElement('td');//创建第二列name  
    addressCell.innerHTML = h.address;
    row.appendChild(addressCell);

    var totalCell = document.createElement('td');//创建第二列name  
    totalCell.innerHTML = h.total;
    row.appendChild(totalCell);

        return row; //返回tr数据      

}

function nameAmountFun(id) {

    var nameAmount="";
    var sid=getParam('id');
    $.ajax({
        data: JSON.stringify({id:id,sid:sid}),
        //type、contentType必填,指明传参方式
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/orderNameListById",
        success: function(data){
            nameAmount=data;
        },
        error:function(data){
            alert("error");
        }

    });
    return nameAmount;
}

function selectSubStringFun() {
    var subString=$("#selectGoods").val();
    var Mail=getParam('mail');
    $.ajax({
        data: JSON.stringify({subString:subString,Mail:Mail}),
        //type、contentType必填,指明传参方式
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/selectSubString",
        success: function(data){
            console.log(data);
            $("#showGoods tbody").html("");
            var tbody = document.getElementById('tbodyOfGoods');
            for(var i = 0;i < data.length; i++) { //遍历一下json数据  
                var trow = getDataRow(data[i]); //定义一个方法,返回tr数据  
                tbody.appendChild(trow);
            }
        },
        error:function(data){
            alert("error");
        }

    });
}

function maybeLikeGoodsFun() {
    // var subString=$("#selectGoods").val();
    var Mail=getParam('mail');
    $.ajax({
        data: JSON.stringify({Mail:Mail}),
        //type、contentType必填,指明传参方式
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/maybeLikeGoods",
        success: function(data){
            console.log(data);
            $("#showGoods tbody").html("");
            var tbody = document.getElementById('tbodyOfGoods');
            for(var i = 0;i < data.length; i++) { //遍历一下json数据  
                var trow = getDataRow(data[i]); //定义一个方法,返回tr数据  
                tbody.appendChild(trow);
            }
        },
        error:function(data){
            alert("error");
        }

    });
}

function userLogOff() {
    console.log("logoff");
    var mail=getParam("mail");
    console.log("mail:"+mail);
    $.ajax({
        data: JSON.stringify({mail:mail}),
        //type、contentType必填,指明传参方式
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "http://101.201.121.174:80/api/logoff",
        success: function(data){
            console.log("成功");
            window.location.href="http://101.201.121.174:80/api/loginPage";
        },
        error:function(data){
            console.log("失败");
        }
    });

}
