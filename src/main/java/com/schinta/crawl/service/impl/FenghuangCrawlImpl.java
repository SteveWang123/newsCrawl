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
import java.util.LinkedList;
import java.util.List;

/**
 * 作者： 刘伟
 * 日期： 2014/9/28.
 * 用途：
 */
public class FenghuangCrawlImpl extends BaseCrawlImpl {

    @Override
    public void preCrawl() {
        site = new Site( "http://www.ifeng.com/","凤凰资讯");
        crawlUrls = new String[]{"http://news.ifeng.com/mainland/rt-channel/rtlist_0/index.shtml"};
//        cssSelector = "body#body div.area div.area-left div.list-item.clearfix div.item-top h2";
    }

    @Override
    public List<News> doCrawl() {
        for (String crawUrl : crawlUrls) {
            String html = get(crawUrl);
//            System.out.println(html);
            try {
                //连接某个地址
                Document doc = Jsoup.parse(html);
                //找到所有新闻titleLink的样式
                Elements elements = doc.select("html body div.main div.left div.newsList ul li a");
                //找到所有新闻发布时间的样式
                Elements pubTimeElements = doc.select("html body div.main div.left div.newsList ul li h4");
                //pubTimes 存储新闻发布时间
                List<String> pubTimes = new LinkedList<String>();

                //遍历元素抽取发布时间
                for (Element time : pubTimeElements) {
                    pubTimes.add(DateStringUtil.FenghuangDateFormat(time.text()));
                }
                int count = 0;

                //遍历元素抽取其他信息
                for (Element a : elements) {
                    try {
//                        Element link = a.select("a").first();

                        String linkUrl = a.attr("href");
                        String title = a.text();
                        System.out.println(linkUrl);
                        System.out.println(title);
                        //To get news content
                        String contentCrawlUrl = linkUrl;
                        Document contentDoc = Jsoup.connect(contentCrawlUrl).get();
                        Elements contentElements = contentDoc.select("html body div.main div.left div#artical div#artical_real.js_img_share_area div#main_content.js_selection_area p");
//                        Element contentElement = contentElements.get(0);
                        String content = contentElements.text();
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
//                        e.printStackTrace();
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
        getMethod.getParams().setContentCharset("UTF-8");
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
        FenghuangCrawlImpl crawl = new FenghuangCrawlImpl();
        crawl.preCrawl();
        List list = crawl.doCrawl();
        System.out.println("OK!");

    }

}
