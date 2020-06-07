package com.example.demo.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.*;
import com.example.demo.mapper.UserMapper;
import org.apache.catalina.connector.Request;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.wltea.analyzer.core.IKSegmenter;
import org.wltea.analyzer.core.Lexeme;

import java.io.*;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

//数据对比 逻辑判断
@Service
public class UserServiceImple implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private JavaMailSender mailSender;

    private static final Logger log= LogManager.getLogger(UserServiceImple.class);
//    log

//    Logger logger = Logger.getLogger(UserServiceImple.class);

    public String addUser(User user) {
        List<User> userList = (List<User>) userMapper.selectALLUser();
        for (int i = 0; i < userList.size(); i++) {
            if (userList.get(i).getMail().equals(user.getMail())) {
                return "该邮箱已注册";
            }
        }
        userMapper.addUser(user);
        userMapper.addPortraitOfUser(user.getMail());
        return "注册成功";
    }

    public String selectUser(User user,String ip) throws IOException {
        if (user.getMail() == "" || user.getPassword() == "") {
            return "账号/密码不能为空";
        }

        List<User> userList = (List<User>) userMapper.selectALLUser();
        for (int i = 0; i < userList.size(); i++) {
            if (userList.get(i).getMail().equals(user.getMail()) && userList.get(i).getPassword().equals(user.getPassword())) {


                FileOutputStream fileOutputStream = null;
//                File file = new File("E:\\idea_files\\demo\\src\\log.txt");
                File file = new File("src/log.txt");
                Date d = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss ");
                String content=sdf.format(d)+"     用户"+user.getMail()+"正在浏览商品, "+"ip地址为"+ip+'\n';
                try {
                    if(file.exists()){
                        //判断文件是否存在，如果不存在就新建一个txt
                        file.createNewFile();
                    }
                    fileOutputStream = new FileOutputStream(file,true);
                    fileOutputStream.write(content.getBytes());
                    fileOutputStream.flush();
                    fileOutputStream.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }


                return "http://101.201.121.174:80/api/showGoodsPage";
            }
        }
        return "账号/密码错误";
    }

    @Override
    public String selectSalesman(String sid,String password) {
        if (sid.equals("") || password.equals("")) {
            return "账号/密码不能为空";
        }

        List<JSONObject> salesmanList =userMapper.selectALLSalesman();
        for (int i = 0; i < salesmanList.size(); i++) {
            if (salesmanList.get(i).getString("sid").equals(sid) && salesmanList.get(i).getString("password").equals(password)) {
                return "http://101.201.121.174:80/api/salesmanPage";
            }
        }
        return "账号/密码错误";
    }


    public ArrayList<String> readFromTextFile(String pathname) throws IOException{
        ArrayList<String> strArray = new ArrayList<String>();
        File filename = new File(pathname);
        InputStreamReader reader = new InputStreamReader(new FileInputStream(filename));
        BufferedReader br = new BufferedReader(reader);
        String line = "";
        line = br.readLine();
        while(line != null) {
            strArray.add(line);
            line = br.readLine();
        }
        return strArray;
    }

    public List<JSONObject> selectALLGoods() {
        List<JSONObject> goodsList = userMapper.selectALLGoods();
        return goodsList;

    }
    public List<JSONObject> showGoodsByKind(int id) {
        List<JSONObject> salesman=userMapper.selectSalesmanById(id);
        List<JSONObject> goodsList = userMapper.selectGoodsByKind(salesman.get(0).getString("kind"));
        return goodsList;

    }

    @Override
    public List<JSONObject> selectALLSalesman() {
        return userMapper.selectALLSalesman();
    }

    @Override
    public String addShoppingCharts(ShoppingCharts shoppingCharts) {

        FileOutputStream fileOutputStream = null;
//                File file = new File("E:\\idea_files\\demo\\src\\log.txt");
        File file = new File("src/log.txt");
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss ");
        String content=sdf.format(d)+"     用户"+shoppingCharts.getUser_id()+"在加购商品"+'\n';
        try {
            if(file.exists()){
                //判断文件是否存在，如果不存在就新建一个txt
                file.createNewFile();
            }
            fileOutputStream = new FileOutputStream(file,true);
            fileOutputStream.write(content.getBytes());
            fileOutputStream.flush();
            fileOutputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (shoppingCharts.getAmount()>0) {
            List<JSONObject> good=userMapper.selectGoodsById(shoppingCharts.getGoods_id());
            System.out.println(good);
            JSONObject jsonObject=good.get(0);
            int stock=jsonObject.getIntValue("amount");
            if(shoppingCharts.getAmount()>stock)
                return "库存不足";
            //更新库存
            userMapper.updateGoodsAmount(shoppingCharts.getAmount(),shoppingCharts.getGoods_id());

            List<JSONObject> shoppingChartsList=userMapper.selectALLShoppingCharts();
            System.out.println(shoppingChartsList);

            for (int i = 0; i < shoppingChartsList.size(); i++)
            {
                if (shoppingChartsList.get(i).getIntValue("goods_id")==shoppingCharts.getGoods_id()&&shoppingChartsList.get(i).getString("user_id").equals(shoppingCharts.getUser_id()))
                {
                    userMapper.updateShoppingCharts(shoppingCharts);
                    String mail=shoppingCharts.getUser_id();
                    int goodsId=shoppingCharts.getGoods_id();
                    String goodsName=userMapper.selectGoodsById(goodsId).get(0).getString("goods_name");
                    try {
                        List<String> goodsNameList = getStringList(goodsName);
                        System.out.println("++++"+goodsName+"+++++");
                        System.out.println("++++"+goodsNameList+"+++++");
                        List<JSONObject> POU=userMapper.selectAllPOU();
                        for(int j=0;j<POU.size();j++)
                        {
                            String Mail=POU.get(j).getString("mail");
                            String chart_keywords = POU.get(j).getString("chart_keywords");
                            String like_keywords = POU.get(j).getString("like_keywords");
                            if(mail.equals(Mail))
                            {
                                for(int k=0;k<goodsNameList.size();k++)
                                {
                                    String subString= goodsNameList.get(k);
                                    System.out.println("++++"+subString+"+++++");

                                    if (chart_keywords.equals("")) {
                                        chart_keywords = chart_keywords + subString + ",";
                                    } else {
                                        String[] chart_keywords_list = chart_keywords.split(",");
                                        System.out.println(Arrays.toString(chart_keywords_list));
                                        if (!Arrays.asList(chart_keywords_list).contains(subString)) {

                                            chart_keywords = chart_keywords + subString + ",";

                                        }
                                    }

                                    if (like_keywords.equals("")) {
                                        like_keywords = like_keywords + subString + ",";
                                    } else {
                                        String[] like_keywords_list = like_keywords.split(",");

                                        if (!Arrays.asList(like_keywords_list).contains(subString)) {

                                            like_keywords = like_keywords + subString + ",";

                                        }
                                    }

                                }
                                userMapper.updatePOUC(mail, like_keywords, chart_keywords);

                            }
                        }

                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    return "成功加入购物车";
                }
            }

            userMapper.addShoppingCharts(shoppingCharts);
            System.out.println("++++ADD++++");
            String mail=shoppingCharts.getUser_id();
            int goodsId=shoppingCharts.getGoods_id();
            String goodsName=userMapper.selectGoodsById(goodsId).get(0).getString("goods_name");
            try {
                List<String> goodsNameList = getStringList(goodsName);
                System.out.println("++++"+goodsName+"+++++");
                System.out.println("++++"+goodsNameList+"+++++");
                List<JSONObject> POU=userMapper.selectAllPOU();
                for(int j=0;j<POU.size();j++)
                {
                    String Mail=POU.get(j).getString("mail");
                    String chart_keywords = POU.get(j).getString("chart_keywords");
                    String like_keywords = POU.get(j).getString("like_keywords");
                    if(mail.equals(Mail))
                    {
                        for(int k=0;k<goodsNameList.size();k++)
                        {
                            String subString= goodsNameList.get(k);
                            System.out.println("++++"+subString+"+++++");

                            if (chart_keywords.equals("")) {
                                chart_keywords = chart_keywords + subString + ",";
                            } else {
                                String[] chart_keywords_list = chart_keywords.split(",");
                                System.out.println(Arrays.toString(chart_keywords_list));
                                if (!Arrays.asList(chart_keywords_list).contains(subString)) {

                                    chart_keywords = chart_keywords + subString + ",";

                                }
                            }

                            if (like_keywords.equals("")) {
                                like_keywords = like_keywords + subString + ",";
                            } else {
                                String[] like_keywords_list = like_keywords.split(",");

                                if (!Arrays.asList(like_keywords_list).contains(subString)) {

                                    like_keywords = like_keywords + subString + ",";

                                }
                            }

                        }
                        userMapper.updatePOUC(mail, like_keywords, chart_keywords);

                    }
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
            return "成功加入购物车";
        }
        else
        {
            return "您加购的商品数量小于0";
        }

    }

    @Override
    public List<JSONObject> selectShoppingChartByMail(String mail) {
        List<JSONObject> shoppingChartsList = userMapper.selectShoppingChartByMail(mail);
        return  shoppingChartsList;
    }

    @Override
    public List<JSONObject> selectGoodsById(int id) {
        List<JSONObject> goodsList = userMapper.selectGoodsById(id);
        return goodsList;
    }

    @Override
    public List<JSONObject> selectUserByMail(String mail) {
        return userMapper.selectUserByMail(mail);

    }

    @Override
    public String insertOrders(Orders orders) {
        System.out.println(orders.getMail()+" "+orders.getGoods_id_list()+" "+orders.getGoods_amount_list()+" "+orders.getAddress()+" "+orders.getTiming()+" "+orders.getTotal());
//        userMapper.insertOrders(orders.getMail(),orders.getGoods_id_list(),orders.getGoods_amount_list(),orders.getAddress(),orders.getTiming(),orders.getTotal());
       userMapper.insertOrders(orders);
        SimpleMailMessage message = new SimpleMailMessage();
        //发件人
        message.setFrom("281581058@qq.com");
//        message.setFrom(username);
        //收件人
        message.setTo(orders.getMail());
        message.setSubject("商品发货");
        message.setText("您于"+orders.getTiming()+"下单的商品已发货。");
        mailSender.send(message);
        return "下单成功";
    }

    @Override
    public String deleteShoppingCharts(String mail, String goods_id_list) {

        String[] idArray = goods_id_list.split(",");
            for (int i = 0; i < idArray.length; i++)
            {
                userMapper.deleteShoppingChart(mail, Integer.parseInt(idArray[i]));
            }
            return "购物车删除成功";

    }

    @Override
    public String deductMoney(String mail, float money) {

        List<JSONObject> jsonObjects=userMapper.selectUserByMail(mail);
        System.out.println(jsonObjects.get(0).getFloatValue("money"));
        System.out.println(money);
        System.out.println(jsonObjects.get(0).getFloatValue("money")-money);
        userMapper.deductMoney(mail,money);
        return "扣钱成功";
    }

    @Override
    public String recharge(String mail, float money) {
        System.out.println("chongzhichenggong");
        userMapper.recharge(mail,money);
        return "充值成功";
    }

    @Override
    public String deleteUser(User user) {
        if (user.getMail() == "" || user.getPassword() == "")
        {
            return "账号/密码不能为空";
        }
        List<User> userList = (List<User>) userMapper.selectALLUser();
        for (int i = 0; i < userList.size(); i++) {
            if (userList.get(i).getMail().equals(user.getMail()) && userList.get(i).getPassword().equals(user.getPassword())) {

                userMapper.deleteUser(user);
                return "注销成功";
            }
        }
        return "账号/密码错误";
    }

    @Override
    public String deleteGoods(int id) {

        userMapper.deleteGoods(id);
        return "清仓成功";
    }

    public String deleteSalesman(int id) {

        userMapper.deleteSalesman(id);
        return "删除成功";
    }

    @Override
    public String updateGoods(Goods goods) {

        userMapper.updateGoods(goods);
        return "修改成功";
    }

    @Override
    public String updateSalesman(int sid, String pwd) {

        userMapper.updateSalesman(sid,pwd);
        return "修改成功";
    }

    @Override
    public String insertGoods(Goods goods) {
        userMapper.insertGoods(goods);
        return "入库成功";
    }

    @Override
    public String insertSalesman(Salesman salesman) {
        userMapper.insertSalesman(salesman);
        return "添加成功";
    }

    @Override
    public List<JSONObject> selectALLOrders() {
        return userMapper.selectALLOrders();
    }

    @Override
    public String orderNameListById(int id,int sid) {

        String nameAmount="",goodsName;
        int goodsId,ordersAmount;
        List<JSONObject> goods;
        List<JSONObject> orders=userMapper.orderNameListById(id);
        String ids=orders.get(0).getString("goods_id_list");
        String amounts=orders.get(0).getString("goods_amount_list");
        List<String> idList = java.util.Arrays.asList(ids.split(","));
        List<String> amountList = java.util.Arrays.asList(amounts.split(","));
        for (int i=0;i<idList.size();i++)
        {
             goodsId=Integer.parseInt(idList.get(i));
             goods=userMapper.selectGoodsById(goodsId);
//            if(goods.size()==0)
//            {
//                return "该订单的部分的商品已被删除";
//            }
            String kind=goods.get(0).getString("kind");
            if(!kind.equals(userMapper.selectKindBySid(sid).get(0).getString("kind")))
            {
                continue;
            }
             goodsName=goods.get(0).getString("goods_name");
             ordersAmount=Integer.parseInt(amountList.get(i));
             nameAmount=nameAmount+goodsName+"*"+ordersAmount;
             if(i!=idList.size()-1)
                 nameAmount=nameAmount+",";

        }
        System.out.println(nameAmount);
        return nameAmount;
    }

    @Override
    public List<JSONObject> selectSubString(String subString,String Mail) {
        List<JSONObject> allGoods=userMapper.selectALLGoods();
        List<JSONObject> subGoods=new ArrayList<JSONObject>();
        int k=0;

        for(int i=0;i<allGoods.size();i++)
        {
            if(allGoods.get(i).getString("goods_name").indexOf(subString)!=-1)
            {
                subGoods.add(allGoods.get(i));
                k=1;
            }

        }
        if(k==1)
        {
            List<JSONObject> POU=userMapper.selectAllPOU();
            for(int i=0;i<POU.size();i++)
            {
                String mail=POU.get(i).getString("mail");
                if(mail.equals(Mail))
                {
                    String like_keywords = POU.get(i).getString("like_keywords");
                    if(like_keywords.equals(""))
                    {
                        like_keywords=like_keywords+subString+",";
                    }
                    else
                    {
                        String[] like_keywords_list=like_keywords.split(",");
                        if(!Arrays.asList(like_keywords_list).contains(subString))
                        {
                            like_keywords=like_keywords+subString+",";
                        }
                    }

                    String search_keywords = POU.get(i).getString("search_keywords");
                    if(search_keywords.equals(""))
                    {
                        search_keywords=search_keywords+subString+",";
                    }
                    else
                    {
                        String[] search_keywords_list=search_keywords.split(",");
                        if(!Arrays.asList(search_keywords_list).contains(subString))
                        {
                            search_keywords=search_keywords+subString+",";
                        }
                    }

                    userMapper.updatePOU(mail,like_keywords,search_keywords);
                }

            }
        }
        return subGoods;
    }

    public  List<String> getStringList(String text) throws Exception{
        //独立Lucene实现
        StringReader re = new StringReader(text);
        IKSegmenter ik = new IKSegmenter(re, true);
        Lexeme lex;
        List<String> s = new ArrayList<>();
        while ((lex = ik.next()) != null) {
            s.add(lex.getLexemeText());
        }
        return s;
    }

    @Override
    public String userCF(String mail)
    {
        String final_like_keywords = "";
//        Scanner scanner = new Scanner(System.in);
        //输入用户总量
        int N = userMapper.countOfPOU();
        System.out.println("N:"+N);
//        int N = scanner.nextint();
        int[][] sparseMatrix = new int[N][N];
//        //建立用户稀疏矩阵，用于用户相似度计算【相似度矩阵】
        Map<String, Integer> userItemLength = new HashMap<>();
//        //存储每一个用户对应的不同物品总数 eg: A 3
        Map<String, Set<String>> itemUserCollection = new HashMap<>();
//        //建立物品到用户的倒排表 eg: a A B
        Set<String> items = new HashSet<>();
//        //辅助存储物品集合
        Map<String, Integer> userID = new HashMap<>();
//        //辅助存储每一个用户的用户ID映射
        Map<Integer, String> idUser = new HashMap<>();
//        //辅助存储每一个ID对应的用户映射
        List<JSONObject> POU=userMapper.selectAllPOU_mail_likeKeywords();
//        System.out.println("Input user--items maping infermation:<eg:A a b d>");
//        scanner.nextLine();
        for (int i = 0; i < POU.size() ; i++){
//            //依次处理N个用户 输入数据 以空格间隔
            String Mail=POU.get(i).getString("mail");
            if(mail.equals(Mail))
            {
                final_like_keywords=POU.get(i).getString("like_keywords");
            }
            String[] Mail_list=Mail.split(",");
            String Like_keywords=POU.get(i).getString("like_keywords");
            String[] Like_keywords_list=Like_keywords.split(",");

            List list = new ArrayList(Arrays.asList(Mail_list));
            list.addAll(Arrays.asList(Like_keywords_list));
            Object[] user_item = list.toArray();

            int length = user_item.length;
            userItemLength.put((String) user_item[0], length-1);
//            //eg: A 3
            userID.put((String) user_item[0], i);
//            //用户ID与稀疏矩阵建立对应关系
            idUser.put(i, (String) user_item[0]);
//            //建立物品--用户倒排表
            for (int j = 1; j < length; j ++){
                if(items.contains(user_item[j])){
//                    //如果已经包含对应的物品--用户映射，直接添加对应的用户
                    itemUserCollection.get(user_item[j]).add((String) user_item[0]);
                } else{
//                    //否则创建对应物品--用户集合映射
                    items.add((String) user_item[j]);
                    itemUserCollection.put((String) user_item[j], new HashSet<String>());
//                    //创建物品--用户倒排关系
                    itemUserCollection.get(user_item[j]).add((String) user_item[0]);
                }
            }
        }
        System.out.println(itemUserCollection.toString());
//        //计算相似度矩阵【稀疏】
        Set<Map.Entry<String, Set<String>>> entrySet = itemUserCollection.entrySet();
        Iterator<Map.Entry<String, Set<String>>> iterator = entrySet.iterator();
        while(iterator.hasNext()){
            Set<String> commonUsers = iterator.next().getValue();
            for (String user_u : commonUsers) {
                for (String user_v : commonUsers) {
                    if(user_u.equals(user_v)){
                        continue;
                    }
                    sparseMatrix[userID.get(user_u)][userID.get(user_v)] += 1;
                    //计算用户u与用户v都有正反馈的物品总数
                }
            }
        }
        System.out.println(userItemLength.toString());
//        System.out.println("Input the user for recommendation:<eg:A>");
        String recommendUser = mail;
        System.out.println(userID.get(recommendUser));
        //计算用户之间的相似度【余弦相似性】
        int recommendUserId = userID.get(recommendUser);
        for (int j = 0;j < sparseMatrix.length; j++) {
            if(j != recommendUserId){
                System.out.println("客户"+idUser.get(recommendUserId)+"--"+"客户"+idUser.get(j)+"相似度:"+sparseMatrix[recommendUserId][j]/Math.sqrt(userItemLength.get(idUser.get(recommendUserId))*userItemLength.get(idUser.get(j))));
            }
        }
        //计算指定用户recommendUser的物品推荐度
        for (String item: items){
            //遍历每一件物品
            Set<String> users = itemUserCollection.get(item);
            //得到购买当前物品的所有用户集合
            if(!users.contains(recommendUser)){
                //如果被推荐用户没有购买当前物品，则进行推荐度计算
                double itemRecommendDegree = 0.0;
                for (String user: users){
                    itemRecommendDegree += sparseMatrix[userID.get(recommendUser)][userID.get(user)]/Math.sqrt(userItemLength.get(recommendUser)*userItemLength.get(user));
                    //推荐度计算
                }
                if(itemRecommendDegree>0.7)
                {
                    final_like_keywords=final_like_keywords+item+",";
                }
                System.out.println("The goods "+item+" for "+recommendUser +"'s recommended degree:"+itemRecommendDegree);
            }
        }
        System.out.println("推荐"+recommendUser+"购买的商品关键字有："+final_like_keywords);
        return final_like_keywords;
    }

    @Override
    public List<JSONObject> showSalesPerformance() {
        List<JSONObject> allOrders=userMapper.selectALLOrders();
        Map<String, Integer> kind_amount=new HashMap<>();
        Map<String, Float> kind_money=new HashMap<>();
        for(int i=0;i<allOrders.size();i++)
        {
            String[] ids=allOrders.get(i).getString("goods_id_list").split(",");
            String[] amounts=allOrders.get(i).getString("goods_amount_list").split(",");
            for(int j=0;j<ids.length;j++)
            {
                List<JSONObject> goods=userMapper.selectGoodsById(Integer.parseInt(ids[j]));
                int amount=kind_amount.containsKey(goods.get(0).getString("kind")) ? kind_amount.get(goods.get(0).getString("kind")) : 0;
                kind_amount.put(goods.get(0).getString("kind"),amount+Integer.parseInt(amounts[j]));
                float money=kind_money.containsKey(goods.get(0).getString("kind")) ? kind_money.get(goods.get(0).getString("kind")) : 0;
                kind_money.put(goods.get(0).getString("kind"),money+Float.parseFloat(amounts[j])*Float.parseFloat(goods.get(0).getString("price")));
            }
        }
//        System.out.println(kind_amount+"    "+kind_money);
        List<JSONObject> allSalesman=userMapper.selectALLSalesman();
        List<JSONObject> salesPerformance=new ArrayList<JSONObject>();
        for (int i=0;i<allSalesman.size();i++)
        {
            int amount1=kind_amount.containsKey(allSalesman.get(i).getString("kind")) ? kind_amount.get(allSalesman.get(i).getString("kind")) : 0;
            float money1=kind_money.containsKey(allSalesman.get(i).getString("kind")) ? kind_money.get(allSalesman.get(i).getString("kind")) : 0;
            JSONObject json=new JSONObject();
            json.put("sid",allSalesman.get(i).getString("sid"));
            json.put("kind",allSalesman.get(i).getString("kind"));
            json.put("amount",amount1);
//            (float)(Math.round(money1*100)/100)
            BigDecimal  b  =  new  BigDecimal(money1);
            float  f1  =  b.setScale(2,  BigDecimal.ROUND_HALF_UP).floatValue();
            json.put("money",f1);
            salesPerformance.add(json);
        }
//        System.out.println(salesPerformance);
        return salesPerformance;
    }

    @Override
    public void logoff(String mail, String ip) {
        FileOutputStream fileOutputStream = null;
//                File file = new File("E:\\idea_files\\demo\\src\\log.txt");
        File file = new File("src/log.txt");
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss ");
        String content=sdf.format(d)+"     用户"+mail+"退出系统, "+"ip地址为"+ip+'\n';
        try {
            if(file.exists()){
                //判断文件是否存在，如果不存在就新建一个txt
                file.createNewFile();
            }
            fileOutputStream = new FileOutputStream(file,true);
            fileOutputStream.write(content.getBytes());
            fileOutputStream.flush();
            fileOutputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


    @Override
    public List<JSONObject> maybeLikeGoods(String Mail) {
        List<JSONObject> allGoods=userMapper.selectALLGoods();
        List<JSONObject> subGoods=new ArrayList<JSONObject>();
        String final_like_keywords=userCF(Mail);
        String[] final_like_keywords_list = final_like_keywords.split(",");
        String subString="";

        for(int i=0;i<allGoods.size();i++)
        {
            for(int j=0;j<final_like_keywords_list.length;j++)
            {
                subString=final_like_keywords_list[j];
                if(allGoods.get(i).getString("goods_name").indexOf(subString)!=-1)
                {
                    subGoods.add(allGoods.get(i));
                    break;
                }
            }

        }

        return subGoods;
    }




}//UserServiceImple
