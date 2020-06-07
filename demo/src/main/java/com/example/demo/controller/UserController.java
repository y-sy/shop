package com.example.demo.controller;

/*
import com.example.demo.entity.User;
import com.example.demo.service.UserService;*/
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.*;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
//RestController 返回的数据是json格式的
//RequestMapping 映射地址
//RequestParam 请求参数,前端传入
//get从后端拿我要的数据（如，通过id获得其他数据），post发数据给后端存起来（或验证）登录 注册
//RequestBody Post方法的请求体
//Autowired 它可以对类成员变量，方法及构造函数进行标注，完成自动装配的工作
public class UserController
{

    @Autowired
    private UserService userService;

   /*@RequestMapping("")
    public String a(){
        return "你好";
    }

    @RequestMapping(value = "/hh",method = RequestMethod.GET)
    public String hh(@RequestParam String name)
    {
        return "hello "+name;
    }

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String getHello() {
        return "Hello,Word!!!";
    }*/

    @RequestMapping(value = "/api/administratorPage")
    public String administratorPage() {
        return "administrator";
    }

    @RequestMapping(value = "/api/goodsPage")
    public String goodsPage() {
        return "goods";
    }

    @RequestMapping(value = "/api/loginPage")
    public String loginPage() {
        return "login";
    }

    @RequestMapping(value = "/api/registerPage")
    public String registerPage() {
        return "register";
    }

    @RequestMapping(value = "/api/showGoodsPage")
    public String showGoodsPage() {
        return "showGoods";
    }

    @RequestMapping(value = "/api/shoppingChartsPage")
    public String shoppingChartsPage() {
        return "shoppingCharts";
    }

    @RequestMapping(value = "/api/orderPage")
    public String orderPage() {
        return "order";
    }

    @RequestMapping(value = "/api/logoffPage")
    public String logoffPage() {
        return "logoff";
    }

    @RequestMapping(value = "/api/salesmanPage")
    public String salesmanPage() {
        return "salesman";
    }

    @RequestMapping(value = "/api/salesPage")
    public String salesPage() {
        return "sales";
    }

    @RequestMapping(value = "/api/logPage")
    public String logPage() {
        return "log";
    }

    @RequestMapping(value = "/api/salesPerformancePage")
    public String salesPerformancePage() {
        return "salesPerformance";
    }

    @RequestMapping(value = "/api/stockManagementPage")
    public String stockManagementPage() {
        return "stockManagement";
    }

    @RequestMapping(value="/api/register",method=RequestMethod.POST)
    @ResponseBody
    public String register(@RequestBody Map<String,String> info)
    {
        System.out.println("----in register----");
        User user=new User(info.get("mail"),info.get("password"));
        return userService.addUser(user);
    }

    @RequestMapping(value="/api/login",method=RequestMethod.POST)
    @ResponseBody
    public String login(@RequestBody Map<String,String> info, HttpServletRequest request) throws IOException {
        System.out.println("----in login----");
        User user=new User(info.get("mail"),info.get("password"));
        String ip=IpUtils.getIpAddr(request);
        System.out.println(ip);
        return userService.selectUser(user,ip);
    }

    @RequestMapping(value="/api/salesmanLogin",method=RequestMethod.POST)
    @ResponseBody
    public String salesmanLogin(@RequestBody Map<String,String> info) throws IOException {
        System.out.println("----in salesmanLogin----");
//        Salesman salesman=new Salesman(Integer.parseInt(info.get("mail")),info.get("password"));
        return userService.selectSalesman(info.get("mail"),info.get("password"));
    }

    @RequestMapping(value="/api/showGoods",method=RequestMethod.POST)
    @ResponseBody
    public List<JSONObject> showGoods()
    {
        System.out.println("----in showGoods----");
        return userService.selectALLGoods();

    }

    @RequestMapping(value="/api/showGoodsByKind",method=RequestMethod.POST)
    @ResponseBody
    public List<JSONObject> showGoodsByKind(@RequestBody Map<String,String> info)
    {
        System.out.println("----in showGoodsByKind----");
        /* System.out.println(userService.selectALLGoods().get(0).getId());*/
//        JSONPObject jsonpObject=userService.selectALLGoods().;
        return userService.showGoodsByKind(Integer.parseInt(info.get("id")));

    }

//    @RequestMapping(value="/api/showGoods",method=RequestMethod.POST)
//    @ResponseBody
//    public List<JSONObject> showGoods()
//    {
//        System.out.println("----in showGoods----");
//        /* System.out.println(userService.selectALLGoods().get(0).getId());*/
////        JSONPObject jsonpObject=userService.selectALLGoods().;
//        return userService.showGoods();
//
//    }

    @RequestMapping(value="/api/showSalesman",method=RequestMethod.POST)
    @ResponseBody
    public List<JSONObject> showSalesman()
    {
        System.out.println("----in showSalesman----");
        return userService.selectALLSalesman();

    }

    @RequestMapping(value="/api/insertShoppingCharts",method=RequestMethod.POST)
    @ResponseBody
    public String insertShoppingCharts(@RequestBody Map<String,String> info)
    {
        System.out.println("----in insertShoppingCharts----");
        ShoppingCharts shoppingCharts=new ShoppingCharts(info.get("user_id"),Integer.parseInt(info.get("goods_id")),Integer.parseInt(info.get("amount")));
        return userService. addShoppingCharts(shoppingCharts);

    }

    @RequestMapping(value="/api/showShoppingCharts",method=RequestMethod.POST)
    @ResponseBody
    public List<JSONObject> showShoppingCharts(@RequestBody Map<String,String> info)
    {
        System.out.println("----in showShoppingCharts----");
        return userService.selectShoppingChartByMail(info.get("mail"));

    }

    @RequestMapping(value="/api/selectGoodsById",method=RequestMethod.POST)
    @ResponseBody
    public List<JSONObject> selectGoodsById(@RequestBody Map<String,String> info)
    {
        System.out.println("----in selectGoodsById----");
        return userService.selectGoodsById(Integer.parseInt(info.get("id")));

    }

    @RequestMapping(value="/api/selectUserByMail",method=RequestMethod.POST)
    @ResponseBody
    public List<JSONObject> selectUserByMail(@RequestBody Map<String,String> info)
    {
        System.out.println("----in selectMoneyByMail.----");
////        return userService.selectGoodsById(Integer.parseInt(info.get("id")));
        return userService.selectUserByMail(info.get("mail"));

    }

    @RequestMapping(value="/api/insertOrders",method=RequestMethod.POST)
    @ResponseBody
    public String insertOrders(@RequestBody Map<String,String> info)
    {
        System.out.println("----in insertOrders----");

//        List<Integer> idList= java.util.Arrays.aslist(ids);
    Orders orders=new Orders(info.get("mail"),info.get("address"),info.get("timing"),Float.parseFloat(info.get("total")),info.get("goods_id_list"),info.get("goods_amount_list"));
    System.out.println(orders.getTiming());
    return userService.insertOrders(orders);
    }

    @RequestMapping(value="/api/deleteShoppingCharts",method=RequestMethod.POST)
    @ResponseBody
    public String deleteShoppingCharts(@RequestBody Map<String,String> info)
    {
        System.out.println("----in deleteShoppingCharts----");
        return userService.deleteShoppingCharts(info.get("mail"),info.get("goods_id_list"));

    }

    @RequestMapping(value="/api/deductMoney",method=RequestMethod.POST)
    @ResponseBody
    public String deductMoney(@RequestBody Map<String,String> info)
    {
        System.out.println("----in deductMoney----");
        return userService.deductMoney(info.get("mail"),Float.parseFloat(info.get("money")));

    }

    @RequestMapping(value="/api/recharge",method=RequestMethod.POST)
    @ResponseBody
    public String recharge(@RequestBody Map<String,String> info)
    {
        System.out.println("----in recharge----");
        return userService.recharge(info.get("mail"),Float.parseFloat(info.get("money")));
    }

    @RequestMapping(value="/api/logoff",method=RequestMethod.POST)
    @ResponseBody
    public void logoff(@RequestBody Map<String,String> info, HttpServletRequest request)
    {
        System.out.println("---------------in logoff----");
        String ip=IpUtils.getIpAddr(request);
        userService.logoff(info.get("mail"),ip);
    }

    @RequestMapping(value="/api/deleteGoods",method=RequestMethod.POST)
    @ResponseBody
    public String deleteGoods(@RequestBody Map<String,String> info)
    {
        System.out.println("----in deleteGoods----");
        return userService.deleteGoods(Integer.parseInt(info.get("id")));
    }

    @RequestMapping(value="/api/deleteSalesman",method=RequestMethod.POST)
    @ResponseBody
    public String deleteSalesman(@RequestBody Map<String,String> info)
    {
        System.out.println("----in deleteSalesman----");
        return userService.deleteSalesman(Integer.parseInt(info.get("id")));
    }

    @RequestMapping(value="/api/updateGoods",method=RequestMethod.POST)
    @ResponseBody
    public String updateGoods(@RequestBody Map<String,String> info)
    {
        System.out.println("----in updateGoods----");
        Goods goods=new Goods(Integer.parseInt(info.get("id")),info.get("name"),Float.parseFloat(info.get("cost")),Float.parseFloat(info.get("price")),Integer.parseInt(info.get("amount")),info.get("kind"));
        return userService.updateGoods(goods);
    }

    @RequestMapping(value="/api/updateSalesman",method=RequestMethod.POST)
    @ResponseBody
    public String updateSalesman(@RequestBody Map<String,String> info)
    {
        System.out.println("----in updateSalesman----");
        return userService.updateSalesman(Integer.parseInt(info.get("id")),info.get("pwd"));
    }


    @RequestMapping(value="/api/insertGoods",method=RequestMethod.POST)
    @ResponseBody
    public String insertGoods(@RequestBody Map<String,String> info)
    {
        System.out.println("----in insertGoods----");
        Goods goods=new Goods(info.get("name"),Float.parseFloat(info.get("cost")),Float.parseFloat(info.get("price")),Integer.parseInt(info.get("amount")),info.get("kind"));
        return userService.insertGoods(goods);
    }

    @RequestMapping(value="/api/insertSalesman",method=RequestMethod.POST)
    @ResponseBody
    public String insertSalesman(@RequestBody Map<String,String> info)
    {
        System.out.println("----in insertSalesman----");
        Salesman salesman=new Salesman(info.get("pwd"),info.get("kind"));
        return userService.insertSalesman(salesman);
    }



    @RequestMapping(value="/api/showSales",method=RequestMethod.POST)
    @ResponseBody
    public List<JSONObject> showSales()
    {
        System.out.println("----in showSales----");
        return userService.selectALLOrders();

    }

    @RequestMapping(value="/api/orderNameListById",method=RequestMethod.POST)
    @ResponseBody
    public String orderNameListById(@RequestBody Map<String,String> info)
    {
        System.out.println("----in orderNameListById----");
        return userService.orderNameListById(Integer.parseInt(info.get("id")),Integer.parseInt(info.get("sid")));

    }

    @RequestMapping(value="/api/selectSubString",method=RequestMethod.POST)
    @ResponseBody
    public List<JSONObject> selectSubString(@RequestBody Map<String,String> info)
    {
        System.out.println("----in selectSubString----");
        return userService.selectSubString(info.get("subString"),info.get("Mail"));

    }

    @RequestMapping(value="/api/maybeLikeGoods",method=RequestMethod.POST)
    @ResponseBody
    public List<JSONObject> maybeLikeGoods(@RequestBody Map<String,String> info)
    {
        System.out.println("----in maybeLikeGoods----");
        return userService.maybeLikeGoods(info.get("Mail"));

    }

    @RequestMapping(value="/api/showLog",method=RequestMethod.POST)
    @ResponseBody
    public ArrayList<String> showLog() throws IOException {
        return userService.readFromTextFile("src/log.txt");

    }

    @RequestMapping(value="/api/showSalesPerformance",method=RequestMethod.POST)
    @ResponseBody
    public List<JSONObject> showSalesPerformance() throws IOException {
        return userService.showSalesPerformance();

    }


}
