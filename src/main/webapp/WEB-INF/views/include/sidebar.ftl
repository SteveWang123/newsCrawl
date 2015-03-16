<div class="page-sidebar nav-collapse collapse">

    <!-- BEGIN SIDEBAR MENU -->
    <ul class="page-sidebar-menu">

        <li>

            <!-- BEGIN SIDEBAR TOGGLER BUTTON -->

            <div class="sidebar-toggler hidden-phone"></div>

            <!-- BEGIN SIDEBAR TOGGLER BUTTON -->

        </li>

        <li>

            <!-- BEGIN RESPONSIVE QUICK SEARCH FORM --><!-- END RESPONSIVE QUICK SEARCH FORM -->

        </li>
        <li class="start <#if menuKey == "SCHEME_LIST"  >active</#if> ">

            <a href="${rc.contextPath}/scheme/schemeList.html">

                <i class="icon-folder-close"></i>

                <span class="title">我的方案</span><span class="selected"></span>

            </a>

        </li>

        <li <#if menuKey == "SCHEME_COMPUTE"  >class="active" </#if>>

            <a href="${rc.contextPath}/scheme/addScheme.html">

                <i class="icon-pencil"></i>

                <span class="title">模型计算</span><span class="selected"></span>

            </a>

        </li>

        <li class="last <#if menuKey == "DATAMANAGE_USER"  >active</#if> <#if menuKey == "DATAMANAGE_RIVER"  >active</#if> ">

            <a href="${rc.contextPath}/river/riverList.html">

                <i class="icon-th-list"></i>

                <span class="title">基础数据</span>

                <span class="selected"></span>

                <span class="arrow open"></span>

            </a>

            <ul class="sub-menu">

                <li >

                    <a  href="${rc.contextPath}/river/riverList.html">河流数据管理</a>

                </li>
            <#if curuser.username=="admin">
                <li>
                    <a href="${rc.contextPath}/user/userList.html">用户数据管理</a>
                </li>
            </#if >
            </ul>

        </li>
        <!-- END SIDEBAR MENU -->

</div>