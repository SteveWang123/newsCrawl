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
public class XinlangCrawlImpl extends BaseCrawlImpl {

    Calendar c = Calendar.getInstance();
    private String year = ((Integer)c.get(Calendar.YEAR)).toString();

    @Override
    public void preCrawl() {
        site = new Site( "http://news.sina.com.cn/china/","新浪各地新闻");
        crawlUrls = new String[]{"http://roll.news.sina.com.cn/news/gnxw/gdxw1/index.shtml",
                                   "http://roll.news.sina.com.cn/news/gnxw/gdxw1/index_2.shtml",
                                   "http://roll.news.sina.com.cn/news/gnxw/gdxw1/index_3.shtml",
                                   "http://roll.news.sina.com.cn/news/gnxw/gdxw1/index_4.shtml"};
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
                Elements elements = doc.select("html body div#page div#Main div.listBlk ul.list_009 li a");
                //找到所有新闻发布时间的样式
                Elements pubTimeElements = doc.select("html body div#page div#Main div.listBlk ul.list_009 li span");
                //pubTimes 存储新闻发布时间
                List<String> pubTimes = new LinkedList<String>();

                //遍历元素抽取发布时间
                for (Element time : pubTimeElements) {
                    pubTimes.add(DateStringUtil.XinlangDateFormat(time.text()));
                }
                int count = 0;

                //遍历元素抽取其他信息
                for (Element a : elements) {
                    try {
//                        Element link = a.select("a").get(0);
                        String linkUrl = a.attr("abs:href");
                        String title = a.text();
                        System.out.println(linkUrl);
                        System.out.println(title);
                        //To get news content
                        String contentCrawlUrl = linkUrl;
                        Document contentDoc = Jsoup.connect(contentCrawlUrl).get();
                        Elements contentElements = contentDoc.select("div#wrapOuter.wrap-outer.clearfix div.wrap-inner div#articleContent.page-content.clearfix div.left div#artibody.article.article_16 p");
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
        XinlangCrawlImpl crawl = new XinlangCrawlImpl();
        crawl.preCrawl();
        List list = crawl.doCrawl();

    }

}
