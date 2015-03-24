package com.schinta.crawl.controller;

import com.schinta.crawl.model.News;
import com.sun.org.apache.xpath.internal.SourceTree;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.params.MoreLikeThisParams;
import org.apache.solr.common.util.NamedList;
import org.apache.solr.common.util.SimpleOrderedMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.w3c.dom.NameList;
import sun.net.www.http.HttpClient;

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
    private static int i = 0;
    public static int newsdocSize = 0;


    @RequestMapping("/test")
    public String toTest()
    {
        return  "test";
    }

    @RequestMapping(value = "/tosearch",method = RequestMethod.POST )
    public ModelAndView tosearch(@RequestParam(value = "page",required =false,defaultValue ="1")int page,
                                 @RequestParam(value = "limit",required =false,defaultValue ="10")int limit,
                                 @RequestParam(value = "sort",required =false) String sort,
                                 HttpServletRequest request, HttpServletResponse response) throws IOException, SolrServerException
    {
        ModelAndView mv =new ModelAndView();
        String queryString = request.getParameter("querystring");
        String pageNumber = request.getParameter("pageParameter");
        int pageNum = 0 ;
        if (StringUtils.hasLength(pageNumber)){
            pageNum = Integer.parseInt(pageNumber);
        }
        System.out.println("queryString is "+queryString);
        System.out.println("pageParameter is "+ pageNumber);

        if(StringUtils.hasLength(queryString)){
//            SolrDocumentList newsdocs = search(queryString, pageNum);
            SolrDocumentList newsdocs = getRelated(queryString, pageNum);
            int size = newsdocSize%10 ==0?  newsdocSize/10: newsdocSize/10 + 1;
            List<String> aList = new ArrayList<String>();
            for(int i = 0; i <size; i++ ){
                aList.add(Integer.toString(i+1));
            }
            System.out.println(aList.toString());

            mv.addObject("newsdocs",newsdocs);
            mv.addObject("pageList", aList);
            mv.addObject("queryString", queryString);
            mv.addObject("pageParameter", pageNumber);

        }
        mv.setViewName("search");
        return mv;
    }


    @RequestMapping(value = "/tozhaobiao", method = RequestMethod.GET)
    @ResponseBody
//    public String sugguestzbInfo(HttpServletRequest request) throws IOException, SolrServerException {
//
//        String q = request.getParameter("term");
////        String q = request.getParameter("q");
//
//        SolrDocumentList zbdocs=search(q);
//
//        List<Object> list=new ArrayList<Object>();
//
////        List<Map> list =new ArrayList<Map>();
//
//        StringBuffer str=new StringBuffer();
//
//        str.append("[");
//
//        for(SolrDocument doc : zbdocs)
//        {
//            list.add(doc.getFieldValue("zbtitle")+"\n");
////            Map<String,String> map = new HashMap<String,String>();
////            map.put("zbtitle",(String)doc.getFieldValue("zbtitle"));
////            list.add(map);
//            str.append("{zbtitle:'" + doc.getFieldValue("zbtitle") + "', pubdate:'" + doc.getFieldValue("pubdate") + "'}");
//
//        }
//
//        str.append("]");
//
////        String data=list.toString();
//
//        System.out.println(zbdocs);
//
//        System.out.println(str);
//
//        return str.toString();
//
////        return zbdocs ;
//    }



    public SolrDocumentList search(String string, int pageNumber) throws IOException, SolrServerException
    {
        SolrDocumentList docs=null;
        SolrServer solrServer = getSolrServer();
        org.apache.commons.httpclient.HttpClient httpClient = new org.apache.commons.httpclient.HttpClient();
        HttpMethod method = new GetMethod("http://localhost:8080/solr/dataimport?command=full-import");
        httpClient.executeMethod(method);
        SolrQuery query = new SolrQuery();
        query.setQuery("newsContent:" + string);
        //定义分页结果每页返回记录数
        query.setRows(10);
        int start;
        if(pageNumber == 0){
            start = 0;
        }
        else{
            start = (pageNumber - 1) * 10;
        }

        query.setStart(start);
        query.setSort("newsPubdate", SolrQuery.ORDER.desc);
        try
        {
            QueryResponse rsp = solrServer.query(query);
            docs = rsp.getResults();
            newsdocSize = (int) docs.getNumFound();
            System.out.println(docs.getClass());
            System.out.println(docs.getNumFound());
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

    public SolrDocumentList getRelated(String title, int pageNumber) throws IOException, SolrServerException {
        SolrDocumentList docs=null;
        SolrServer solrServer = getSolrServer();
        org.apache.commons.httpclient.HttpClient httpClient = new org.apache.commons.httpclient.HttpClient();
        HttpMethod method = new GetMethod("http://localhost:8080/solr/dataimport?command=full-import");
        httpClient.executeMethod(method);
        SolrQuery query = new SolrQuery();
        query.setQuery("/" + MoreLikeThisParams.MLT);
        query.setQuery("newsContent:" + title);
        query.setParam(MoreLikeThisParams.MLT, true);
        query.setParam("fl", "id, newsTitle,newsLink, newsPubdate");
        query.setParam("mlt.fl", "title");
        query.setParam(MoreLikeThisParams.MIN_TERM_FREQ, "1");
        query.setParam(MoreLikeThisParams.MIN_DOC_FREQ, "1");
        query.setRows(10);

        int start;
        if(pageNumber == 0){
            start = 0;
        }
        else{
            start = (pageNumber - 1) * 10;
        }
        query.setStart(start);

        QueryResponse response =  solrServer.query(query);
        NamedList list = (NamedList) response.getResponse().get("moreLikeThis");
        SolrDocumentList result = response.getResults();
        newsdocSize = (int) result.getNumFound();
        System.out.println(list.size());
        System.out.println(result.getClass());
        logger.info("文档个数：" + list.size());
        logger.info("查询时间：" + response.getQTime());

        return result;

    }



    public  SolrServer getSolrServer() throws IOException{
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


