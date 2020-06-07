package com.example.demo.entity;

public class ShoppingCharts {

    private String user_id;
    private int goods_id;
    private  int amount;

    public ShoppingCharts(String uid,int gid,int a)
    {
        this.user_id=uid;
        this.goods_id=gid;
        this.amount=a;
    }


    public void setUser_id(String uid) {
        this.user_id = uid;
    }

    public String getUser_id() { return user_id; }

    public void setGoods_id(int id) {
        this.goods_id = id;
    }

    public int getGoods_id() {
        return goods_id;
    }

    public void setAmount(int a) {
        this.amount = a;
    }

    public int getAmount() {
        return amount;
    }

}
