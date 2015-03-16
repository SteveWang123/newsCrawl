package com.schinta.crawl.service.impl;

import com.schinta.crawl.model.News;
import com.schinta.crawl.service.CrawlService;
import com.schinta.crawl.service.NewsService;
import com.schinta.crawl.service.TaskService;
import com.schinta.crawl.util.ClassUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 作者： 刘伟
 * 日期： 2014/9/28.
 * 用途：
 */
@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private NewsService newsService;
    //时间格式: <!-- s m h d m w(?) y(?) -->,   分别对应: 秒>分>小时>日>月>周>年, UPDATE zhaobiao SET pubdate= LEFT(pubdate,10)   WHERE LENGTH(pubdate)>14
    @Override
    @Scheduled(cron="0 2 * * * ?")
    public void crawlAll() {
        List<Class> classList = ClassUtil.getAllClassByInterface(CrawlService.class);
        for(Class c:classList)
            try {
                CrawlService crawlService = (CrawlService) c.newInstance();
                crawlService.preCrawl();
                List<News> newsList  = crawlService.doCrawl();
                crawlService.print();
                newsService.insertBatch(newsList);

//                Site  site = crawlService.getSite();
//                newsService.insertSite(site);
//                crawlService.postCrawl();


            } catch (InstantiationException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }catch (Exception e){
                e.printStackTrace();
            }
    }

    public static void main(String[] args) {
//        TaskService taskService = new TaskServiceImpl();
//        taskService.crawlAll();
    }

}
