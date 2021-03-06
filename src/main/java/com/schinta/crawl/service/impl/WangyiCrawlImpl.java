package com.schinta.crawl.service.impl;

import com.schinta.crawl.model.News;
import com.schinta.crawl.model.Site;

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
import java.util.LinkedList;
import java.util.List;

/**
 * 作者： 刘伟
 * 日期： 2014/9/28.
 * 用途：
 */
public class WangyiCrawlImpl extends BaseCrawlImpl {

    @Override
    public void preCrawl() {
        site = new Site( "http://news.163.com","网易国内新闻");
        crawlUrls = new String[]{"http://news.163.com/domestic/", "http://news.163.com/special/0001124J/guoneinews_02.html#headList",
                                   "http://news.163.com/special/0001124J/guoneinews_03.html#headList",
                                   "http://news.163.com/special/0001124J/guoneinews_04.html#headList",
                                   "http://news.163.com/special/0001124J/guoneinews_05.html#headList"};
        cssSelector = "body#body div.area div.area-left div.list-item.clearfix div.item-top h2";
    }

    @Override
    public List<News> doCrawl() {
        for (String crawUrl : crawlUrls) {
            String html = get(crawUrl);
            try {
                //连接某个地址
                Document doc = Jsoup.parse(html);
                //找到所有新闻titleLink的样式
                Elements elements = doc.select("body#body div.area div.area-left div.list-item.clearfix div.item-top h2");
                //找到所有新闻发布时间的样式
                Elements pubTimeElements = doc.select("body#body div.area div.area-left div.list-item.clearfix div.item-top p span.time");
                //pubTimes 存储新闻发布时间
                List<String> pubTimes = new LinkedList<String>();

                //遍历元素抽取发布时间
                for (Element time : pubTimeElements) {
                    pubTimes.add(time.text());
                }
                int count = 0;

                //遍历元素抽取其他信息
                for (Element h2 : elements) {
                    try {
                        Element link = h2.select("a").first();
                        String linkUrl = link.attr("abs:href");
                        String title = link.text();
                        System.out.println(linkUrl);
                        System.out.println(title);
                        //To get news content
                        String contentCrawlUrl = linkUrl;
                        Document contentDoc = Jsoup.connect(contentCrawlUrl).get();
                        Elements contentElements = contentDoc.select("body div#js-epContent.ep-content div.ep-content-bg.clearfix div#epContentLeft.ep-content-main div#endText.end-text");
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
        WangyiCrawlImpl crawl = new WangyiCrawlImpl();
        crawl.preCrawl();
        List list = crawl.doCrawl();
        System.out.println("OK!");

    }

}
