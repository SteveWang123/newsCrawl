package com.schinta.crawl.controller;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URLDecoder;
import java.util.*;

/**
 * 作者：zhangwenjun
 * 日期： 2014/12/16.
 * 说明：
 */
@Controller
public class SolrController {

    public Logger logger = LoggerFactory.getLogger(getClass());

    private static final String SOLR_URL = "http://localhost:8080/solr";

    @RequestMapping("/test")
    public String toTest()
    {
        return  "test";
    }

    @RequestMapping(value = "/tosearch",method = RequestMethod.POST)
    public ModelAndView tosearch(HttpServletRequest request, HttpServletResponse response) throws IOException, SolrServerException
    {
//        String queryString = URLDecoder.decode(request.getParameter("querystring"), "UTF-8");
        ModelAndView mv =new ModelAndView();
        String queryString = request.getParameter("querystring");
        System.out.println("queryString is "+queryString);
        if(StringUtils.hasLength(queryString)){
            SolrDocumentList newsdocs = search(queryString);
            mv.addObject("newsdocs",newsdocs);
        }

        mv.setViewName("search");

        return mv;
    }


    @RequestMapping(value = "/tozhaobiao", method = RequestMethod.GET)
    @ResponseBody
    public String sugguestzbInfo(HttpServletRequest request) throws IOException, SolrServerException {

        String q = request.getParameter("term");
//        String q = request.getParameter("q");

        SolrDocumentList zbdocs=search(q);

        List<Object> list=new ArrayList<Object>();

//        List<Map> list =new ArrayList<Map>();

        StringBuffer str=new StringBuffer();

        str.append("[");

        for(SolrDocument doc : zbdocs)
        {
            list.add(doc.getFieldValue("zbtitle")+"\n");
//            Map<String,String> map = new HashMap<String,String>();
//            map.put("zbtitle",(String)doc.getFieldValue("zbtitle"));
//            list.add(map);
            str.append("{zbtitle:'" + doc.getFieldValue("zbtitle") + "', pubdate:'" + doc.getFieldValue("pubdate") + "'}");

        }

        str.append("]");

//        String data=list.toString();

        System.out.println(zbdocs);

        System.out.println(str);

        return str.toString();

//        return zbdocs ;
    }



    public SolrDocumentList search(String string) throws IOException, SolrServerException
    {

        SolrDocumentList docs=null;
        SolrServer solrServer = getSolrServer();
        SolrQuery query = new SolrQuery();
        query.setQuery("newsContent:" + string);

        try
        {
            QueryResponse rsp = solrServer.query(query);
            docs = rsp.getResults();
            logger.info("文档个数：" + docs.getNumFound());
            logger.info("查询时间：" + rsp.getQTime());

            System.out.println(docs);

        }
        catch (SolrServerException e)
        {
            e.printStackTrace();
        }

        return docs;
    }


    public SolrServer getSolrServer() throws MalformedURLException
    {

        HttpSolrServer server = new HttpSolrServer(SOLR_URL);
        server.setSoTimeout(3000); // socket read timeout
        server.setConnectionTimeout(1000);
        server.setDefaultMaxConnectionsPerHost(1000);
        server.setMaxTotalConnections(10);
        server.setFollowRedirects(false); // defaults to false
        server.setAllowCompression(true);
        server.setMaxRetries(1);

        return server;

    }

}


