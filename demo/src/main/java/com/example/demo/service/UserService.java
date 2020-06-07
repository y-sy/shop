package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.*;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public interface UserService
{
    public String addUser(User user);

    public String selectUser(User user,String ip) throws IOException;

    public String selectSalesman(String sid,String password);

    public List<JSONObject> selectALLGoods();

    public List<JSONObject> showGoodsByKind(int id);

//    public List<JSONObject> showGoods();

    public List<JSONObject> selectALLSalesman();

    public String addShoppingCharts(ShoppingCharts shoppingCharts);

    public List<JSONObject> selectShoppingChartByMail(String mail);

    public List<JSONObject> selectGoodsById(int id);

    public List<JSONObject> selectUserByMail(String mail);

    public String insertOrders(Orders orders);

    public String deleteShoppingCharts(String mail,String goods_id_list);

    public String deductMoney(String mail,float money);

    public String recharge(String mail,float money);

    public String deleteUser(User user);

    public String deleteGoods(int id);

    public String deleteSalesman(int sid);

    public String updateGoods(Goods goods);

    public String updateSalesman(int sid,String pwd);

    public String insertGoods(Goods goods);

    public String insertSalesman(Salesman salesman);

    public List<JSONObject> selectALLOrders();

    public String orderNameListById(int id,int sid);

    public List<JSONObject> selectSubString(String subString,String mail);

    public List<JSONObject> maybeLikeGoods(String mail);

    public ArrayList<String> readFromTextFile(String pathname) throws IOException;

    public  List<String> getStringList(String text) throws Exception;

    public String userCF(String mail);

    public List<JSONObject> showSalesPerformance();

    public void logoff(String mail,String ip);

}
