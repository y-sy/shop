package com.example.demo.entity;

import java.util.Date;
import java.util.List;

public class Orders {
    private int id;
    private String mail,address,timing,goods_id_list,goods_amount_list;
    private float total;
    public Orders(String mail,String address,String timing,float total,String ids,String amounts)
    {
        this.mail=mail;
        this.address=address;
        this.timing=timing;
        this.total=total;
        this.goods_id_list=ids;
        this.goods_amount_list=amounts;
    }


    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getMail() {
        return mail;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public void setTiming(String timing) {
        this.timing = timing;
    }

    public String getTiming() {
        return timing;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public float getTotal() {
        return total;
    }

    public void setGoods_id_list(String ids) {
        this.goods_id_list = ids;
    }

    public String getGoods_id_list() {
        return goods_id_list;
    }

    public void setGoods_amount_list(String amounts) {
        this.goods_amount_list = amounts;
    }

    public String getGoods_amount_list() {
        return goods_amount_list;
    }


}
