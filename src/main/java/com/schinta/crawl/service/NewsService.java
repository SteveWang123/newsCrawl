package com.schinta.crawl.service;

import com.schinta.crawl.model.Site;
import com.schinta.crawl.model.News;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 作者： 刘伟
 * 日期： 2014/9/28.
 * 用途：
 */
public interface NewsService {

    void insert(News news);

//    void insertSite(Site site);

    void insertBatch(List<News> newss);

//    News findById(Long id);
//    News update(News news);
//
//    List<News> findAll();
//
//    List<Map> findAllSite();
//
//    List<News> findByCrawlDate(Date date);
//
//    List<News> findTodaysCrawl();
//
//    List<News> findTodaysPub();
//
//    List<News> findByPlace(String place);

}
