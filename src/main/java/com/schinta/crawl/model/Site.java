package com.schinta.crawl.model;

/**
 * 作者： 刘伟
 * 日期： 2014/9/30.
 * 用途：
 */
public class Site {
    String siteUrl;
    String siteName;

    public String getSiteUrl() {
        return siteUrl;
    }

    public void setSiteUrl(String siteUrl) {
        this.siteUrl = siteUrl;
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public Site() {
    }

    public Site(String siteUrl, String siteName) {
        this.siteUrl = siteUrl;
        this.siteName = siteName;
    }
}
