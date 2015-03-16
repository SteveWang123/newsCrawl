package com.schinta.crawl.service;

import com.schinta.crawl.model.News;
import com.schinta.crawl.model.Site;

import java.util.List;

/**
 * 作者： 刘伟
 * 日期： 2014/9/28.
 * 用途：
 */

public interface CrawlService {

    public Site getSite();

    public String print();

    public void preCrawl();

    public List<News> doCrawl();
//    public List<Zhaobiao> doCrawl();

//    public void postCrawl();
}
