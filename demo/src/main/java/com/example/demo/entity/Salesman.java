package com.example.demo.entity;

public class Salesman {

    private int sid;
    private String password;
    private String kind;

    public Salesman(int sid,String password,String kind)
    {
        this.sid=sid;
        this.password=password;
        this.kind=kind;
    }

    public Salesman(String password,String kind)
    {
        this.sid=0;
        this.password=password;
        this.kind=kind;
    }


    public int getSid() {
        return sid;
    }

    public void setSid(int umail) {
        this.sid = umail;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }
}
