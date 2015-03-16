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
                            <a href="#">搜索</a>
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

        <!-- BEGIN PAGE -->

        <div class="page-content">

        <div class="container-fluid">

            <!-- BEGIN PAGE HEADER-->

            <div class="row-fluid">

                <div class="span12">

                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->

                    <h3 class="page-title">

                        招标信息查询

                    </h3>

                    <ul class="breadcrumb">

                        <li>

                            <i class="icon-home"></i>

                            <a href="index.html">输入关键字</a>

                    </ul>

                    <!-- END PAGE TITLE & BREADCRUMB-->

                </div>

            </div>

            <!-- END PAGE HEADER-->

            <!-- BEGIN PAGE CONTENT-->



            <div class="row-fluid">

                <div class="span12">

                    <div class="portlet box blue">

                        <div class="portlet-body form">

                            <!-- BEGIN FORM-->

                            <form action="/q/tosearch.html" class="form-horizontal login-form">

                                    <label class="control-label">请输入：</label>

                                    <div class="controls">

                                        <input id="querystring" name="querystring" type="text" class="span6 m-wrap"  />

                                        <input id="su" class="btn blue" type="submit" value="搜索"  >

                                    </div>

                            </form>

                            <!-- END FORM-->

                        </div>

                    </div>

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
            <!-- END PAGE CONTENT-->

        </div>


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

<script src="${rc.contextPath}/media/js/login.js"></script>


<script>

    jQuery(document).ready(function () {

//        Login.init();

        App.init();

        jQuery('#promo_carousel').carousel({

            interval: 10000,

            pause: 'hover'

        });

    });

    $(function() {
        var availableTags = [
            "ActionScript",
            "AppleScript",
            "Asp",
            "BASIC",
            "C",
            "C++",
            "Clojure",
            "COBOL",
            "ColdFusion",
            "Erlang",
            "Fortran",
            "Groovy",
            "Haskell",
            "Java",
            "JavaScript",
            "Lisp",
            "Perl",
            "PHP",
            "Python",
            "Ruby",
            "Scala",
            "Scheme"
        ];
        $( "#querystring" ).autocomplete({
            source: availableTags
        });
    });
</script>


<!-- END JAVASCRIPTS -->

</body>

<!-- END BODY -->

</html>