package com.schinta.crawl.util;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Collection;

/**
 * 作者： 刘伟
 * 日期： 2015/3/20.
 * 用途：
 */
public class SolrTest {

    private static final String SOLR_URL = "http://localhost:8080/solr";
    private SolrServer solrserver;

    public void initSolrServer() {
        try {
            solrserver.deleteByQuery("*:*");
            //创建一个文档
            SolrInputDocument doc1 = new SolrInputDocument();
            doc1.addField("id", "id1", 1.0f);
            doc1.addField("name", "doc1", 1.0f);
            doc1.addField("price", 10);

            //创建另一个文档
            SolrInputDocument doc2 = new SolrInputDocument();
            doc2.addField("id", "id2", 1.0f);
            doc2.addField("name", "doc2", 1.0f);
            doc2.addField("price", 20);

            //创建文档集合
            Collection<SolrInputDocument> docs = new ArrayList<SolrInputDocument>();
            docs.add(doc1);
            docs.add(doc2);
            //将文档添加到Solr中
            solrserver.add(docs);
            solrserver.commit();
        } catch (SolrServerException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public SolrServer getSolrServer() {
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

    public SolrDocumentList lookUp(String string) throws SolrServerException {
        SolrQuery query = new SolrQuery();
        query.setQuery("id:"+ string);
        query.addSort("price", SolrQuery.ORDER.asc);
        QueryResponse rsp = solrserver.query(query);
        SolrDocumentList docs = rsp.getResults();
        return  docs;
    }


    public static void main(String[] args){
        SolrTest test = new SolrTest();
        test.solrserver = test.getSolrServer();
        test.initSolrServer();
        try {
            SolrDocumentList docs = test.lookUp("id1");
            System.out.println("搜索了：" + docs.size() + "篇新闻");
        } catch (SolrServerException e) {
            e.printStackTrace();
        }
    }
}
