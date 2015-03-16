package com.schinta.crawl.controller;

import com.schinta.crawl.model.News;
import com.schinta.crawl.service.NewsService;
import com.schinta.crawl.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by John on 2014/7/10.
 */
@Controller
public class IndexController {
    public Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private NewsService newsService;

    @Autowired
    private TaskService taskService;

    /**
     * 跳转至首页
     * @param request
     * @return
     */
    @RequestMapping("/tologin")
    public ModelAndView tologin(HttpServletRequest request, HttpServletResponse response){

        ModelAndView mv = new ModelAndView();
        mv.setViewName("search");
        return mv;
    }

    /**
     * 跳转至首页
     * @param request
     * @return
     */
    @RequestMapping("/todaycrawl")
    public ModelAndView todaycrawl(HttpServletRequest request, HttpServletResponse response){

        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        return mv;
    }





    /**
     * 今日发布
     * @param request
     * @return
     */
    @RequestMapping("/todaypub")
    public ModelAndView todayCrawl(HttpServletRequest request, HttpServletResponse response){

        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        return mv;
    }

    /**
     * 搜索
     * @param
     * @return
     */

    @RequestMapping(value = "/search")
    public String requestActivate() {
        return "/search";
    }




    @RequestMapping("/crawl")
    public ModelAndView crawl(HttpServletRequest request, HttpServletResponse response){
        taskService.crawlAll();
        return tologin(request,response);
    }


}
