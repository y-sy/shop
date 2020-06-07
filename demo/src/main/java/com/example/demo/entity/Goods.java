package com.example.demo.entity;

public class Goods
{
    int id;
    String goods_name;
    float cost;
    float price;
    int amount;
    String kind;

    public Goods(int id,String goods_name,float cost,float price,int amount,String kind)
    {
        this.id=id;
        this.goods_name=goods_name;
        this.cost=cost;
        this.price=price;
        this.amount=amount;
        this.kind=kind;
    }

    public Goods(String goods_name,float cost,float price,int amount,String kind)
    {
        this.id=0;
        this.goods_name=goods_name;
        this.cost=cost;
        this.price=price;
        this.amount=amount;
        this.kind=kind;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setGoods_name(String name) {
        this.goods_name = name;
    }


    public String getGoods_name() {
        return goods_name;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }


    public float getCost() {
        return cost;
    }

    public void setPrice(float price) {
        this.price = price;
    }


    public float getPrice() {
        return price;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getAmount() {
        return amount;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }


    public String getKind() {
        return kind;
    }

}

