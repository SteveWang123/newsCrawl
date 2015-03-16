package com.schinta.crawl.util;

/**
 * 作者： 刘伟
 * 日期： 2014/9/28.
 * 用途：
 */
import com.schinta.crawl.service.CrawlService;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Modifier;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

public class ClassUtil {

    public static void main(String[] args) {
        List list = getAllClassByInterface(CrawlService.class);
        System.out.println(list.size());
    }
    public static List<Class> getAllClassByInterface(Class c){
        List<Class> returnClassList = new ArrayList<Class>();

        if(c.isInterface()){
            String packageName = c.getPackage().getName()+".impl";
            try{
                List<Class> allClass = getClasses(packageName);
                for(int i=0; i<allClass.size(); i++){
                    if(!Modifier.isAbstract(allClass.get(i).getModifiers()) && c.isAssignableFrom(allClass.get(i))){
                        if(!c.equals(allClass.get(i))){
                            returnClassList.add(allClass.get(i));
                        }
                    }
                }
            }catch(ClassNotFoundException e){
                e.printStackTrace();
            }catch(IOException e){
                e.printStackTrace();
            }
        }
        return returnClassList;
    }





    public static List<Class> getClasses(String packageName) throws ClassNotFoundException,IOException{

        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        String path = packageName.replace(".", "/");

        Enumeration<URL> resources = classLoader.getResources(path);
        List<File> dirs = new ArrayList<File>();
        while(resources.hasMoreElements()){
            URL resource = resources.nextElement();
            dirs.add(new File(resource.getFile()));
        }
        ArrayList<Class> classes = new ArrayList<Class>();
        for(File directory :dirs){
            classes.addAll(findClasses(directory,packageName));
        }
        return classes;
    }

    private static List<Class> findClasses(File directory,String packageName) throws ClassNotFoundException{

        List<Class> classes = new ArrayList<Class>();
        if(!directory.exists()){
            return classes;
        }

        File[] files = directory.listFiles();
        for(File file : files){
            if(file.isDirectory()){
                assert !file.getName().contains(".");
                classes.addAll(findClasses(file,packageName+"."+file.getName()));
            }else if(file.getName().endsWith(".class")){
                classes.add(Class.forName(packageName+"."+file.getName().substring(0,file.getName().length() -6)));
            }
        }
        return classes;
    }

}
