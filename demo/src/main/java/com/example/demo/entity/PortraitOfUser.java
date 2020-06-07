package com.example.demo.entity;

public class PortraitOfUser {
    private String mail;
    private String like_keywords;
    private String search_keywords;
    private String order_keywords;
    private String chart_keywords;

    public PortraitOfUser(String mail,String ulk,String sk,String ok,String ck)
    {
        this.mail=mail;
        this.like_keywords=ulk;
        this.search_keywords=sk;
        this.order_keywords=ok;
        this.chart_keywords=ck;
    }

    public void setMail(String ulk) {
        this.mail = ulk;
    }

    public String getMail() { return mail; }

    public void setUid_like_keywords(String ulk) {
        this.like_keywords = ulk;
    }

    public String getUid_like_keywords() { return like_keywords; }


    public void setSearch_keywords(String uid) {
        this.search_keywords = uid;
    }

    public String getSearch_keywords() { return search_keywords; }


    public void setOrder_keywords(String uid) {
        this.order_keywords = uid;
    }

    public String getOrder_keywords() { return order_keywords; }


    public void setChart_keywords(String uid) {
        this.chart_keywords = uid;
    }

    public String getChart_keywords() { return chart_keywords; }

}
