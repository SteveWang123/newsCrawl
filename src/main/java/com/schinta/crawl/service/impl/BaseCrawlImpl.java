package com.schinta.crawl.service.impl;

import com.schinta.crawl.model.News;
import com.schinta.crawl.model.Site;
import com.schinta.crawl.service.CrawlService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.ArrayList;
import java.util.List;

/**
 * 作者： 刘伟
 * 日期： 2014/9/28.
 * 用途：
 */
public abstract class BaseCrawlImpl implements CrawlService{
    public Logger logger = LoggerFactory.getLogger(getClass());
    protected Site site;
    protected String[] crawlUrls = new String[]{};
    protected String cssSelector ="";
    protected String place = "";
    protected List<News> items = new ArrayList<News>();

    public Site getSite() {
        return site;
    }

    public void setSite(Site site) {
        this.site = site;
    }

    @Override
    public  abstract  void preCrawl() ;

    @Override
    public abstract List<News>  doCrawl() ;

    @Override
    public String print() {
        logger.info("抓取"+place+",网站地址是"+ site.getSiteUrl());
        logger.info("总共"+items.size()+"条");
        return place;
    }

    //    @Override
//    public abstract void postCrawl() ;


}
