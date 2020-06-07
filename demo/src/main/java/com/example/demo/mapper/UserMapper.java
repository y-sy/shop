package com.example.demo.mapper;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.*;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface UserMapper {
    public void addUser(User user);

    public void addPortraitOfUser(String mail);

    public List<User> selectALLUser();

    public List<JSONObject> selectALLSalesman();

    public List<JSONObject> selectALLGoods();

//    public User selectALL(String mail);

    public void addShoppingCharts(ShoppingCharts shoppingCharts);

    public List<JSONObject> selectShoppingChartByMail(String mail);

    public List<JSONObject> selectGoodsById(int id);

    public void updateGoodsAmount(int amount,int id);

    public List<JSONObject> selectALLShoppingCharts();

    public void updateShoppingCharts(ShoppingCharts shoppingCharts);

    public List<JSONObject> selectUserByMail(String mail);

    public List<JSONObject> selectSalesmanById(int id);

    public List<JSONObject> selectGoodsByKind(String kind);

//    public void insertOrders(String mail,String goods_id_list,String goods_amount_list,String address,String time,float total);

    public void insertOrders(Orders orders);


//userMapper.insertOrders(orders.getMail(),+orders.getGoods_id_list(),+orders.getGoods_amount_list(),orders.getAddress(),orders.getTiming(),orders.getTotal());

    public void deleteShoppingChart(String mail, int goods_id);

    public void deductMoney(String mail, float money);

    public void recharge(String mail, float money);

    public void deleteUser(User user);

    public void deleteGoods(int id);

    public void deleteSalesman(int sid);

    public void updateGoods(Goods goods);

    public void updateSalesman(int sid,String pwd);

    public void insertGoods(Goods goods);

    public void insertSalesman(Salesman salesman);

    public List<JSONObject> selectALLOrders();

    public List<JSONObject> orderNameListById(int id);

    public List<JSONObject> selectAllPOU();

    public void updatePOU(String mail,String like_keywords,String search_keywords);

    public void updatePOUC(String mail,String like_keywords,String chart_keywords);

    public int countOfPOU();

    public List<JSONObject> selectAllPOU_mail_likeKeywords();

    public List<JSONObject> selectKindBySid(int sid);
}
