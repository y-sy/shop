package com.example.demo.entity;

public class User
{

    private String mail;
    private String password;
    private float money;

    public User(String mail,String password)
    {
        this.mail=mail;
        this.password=password;
        this.money=0;
    }

//    public User(String mail)
//    {
//        this.mail=mail;
//        this.password="null";
//        this.money=0;
//    }



    public String getMail() {
        return mail;
    }

    public void setMail(String umail) {
        this.mail = umail;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}
