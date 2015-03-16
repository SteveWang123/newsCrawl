package com.schinta.crawl.service.impl;

import com.schinta.crawl.dao.NewsMapper;
import com.schinta.crawl.model.Site;
import com.schinta.crawl.model.News;
import com.schinta.crawl.model.NewsExample;
import com.schinta.crawl.service.NewsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 作者： 刘伟
 * 日期： 2014/9/28.
 * 用途：
 */
@Service
public class NewsServiceImpl implements NewsService {
    public Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private NewsMapper newsMapper;

//    @Override
//    public void insertSite(Site site) {
//        //先找这个url有没有
//        Map map = newsMapper.findSite(site.getSiteUrl());
//        Long t = (Long) map.get("t");
//        if (t > 0) return;
//        //没有就找最大的序号
//        map = newsMapper.findMaxOrder();
//        Integer order = (Integer) map.get("t");
//        Map param = new HashMap();
//        param.put("siteUrl", site.getSiteUrl());
//        param.put("siteZname", site.getSiteName());
//        param.put("disOrder", order.intValue() + 10);
//        //插入
//        newsMapper.insertSite(param);
//    }

    @Override
    public void insert(News news) {
        //没有标题的不保存
        if (!StringUtils.hasLength(news.getTitle())) {
            return;
        }
        //没有链接的保存百度搜索链接
        if (!StringUtils.hasLength(news.getLink())) {
            news.setLink("http://www.baidu.com/s?wd=" + news.getTitle());
        }

        NewsExample newsExample = new NewsExample();
        newsExample.createCriteria().andLinkEqualTo(news.getLink());
        long i = newsMapper.countByExample(newsExample);
        if (i > 0) return;

        newsExample.clear();
        newsExample.createCriteria().andTitleEqualTo(news.getTitle());
        i = newsMapper.countByExample(newsExample);
        if (i > 0) return;

        if (news.getLink().length() > 250) news.setLink(news.getLink().substring(0, 250));
        if (news.getTitle().length() > 250) news.setTitle(news.getTitle().substring(0, 250));
        newsMapper.insert(news);
    }

    @Override
    public void insertBatch(List<News> newss) {
        for (News news : newss)
            insert(news);
    }
//
//    @Override
//    public News findById(Long id) {
//        return newsMapper.selectByPrimaryKey(id);
//    }
//
//    @Override
//    public News update(News news) {
//        newsMapper.updateByPrimaryKey(news);
//        return news;
//    }
//
//    @Override
//    public List<News> findAll() {
//        return newsMapper.findAll();
//    }
//
//    @Override
//    public List<Map> findAllSite() {
//        return newsMapper.findAllSite();
//    }
//
//    @Override
//    public List<News> findTodaysPub() {
//        Date now = new Date();
//        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
//        String date = simpleDateFormat.format(now);
//        NewsExample example = new NewsExample();
//        example.createCriteria().andPubdateLike(date);
//        return newsMapper.selectByExample(example);
//    }
//
//    @Override
//    public List<News> findTodaysCrawl() {
//        Date now = new Date();
//        Calendar calendar = Calendar.getInstance();
//        calendar.setTime(now);
//        calendar.set(Calendar.HOUR_OF_DAY, 0);
//        calendar.set(Calendar.MINUTE, 0);
//        Date date = calendar.getTime();
//        return findByCrawlDate(date);
//    }
//
//    @Override
//    public List<News> findByCrawlDate(Date date) {
//        Calendar calendar = Calendar.getInstance();
//        calendar.setTime(date);
//        calendar.add(Calendar.DATE, 1);
//        Date date1 = calendar.getTime();
//        NewsExample newsExample = new NewsExample();
//        newsExample.createCriteria().andCrawldateBetween(date, date1);
//        return newsMapper.selectByExample(newsExample);
//    }
//
//    @Override
//    public List<News> findByPlace(String place) {
//        NewsExample newsExample = new NewsExample();
//        newsExample.createCriteria().andPlaceLike(place);
//        return newsMapper.selectByExample(newsExample);
//    }
}
