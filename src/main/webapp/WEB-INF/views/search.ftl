<!DOCTYPE html>

<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!-->
<html lang="en"> <!--<![endif]-->

<!-- BEGIN HEAD -->

<head>

    <meta charset="utf-8"/>

    <title>信息汇总</title>

    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>

    <meta content="" name="description"/>

    <meta content="" name="author"/>

    <!-- BEGIN GLOBAL MANDATORY STYLES -->

    <link href="${rc.contextPath}/media/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>

    <link href="${rc.contextPath}/media/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>

    <link href="${rc.contextPath}/media/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>

    <link href="${rc.contextPath}/media/css/style-metro.css" rel="stylesheet" type="text/css"/>

    <link href="${rc.contextPath}/media/css/style.css" rel="stylesheet" type="text/css"/>

    <link href="${rc.contextPath}/media/css/style-responsive.css" rel="stylesheet" type="text/css"/>

    <link href="${rc.contextPath}/media/css/default.css" rel="stylesheet" type="text/css" id="style_color"/>

    <link href="${rc.contextPath}/media/css/uniform.default.css" rel="stylesheet" type="text/css"/>

    <!-- END GLOBAL MANDATORY STYLES -->

    <link href="${rc.contextPath}/media/css/promo.css" rel="stylesheet" type="text/css"/>

    <link href="${rc.contextPath}/media/css/jquery-ui-1.10.1.custom.min.css" rel="stylesheet" type="text/css"/>

    <link href="${rc.contextPath}/media/css/animate.css" rel="stylesheet" type="text/css"/>

    <link rel="shortcut icon" href="${rc.contextPath}/media/image/favicon.ico"/>

</head>

<!-- END HEAD -->

<!-- BEGIN BODY -->

<body class="page-header-fixed page-full-width">

<!-- BEGIN HEADER -->

<div class="header navbar navbar-inverse navbar-fixed-top">

    <!-- BEGIN TOP NAVIGATION BAR -->

    <div class="navbar-inner">

        <div class="container">

            <!-- BEGIN LOGO -->

            <a class="brand" style="width: 450px;">
                <img src="${rc.contextPath}/media/image/logo.png" alt="logo"/>
                新闻信息汇总
            </a>

            <!-- END LOGO -->


            <#--<div class="navbar hor-menu hidden-phone hidden-tablet">-->

                <#--<div class="navbar-inner">-->

                    <#--<ul class="nav">-->

                        <#--<li class="visible-phone visible-tablet">-->

                            <#--<!-- BEGIN RESPONSIVE QUICK SEARCH FORM &ndash;&gt;-->

                            <#--<form class="sidebar-search">-->

                                <#--<div class="input-box">-->

                                    <#--<a class="remove" href="javascript:;"></a>-->

                                    <#--<input type="text" placeholder="Search...">-->

                                    <#--<input type="button" value=" " class="submit">-->

                                <#--</div>-->

                            <#--</form>-->

                            <#--<!-- END RESPONSIVE QUICK SEARCH FORM &ndash;&gt;-->

                        <#--</li>-->

                        <#--<li>-->
                            <#--<a href="${rc.contextPath}/tologin.html" >-->
                                <#--所有新闻-->
                            <#--</a>-->
                        <#--</li>-->

                        <#--<li class="active">-->

                            <#--<a href="${rc.contextPath}/todaycrawl.html">-->
                                <#--今日抓取-->
                            <#--</a>-->
                        <#--</li>-->

                        <#--<li>-->
                            <#--<a href="${rc.contextPath}/todaypub.html">今日发布</a>-->
                        <#--</li>-->

                        <#--<li>-->
                            <#--<a href="#">搜索</a>-->
                        <#--</li>-->

                    <#--</ul>-->

                <#--</div>-->

            <#--</div>-->


            <!-- BEGIN RESPONSIVE MENU TOGGLER -->

            <a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">

                <img src="${rc.contextPath}/media/image/menu-toggler.png" alt=""/>

            </a>

            <!-- END RESPONSIVE MENU TOGGLER -->


        </div>

    </div>

    <!-- END TOP NAVIGATION BAR -->

</div>

<!-- END HEADER -->

<!-- BEGIN CONTAINER -->

<div class="page-container row-fluid">

    <!-- BEGIN PAGE -->

    <div class="page-content no-min-height">

        <!-- BEGIN PAGE -->

        <div class="page-content">

        <div class="container-fluid">

            <!-- BEGIN PAGE HEADER-->

            <div class="row-fluid">

                <div class="span12">

                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->

                    <h3 class="page-title">

                        新闻信息查询

                    </h3>

                    <#--<ul class="breadcrumb">-->

                        <#--<li>-->

                            <#--<i class="icon-home"></i>-->

                            <#--<a href="index.html">输入关键字</a>-->

                    <#--</ul>-->

                    <!-- END PAGE TITLE & BREADCRUMB-->

                </div>

            </div>

            <!-- END PAGE HEADER-->

            <!-- BEGIN PAGE CONTENT-->



            <div class="row-fluid">
                <form action="${rc.contextPath}/tosearch.html" id="form1" method= "post" class="form-horizontal">

                    <div class="span12">

                    <div class="portlet box">

                        <div class="portlet-body form">

                            <!-- BEGIN FORM-->

                            <#--<form action="${rc.contextPath}/tosearch.html" method= "post" class="form-horizontal">-->

                                    <label class="control-label">请输入：</label>

                                    <div class="controls">

                                        <input  name="querystring" type="text" class="span6 m-wrap" value="${queryString!}" ></input>

                                        <input id="su" class="btn blue" type="button" value="搜索" onclick="doSubmit()" >

                                    </div>

                            <#--</form>-->

                            <!-- END FORM-->

                        </div>

                    </div>

                    <div class="span9">

                        <div class="tab-content">

                            <div class="tab-pane active" id="tab_all">

                                <span name="alert" class="alert alert-error hide">没有找到任何信息</span>

                                <div class="accordion in collapse <#if !(newsdocs?exists)>hide</#if>" id="accordion1"
                                     style="height: auto;">


                                <#if newsdocs?exists>
                                <#list newsdocs as tmp>
                                    <div class="accordion-group">
                                        <div class="accordion-heading">
                                            <button class="btn red"
                                                    type="button">${tmp.newsPubdate!}</button>
                                            <a class="btn " target="_blank"
                                               href="${tmp.newsLink}">
                                            ${tmp.newsTitle}
                                            </a>
                                        </div>
                                    </div>
                                </#list>
                                </#if>

                                </div>
                            </div>

                </div>

            </div>

                    <!-- paging -->
                    <div class = "span 6" >
                        <#--<div class="dataTables_paginate paging_bootstrap pagination">-->
                            <#--<ul>-->
                                <#--<li><a href="${rc.contextPath}/tosearch.html">1</a></li>-->
                                <#--<li></li>-->
                            <#--</ul>-->
                        <#--</div>-->

                        <#if pageList?exists>

                        <select id="pageParameter" name= "pageParameter" class="small" onchange="$('#form1').submit();">
                        <#list pageList as tmp>
                            <option value="${tmp}" <#if pageParameter == tmp>selected </#if>>第${tmp}页</option>
                        </#list>
                                <#--<option value="1">1</option>-->
                                <#--<option value="2">2</option>-->
                                <#--<option value="3">3</option>-->
                        </select>

                        </#if>

                        <#--<a class="btn green" data-toggle="dropdown" href="#">-->
                            <#--<i class="icon-user"></i>-->
                            <#--Select-->
                            <#--<i class="icon-angle-down"></i>-->
                        <#--</a>-->
                    </div>
                    <!-- paging -->
            <!-- END PAGE CONTENT-->


                </div>

                </form>



        <!-- END PAGE CONTAINER-->

        </div>


        <!-- BEGIN PAGE -->

        </div>
    </div>

</div>


<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->

<!-- BEGIN CORE PLUGINS -->

<script src="${rc.contextPath}/media/js/jquery-1.10.1.min.js" type="text/javascript"></script>

<script src="${rc.contextPath}/media/js/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>

<!-- IMPORTANT! Load jquery-ui-1.10.1.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->

<script src="${rc.contextPath}/media/js/jquery-ui.js" type="text/javascript"></script>

<script src="${rc.contextPath}/media/js/bootstrap.min.js" type="text/javascript"></script>

<!--[if lt IE 9]>

<script src="${rc.contextPath}/media/js/excanvas.min.js"></script>

<script src="${rc.contextPath}/media/js/excanvas.min.js"></script>

<script src="${rc.contextPath}/media/js/respond.min.js"></script>

<![endif]-->

<script src="${rc.contextPath}/media/js/jquery.slimscroll.min.js" type="text/javascript"></script>

<script src="${rc.contextPath}/media/js/jquery.blockui.min.js" type="text/javascript"></script>

<script src="${rc.contextPath}/media/js/jquery.cookie.min.js" type="text/javascript"></script>

<script src="${rc.contextPath}/media/js/jquery.uniform.min.js" type="text/javascript"></script>

<!-- END CORE PLUGINS -->

<script src="${rc.contextPath}/media/js/app.js"></script>


<script>

    jQuery(document).ready(function () {
        App.init();
    });

function doSubmit(){
    $('#pageParameter').val(1);
    $('#form1').submit();
}

</script>


<!-- END JAVASCRIPTS -->

</body>

<!-- END BODY -->

</html>