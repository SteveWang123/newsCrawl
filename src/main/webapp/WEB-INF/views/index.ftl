<!DOCTYPE html>

<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!-->
<html lang="en"> <!--<![endif]-->

<!-- BEGIN HEAD -->

<head>

    <meta charset="utf-8"/>

    <title>水利工程招标信息汇总</title>

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
                水利工程招标信息汇总

            </a>

            <!-- END LOGO -->


            <div class="navbar hor-menu hidden-phone hidden-tablet">

                <div class="navbar-inner">

                    <ul class="nav">

                        <li class="visible-phone visible-tablet">

                            <!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->

                            <form class="sidebar-search">

                                <div class="input-box">

                                    <a class="remove" href="javascript:;"></a>

                                    <input type="text" placeholder="Search...">

                                    <input type="button" value=" " class="submit">

                                </div>

                            </form>

                            <!-- END RESPONSIVE QUICK SEARCH FORM -->

                        </li>

                        <li>
                            <a href="${rc.contextPath}/tologin.html" >
                                所有信息
                            </a>
                        </li>

                        <li class="active">

                            <a href="${rc.contextPath}/todaycrawl.html">
                                今日抓取
                            </a>
                        </li>

                        <li>
                            <a href="${rc.contextPath}/todaypub.html">今日发布</a>
                        </li>

                        <li>
                            <a href="${rc.contextPath}/search.html">搜索</a>
                        </li>

                        <li>
                            <a href="${rc.contextPath}/test.html">测试</a>
                        </li>

                    </ul>

                </div>

            </div>


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


        <!-- BEGIN PAGE CONTAINER-->

        <div class="container-fluid promo-page">

            <!-- BEGIN PAGE CONTENT-->

            <div class="row-fluid">

                <div class="span12">

                    <div class="block-grey">

                        <div class="container">

                            <div id="promo_carousel" class="carousel slide">

                                <div class="carousel-inner">

                                    <div class="active item">

                                        <div class="row-fluid">

                                            <div class="span12">
                                            <form action="${rc.contextPath}/tosearch.html" class="form-horizontal" >
                                                <div class="control-group">

                                                    <label class="control-label">搜索：</label>

                                                    <div class="controls">

                                                        <input id="querystring" name="querystring" type="text" class="span6 m-wrap" placeholder="请输入招标信息关键字"  />

                                                        <input id="su" class="btn blue" type="submit" value="搜索" />
                                                        <#--<button type="submit" class="btn blue">Search &nbsp; <i class="m-icon-swapright m-icon-white"></i></button>-->

                                                    </div>

                                                </div>

                                            </form>
                                            </div>

                                            <div class="span12">

                                                <div class="span3">

                                                    <ul class="ver-inline-menu tabbable margin-bottom-10">

                                                        <li class="active">
                                                            <a href="#tab_all" data-toggle="tab">
                                                                <i class="icon-briefcase"></i>
                                                                所有网站
                                                            </a>
                                                            <span class="after"></span>

                                                        </li>
                                                    <#list sitelist as tmp>
                                                        <li><a href="#tab_${tmp.disOrder}" data-toggle="tab"><i
                                                                class="icon-group"></i>${tmp.siteZname}</a></li>
                                                    </#list>
                                                    </ul>

                                                </div>

                                                <div class="span9">

                                                    <div class="tab-content">

                                                        <div class="tab-pane active" id="tab_all">

                                                            <div class="accordion in collapse" id="accordion1"
                                                                 style="height: auto;">

                                                            <#list zblist as tmp>
                                                                <div class="accordion-group">
                                                                    <div class="accordion-heading">
                                                                        <#--<button class="btn red" type="button">${tmp.id}-->
                                                                            <#--有用-->
                                                                        </button>
                                                                        <button class="btn red"
                                                                                type="button">${tmp.pubdate!""}</button>
                                                                        <a class="btn " target="_blank"
                                                                           href="${tmp.link}">
                                                                        ${tmp.title}
                                                                        </a>
                                                                    ${tmp.siteUrl}
                                                                    </div>
                                                                </div>
                                                            </#list>

                                                            </div>

                                                        </div>


                                                    <#list sitelist as siteUrl>

                                                        <div class="tab-pane" id="tab_${siteUrl.disOrder}">

                                                            <div class="accordion in collapse" id="accordion2"
                                                                 style="height: auto;">

                                                                <#list siteUrl.data as tmp>
                                                                    <div class="accordion-group">
                                                                        <div class="accordion-heading">
                                                                            <#--<button class="btn red" type="button">有用-->
                                                                            <#--</button>-->
                                                                            <button class="btn red"
                                                                                    type="button">${tmp.pubdate!""}</button>
                                                                            <a class="btn " target="_blank"
                                                                               href="${tmp.link}">
                                                                            ${tmp.title}
                                                                            </a>

                                                                        </div>
                                                                    </div>
                                                                </#list>
                                                            </div>

                                                        </div>
                                                    </#list>


                                                    </div>

                                                </div>

                                                <!--end span9-->

                                                <div class="span9">

                                                    <div class="tab-content">

                                                        <div class="tab-pane active" id="tab_all">

                                                            <span name="alert" class="alert alert-error hide">没有找到任何信息</span>

                                                            <div class="accordion in collapse <#if !(zbdocs?exists)>hide</#if>" id="accordion1"
                                                                 style="height: auto;">


                                                            <#if zbdocs?exists>
                                                                <#list zbdocs as tmp>
                                                                    <div class="accordion-group">
                                                                        <div class="accordion-heading">
                                                                            <button class="btn red"
                                                                                    type="button">${tmp.pubdate!""}</button>
                                                                            <a class="btn " target="_blank"
                                                                               href="${tmp.link}">
                                                                            ${tmp.zbtitle}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </#list>
                                                            </#if>

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>



                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>

</div>


<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->

<!-- BEGIN CORE PLUGINS -->

<script src="${rc.contextPath}/media/js/jquery-1.10.1.min.js" type="text/javascript"></script>

<script src="${rc.contextPath}/media/js/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>

<!-- IMPORTANT! Load jquery-ui-1.10.1.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->

<script src="${rc.contextPath}/media/js/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>

<script src="${rc.contextPath}/media/js/bootstrap.min.js" type="text/javascript"></script>

<!--[if lt IE 9]>

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

        jQuery('#promo_carousel').carousel({

            interval: 10000,

            pause: 'hover'

        });

    });

</script>

<!-- END JAVASCRIPTS -->

</body>

<!-- END BODY -->

</html>