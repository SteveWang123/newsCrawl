var Charts = function () {

    return {
        //main function to initiate the module
        initCharts: function () {


            //转换时间
            function gd(year, month, day){
                return new Date(year, month-1, day).getTime();
            }


            if (!jQuery.plot) {
                return;
            }

            var v=$("#sectionParamList li:last a").html();
            $("#select").text(v);
            $("#select").append('<i class="icon-angle-down"></i>');
            $("#checkData").css("width",850);

            $("#errorAnalysis").css("width",720);

            $("#sectionParamList a").click(function(e){

                var liname=$(this).html();

                $("#select").html(liname+'<i class="icon-angle-down"></i>');

                $("#select").text();




                var sectionnumber = $(this).data("id");
                var schemeId = $("#schemeId").val();
                $.ajax({
                        type: "post",
                        url: getContextPath() + "/scheme/getModelData.html",
                        dataType: 'json',
                        data: 'schemeId=' + schemeId+"&sectionnumber="+sectionnumber,
                        success: function (obj) {
                            $("#modelDataList").html(obj);
                            chart_1();
                        }
                });


            })

            //过程流量水位图
            function chart_1() {
                function randValue() {
                    return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
                }

                //过程流量水位数据（Q，H）
                var modeldata = $("#modelDataList").html();
                var modeldataobj = jQuery.parseJSON(modeldata);
                var modeldata_q = [];
                var modeldata_h = [];


                for(var i=0;i<modeldataobj.length;i++) {
                    modeldata_q.push([modeldataobj[i].t,modeldataobj[i].q] )
                    modeldata_h.push([modeldataobj[i].t,modeldataobj[i].h] )
                }


                function dateToStr(datetime){

                    var year = datetime.getFullYear();
                    var month = datetime.getMonth()+1;//js从0开始取
                    var date = datetime.getDate();
                    var hour = datetime.getHours();
                    var minutes = datetime.getMinutes();
                    var second = datetime.getSeconds();

                    if(month<10){
                        month = "0" + month;
                    }
                    if(date<10){
                        date = "0" + date;
                    }
                    if(hour <10){
                        hour = "0" + hour;
                    }
                    if(minutes <10){
                        minutes = "0" + minutes;
                    }
//                    if(second <10){
//                        second = "0" + second ;
//                    }

                    var time = year+"-"+month+"-"+date+" "+hour+":"+minutes; //2009-06-12 17:18:05
                    return time;
                }


                function insertRow(datatable){

                    var length=modeldataobj.length;
                    var data = '';

                    for (var i = 0; i < length; i++) {
                        data+='<tr>';
                        var datetime=new Date(modeldataobj[i].t);
                        var date=dateToStr(datetime);

                        data+='<td>' +date+  '</td>';
                        data+='<td>' +' ' +  '</td>';
                        data+='<td>' +modeldataobj[i].q +  '</td>';
                        data+='<td>' +' ' +  '</td>';
                        data+='<td>' +' ' +  '</td>';
                        data+='<td>' +modeldataobj[i].h+  '</td>';
                        data+='<td>' +' ' +  '</td>';
                        data+='</tr>';
                    }
                    $("#datatable").append(data);


//                    document.getElementById('datatable').innerHTML = data;
//                    var t = document.createElement('table');
//                    for (var i = 0; i < length; i++) {
//                        var r = t.insertRow(0);
//
//                            var c1 = r.insertCell(0);
//                            c1.innerHTML =modeldataobj[i].t;
//                             var c2 = r.insertCell(0);
//                             c2.innerHTML =modeldataobj[i].q;
//                             var c3 = r.insertCell(0);
//                             c3.innerHTML =modeldataobj[i].h;
//
//                    }
//
//                    $("#datatable").appendChild(t);
//                    t.setAttribute('border', '1');

                }




                function unitFormatter(v, axis) {
                    return v.toFixed(axis.tickDecimals) + "m";
                }

                //begin 流量水位过程线
                function doPlot(position) {
                    $.plot("#chart_qh", [
                        { data: modeldata_q, label: "流量(q)" },
                        { data: modeldata_h, label: "水位(h)", yaxis: 2 }
                    ], {
                        xaxes: [ { mode: "time", timezone: "browser",timeformat: "%m/%d %H"} ],
                        yaxes: [ { min: 0 }, {
                            // align if we are to the right
                            alignTicksWithAxis: position == "right" ? 1 : null,
                            position: position,
                            tickFormatter: unitFormatter
                        } ],
                        legend: { position: "sw" },
                        series: {
                            lines: {
                                show: true,
                                lineWidth: 2,
                                fill: true,
                                fillColor: {
                                    colors: [{
                                        opacity: 0.05
                                    }, {
                                        opacity: 0.01
                                    }
                                    ]
                                }
                            },
                            points: {
                                show: true
                            },
                            shadowSize: 2
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderWidth: 0
                        },
                        colors: ["#d12610", "#37b7f3", "#52e136"]

                    });
                }
                //end 流量水位过程线

                doPlot("right");

                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css({
                            position: 'absolute',
                            display: 'none',
                            top: y + 5,
                            left: x + 15,
                            border: '1px solid #333',
                            padding: '4px',
                            color: '#fff',
                            'border-radius': '3px',
                            'background-color': '#333',
                            opacity: 0.80
                        }).appendTo("body").fadeIn(200);
                }

                var previousPoint = null;
                $("#chart_qh").bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));

                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);

                            showTooltip(item.pageX, item.pageY, item.series.label + "  = " + y);
                        }
                    } else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
                });

                insertRow(datatable);
            }

            //降雨量图表
            function chart_2() {
                //begin 降雨量数据&图表
                var rainfall = [
                    ["2013-1-1", 561.05],
                    ["2013-1-2", 538.32],
                    ["2013-1-3", 517.35],
                    ["2013-1-4", 500.31],
                    ["2013-1-5", 555.55]
                ]

                var plot = $.plot($("#chart_rainfall"), [{
                    data: rainfall,
                    label: "降雨量（mm）"
                }
                ], {
                    legend: { position: "sw" },
                    series: {
//                        lines: {
//                            show: true,
//                            lineWidth: 2,
//                            fill: true,
//                            fillColor: {
//                                colors: [{
//                                    opacity: 0.05
//                                }, {
//                                    opacity: 0.01
//                                }
//                                ]
//                            }
//                        },
//                       points: {
//                           show: true
//                       },
                        bars: {
                            show: true,
                            barWidth: 0.6,
                            align: "center"
                        }
                        //shadowSize: 2
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        tickColor: "#eee",
                        borderWidth: 0
                    },
                    colors: ["#339933", "#66CC66", "#66FF33"],

                    xaxis: {
                         mode: "categories",
                         tickLength: 0
                    }

//                    yaxis: {
//                        ticks: 11,
//                        tickDecimals: 0
//                    }
                });
                //end 降雨量数据&图表

                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y + 5,
                        left: x + 15,
                        border: '1px solid #333',
                        padding: '4px',
                        color: '#fff',
                        'border-radius': '3px',
                        'background-color': '#333',
                        opacity: 0.80
                    }).appendTo("body").fadeIn(200);
                }

                var previousPoint = null;
                $("#chart_rainfall").bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));

                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);

                            showTooltip(item.pageX, item.pageY, item.series.label + "  = " + y);
                        }
                    } else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
                });

            }

            //初始条件图表
            function chart_3() {
                //begin 初始条件数据&图表
                var initialdata = $("#initialList").html();
                var initialdataobj = jQuery.parseJSON(initialdata);
                var sectiondata = $("#sectionNameList").html();
                var sectiondataobj = jQuery.parseJSON(sectiondata);


                var initialdata_q = [];
                var initialdata_h = [];

                for(var i=0;i<initialdataobj.length;i++) {
                    initialdata_q.push([sectiondataobj[i].name,initialdataobj[i].q] )
                    initialdata_h.push([sectiondataobj[i].name,initialdataobj[i].h] )
                }

                function unitFormatter(v, axis) {
                    return v.toFixed(axis.tickDecimals) + "m";
                }

                //begin 流量水位过程线
                function doPlot(position) {
                    $.plot("#chart_initial", [
                        { data:initialdata_q, label: "流量(q)" },
                        { data:initialdata_h, label: "水位(h)", yaxis: 2 }
                    ], {
                        xaxes: [ {mode: "categories",
                            tickLength: 0} ],
                        yaxes: [ { min: 0 }, {
                            // align if we are to the right
                            alignTicksWithAxis: position == "right" ? 1 : null,
                            position: position,
                            tickFormatter: unitFormatter
                        } ],
                        legend: { position: "sw" },
                        series: {
                            lines: {
                                show: true,
                                lineWidth: 2,
                                fill: true,
                                fillColor: {
                                    colors: [{
                                        opacity: 0.05
                                    }, {
                                        opacity: 0.01
                                    }
                                    ]
                                }
                            },
                            points: {
                                show: true
                            },
                            shadowSize: 2
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderWidth: 0
                        },
                        colors: ["#d12610", "#37b7f3", "#52e136"]

                    });
                }
                //end 流量水位过程线
                doPlot("right");
                //end 初始条件数据&图表

                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y + 5,
                        left: x + 15,
                        border: '1px solid #333',
                        padding: '4px',
                        color: '#fff',
                        'border-radius': '3px',
                        'background-color': '#333',
                        opacity: 0.80
                    }).appendTo("body").fadeIn(200);
                }

                var previousPoint = null;
                $("#chart_initial").bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));

                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);

                            showTooltip(item.pageX, item.pageY, item.series.label + "  = " + y);
                        }
                    } else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
                });
            }

            //边界条件图表
            function chart_4() {
                //begin 边界条件数据&图表
                var upperdata = $("#upperBoundaryList").html();
                var upperdataobj = jQuery.parseJSON(upperdata);
                var downdata = $("#downBoundaryList").html();
                var downdataobj = jQuery.parseJSON(downdata);


                var upperdata_q = [];
                var downdata_h = [];

                for(var i=0;i<upperdataobj.length;i++) {
                    upperdata_q.push([upperdataobj[i].t,upperdataobj[i].q] )
                    downdata_h.push([upperdataobj[i].t,downdataobj[i].h] )
                }

                function unitFormatter(v, axis) {
                    return v.toFixed(axis.tickDecimals) + "m";
                }

                //begin 流量水位过程线
                function doPlot(position) {
                    $.plot("#chart_boundary", [
                        { data: upperdata_q, label: "流量(q)" },
                        { data: downdata_h, label: "水位(h)", yaxis: 2 }
                    ], {
                        xaxes: [ { mode: "time", timezone: "browser",timeformat: "%m/%d %H"} ],
                        yaxes: [ { min: 0 }, {
                            // align if we are to the right
                            alignTicksWithAxis: position == "right" ? 1 : null,
                            position: position,
                            tickFormatter: unitFormatter
                        } ],
                        legend: { position: "sw" },
                        series: {
                            lines: {
                                show: true,
                                lineWidth: 2,
                                fill: true,
                                fillColor: {
                                    colors: [{
                                        opacity: 0.05
                                    }, {
                                        opacity: 0.01
                                    }
                                    ]
                                }
                            },
                            points: {
                                show: true
                            },
                            shadowSize: 2
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderWidth: 0
                        },
                        colors: ["#d12610", "#37b7f3", "#52e136"]

                    });
                }
                //end 流量水位过程线

                doPlot("right");
                //end 初始条件数据&图表

                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y + 5,
                        left: x + 15,
                        border: '1px solid #333',
                        padding: '4px',
                        color: '#fff',
                        'border-radius': '3px',
                        'background-color': '#333',
                        opacity: 0.80
                    }).appendTo("body").fadeIn(200);
                }

                var previousPoint = null;
                $("#chart_boundary").bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));

                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);

                            showTooltip(item.pageX, item.pageY, item.series.label + "  = " + y);
                        }
                    } else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
                });
            }

            //河道动态水位过程线
            function chart_5() {
                //begin 河道动态水位过程线
                var updateInterval = $("#updateInterval").val();
                $("#updateInterval").change(function () {
                    var v = $(this).val();
                    if (v && !isNaN(+v)) {
                        updateInterval = +v;
                        if (updateInterval < 1) {
                            updateInterval = 1;
                        } else if (updateInterval > 10) {
                            updateInterval = 10;
                        }
                        $(this).val("" + updateInterval);
                    }
                });
                var modeldata = $("#riverLevelList").html();
                var modeldataobj = jQuery.parseJSON(modeldata);
                var sectiondata = $("#sectionNameList").html();
                var sectiondataobj = jQuery.parseJSON(sectiondata);
                var modeldata_h = [];

                for(var i=0;i<modeldataobj.length;i++) {
                    modeldata_h.push([sectiondataobj[i].name,modeldataobj[i].h] )
                }

                $.plot("#chart_dynamic", [
                    { data: modeldata_h, label: "水位(h)", yaxis: 1 }
                ], {
                    xaxes: [ { mode:"categories"} ],
                    yaxes: [ { min: 0 }, {   } ],
                    legend: { position: "sw" },
                    series: {
                        lines: {
                            show: true,
                            lineWidth: 2,
                            fill: true,
                            fillColor: {
                                colors: [{
                                    opacity: 0.05
                                }, {
                                    opacity: 0.01
                                }
                                ]
                            }
                        },
                        points: {
                            show: true
                        },
                        shadowSize: 2
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        tickColor: "#eee",
                        borderWidth: 0
                    },
                    colors: ["#0099FF", "#3399FF", "#37b7f3"]

                });
                function requestData(){
                    var schemeId = $("#schemeId").val();
                    var curt = $("#param_t").val();
                    if(curt=="")return;
                    $.ajax({
                        type: "post",
                        url: getContextPath() + "/scheme/getModelDataByT.html",
                        dataType: 'json',
                        data: 'schemeId=' + schemeId+"&t="+curt,
                        success: function (json) {
                            if(json.status){
                                $("#riverLevelList").html(json.message);
                                $("#param_t").val(json.obj);
                                chart_5();
                            }else{
                                alert("failed");
                            }


                        }
                    });
                }

                function update() {
                    setTimeout(requestData, updateInterval*1000);
                }
                update();
            }
            //end 河道动态水位过程线

            //Tracking Curves
            //graph
            chart_1();
            chart_2();
            chart_3();
            chart_4();
            chart_5();


        }
        
    };

}();