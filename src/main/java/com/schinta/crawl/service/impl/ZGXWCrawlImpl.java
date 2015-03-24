package com.schinta.crawl.service.impl;

import com.schinta.crawl.model.News;
import com.schinta.crawl.model.Site;

import com.schinta.crawl.util.DateStringUtil;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.net.SocketTimeoutException;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

/**
 * 作者： 刘伟
 * 日期： 2014/9/28.
 * 用途：
 */
public class ZGXWCrawlImpl extends BaseCrawlImpl {

    Calendar c = Calendar.getInstance();
    private String year = ((Integer)c.get(Calendar.YEAR)).toString();

    @Override
    public void preCrawl() {
        site = new Site( "http://www.chinanews.com/china.shtml","中国新闻国内新闻");
        crawlUrls = new String[]{"http://www.chinanews.com/china.shtml"};
//        cssSelector = "html body div#content div#content_right div.content_list ul li div.dd_bt";
    }

    @Override
    public List<News> doCrawl() {
        for (String crawUrl : crawlUrls) {
            String html = get(crawUrl);

//            System.out.println(html);
            try {
                //解析某个地址
                Document doc = (Document) Jsoup.parse(html);
                //找到所有新闻titleLink的样式
                Elements elements = doc.select("div#content div#content_right div.content_list ul li div.dd_bt");
                //找到所有新闻发布时间的样式
                Elements pubTimeElements = doc.select("html body div#content div#content_right div.content_list ul li div.dd_time");
                //pubTimes 存储新闻发布时间
                List<String> pubTimes = new LinkedList<String>();

                //遍历元素抽取发布时间
                for (Element time : pubTimeElements) {
                    pubTimes.add(DateStringUtil.ZGXWDateFormat(time.text()));
                }
                int count = 0;

                //遍历元素抽取其他信息
                for (Element dd_bt : elements) {
                    try {
                        Element link = dd_bt.select("a").get(0);
                        String linkUrl = "http://www.chinanews.com" + link.attr("href");
                        String title = link.text();
                        System.out.println(linkUrl);
                        System.out.println(title);
                        //To get news content
                        String contentCrawlUrl = linkUrl;
                        Document contentDoc = Jsoup.connect(contentCrawlUrl).get();
                        Elements contentElements = contentDoc.select("html body div#con div.div980 div.con_left div#cont_1_1_2.content div.left_zw");
                        Element contentElement = contentElements.get(0);
                        String content = contentElement.text();
//                        System.out.println(content);
//                        System.out.println(pubTimes.get(count));
                        News one = new News();
                        one.setLink(linkUrl);
                        one.setTitle(title);
                        one.setContent(content);
                        one.setPubdate(pubTimes.get(count));
                        one.setSiteurl(site.getSiteUrl());
                        items.add(one);
                        count++;

                    } catch (Exception e) {
                        e.printStackTrace();
                        count++;
                    }
                }
                System.out.println(doc.text());

            } catch (Exception e) {
                logger.info(crawUrl + "出错了！" + e.getMessage());
                e.printStackTrace();
            }
        }

//        System.out.println(itemNews.get(2).getTitle().toString());
        return items;
    }

    public static String get(String url){
        String htmlString = "";
        HttpClient httpClient = new HttpClient();
        GetMethod getMethod = new GetMethod(url);
        getMethod.getParams().setContentCharset("GB2312");
        try {
            int statusCode = httpClient.executeMethod(getMethod);
            if (statusCode != HttpStatus.SC_OK) {
                System.err.println("Method failed: "
                        + getMethod.getStatusLine());
            }
            // 读取内容
            String responseBody = getMethod.getResponseBodyAsString();

            // 处理内容
            String html = new String(responseBody);
            htmlString = html;
//            System.out.println(html);
        } catch (Exception e) {
            System.err.println("页面无法访问");
        }finally{
            getMethod.releaseConnection();
        }
        return htmlString;
    }

    public static void main(String[] args) {
        ZGXWCrawlImpl crawl = new ZGXWCrawlImpl();
        crawl.preCrawl();
        List list = crawl.doCrawl();

    }

}
