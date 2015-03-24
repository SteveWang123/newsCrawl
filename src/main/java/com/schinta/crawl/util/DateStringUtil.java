package com.schinta.crawl.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 作者： 刘伟
 * 日期： 2015/3/22.
 * 用途：
 */
public class DateStringUtil {
    private static final String YEAR = Integer.toString(Calendar.getInstance().get(Calendar.YEAR));
    public static String ZGXWDateFormat(String pubdate){
        String pubdateFormated = YEAR + "-" + pubdate;
        System.out.println(pubdateFormated);
        return  pubdateFormated;
    }

    public static String FenghuangDateFormat(String pubdate){
        String pubdateFormated = YEAR + "-" + pubdate;
        pubdateFormated = pubdateFormated.replaceAll("\\/", "-");
        System.out.println(pubdateFormated);
        return pubdateFormated;
    }

    public static String XinlangDateFormat(String pubdate){
        String pubdateFormated = YEAR + "-" + pubdate;
        pubdateFormated = pubdateFormated.replace("月", "-");
        pubdateFormated = pubdateFormated.replace("日", " ");
        pubdateFormated = pubdateFormated.replace("）", "");
        pubdateFormated = pubdateFormated.replace("（", "");
        System.out.println(pubdateFormated);
        return pubdateFormated;
    }


    public static void main(String[] args){
//        ZGXWDateFormat("3-19 16:03:48");
        XinlangDateFormat("（03月23日 14:04）");

    }
}
