var SchemeAdd1 = function () {
    var handleDatetimePicker = function () {
        $(".form_datetime").datetimepicker({
            format: "yyyy-mm-dd hh:ii",
            pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
        });
    }

    return {
        //main function to initiate the module
        init: function () {
            handleDatetimePicker();
            $("#river_list").change(function () {
                var riverId = $(this).children('option:selected').val();
                if (riverId == "")return;

                $.ajax({
                    type: "post",
                    url: getContextPath() + "/river/riverVersions.html",
                    dataType: 'json',
                    data: 'id=' + riverId,
                    success: function (json) {
                        if (json) {
                            $("#riverParamVersionList option").remove();//先清空选项
//                            $("#riverParamVersionList").append('<option value="">请选择</option>');
                            $.each(json, function (i, item) {//item相当于一个表集合
                                $("#riverParamVersionList").append("<option value=" + item + ">" + item + "</option>");//item.ID代表表的ID字段；item.ClassName代表表的ClassName字段。
                            });

                            $("#riverParamVersionList option:last").attr("selected", true)//最后一个选项

                            $("#riverParamVersionList").trigger("change");

                        }
                    }
                });



                $.ajax({
                    type: "post",
                    url: getContextPath() + "/river/sectionVersions.html",
                    dataType: 'json',
                    data: 'id=' + riverId,
                    success: function (json) {
                        if (json) {

                            $("#sectionParamVersionlist option").remove();//先清空选项
//                            $("#sectionParamVersionlist").append('<option value="">请选择</option>');
                            $.each(json, function (i, item) {//item相当于一个表集合
                                $("#sectionParamVersionlist").append("<option value=" + item + ">" + item + "</option>");//item.ID代表表的ID字段；item.ClassName代表表的ClassName字段。
                            });

                            $("#sectionParamVersionlist option:last").attr("selected", true)//最后一个选项

                            $("#sectionParamVersionlist").trigger("change");


                        }
                    }
                });



            });



            $("#riverParamVersionList").change(function () {
                var riverParamVersion = $(this).children('option:selected').val();
                var riverId = $("#river_list").children('option:selected').val();
                if (riverId == "" || riverParamVersion == "")return;
                $.ajax({
                    type: "post",
                    url: getContextPath() + "/river/riverVersion.html",
                    dataType: 'json',
                    data: 'riverId=' + riverId + "&version=" + riverParamVersion,
                    success: function (json) {
                        if (json) {
                            $("#pram_fai").val(json.fai);
                            $("#pram_c").val(json.c);
                            $("#pram_thita").val(json.thita);
                        } else {

                        }
                    }
                });

            })
            $("#sectionParamVersionlist").change(function () {
                var sectionParamVersion = $(this).children('option:selected').val();
                var riverId = $("#river_list").children('option:selected').val();
                if (riverId == "" || sectionParamVersion == "")return;

                $.ajax({
                    type: "post",
                    url: getContextPath() + "/river/sections.html",
                    dataType: 'json',
                    data: 'riverId=' + riverId + "&version=" + sectionParamVersion,
                    success: function (json) {
                        if (json) {
                            $("#upperBoundarySection option").remove();//先清空选项
                            $("#lowerBoundarySection option").remove();
//                            $("#upperBoundarySection").append('<option value="">请选择</option>');
//                            $("#lowerBoundarySection").append('<option value="">请选择</option>');
                            $.each(json, function (i, item) {//item相当于一条记录集合
                                $("#upperBoundarySection").append("<option value=" + item.id + ">" + item.name + "</option>");
                                $("#lowerBoundarySection").append("<option value="+item.id+">"+item.name+"</option>")

                            });

                            $("#upperBoundarySection option:first").attr("selected", true);
                            $("#lowerBoundarySection option:last").attr("selected", true);

                        }
                    }

                });




            })


            jQuery.validator.addMethod("isLowerBoundary", function(value, element) {
                var checkIndex1=$("#upperBoundarySection ").get(0).selectedIndex;
                var checkIndex2=$("#lowerBoundarySection ").get(0).selectedIndex;
                if(checkIndex1>=checkIndex2){
                    return false;
                }else{
                    return true;
                }
            }, "下边界不能在上边界之前");


            var form1 = $('#SchemeOne');
            var error1 = $('.alert-error', form1);

            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-inline', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",
                rules: {
                    riverid: {
                        required: true
                    },
                    c: {
                        required: true,
                        min:0.0000001
                    },
                    endtime: {
                        required: true
                    },
                    fai: {
                        required: true,
                         range:[0,1]
                    },
                    iteration: {
                        required: true
                    },
                    lowerboundaryflag: {
                        required: true
                    },
                    lowerboundarysection: {
                        required: true,
                        isLowerBoundary:true
                    },
                    starttime: {
                        required: true
                    },
                    thita: {
                        required: true,
                        range:[0,1]
                    },
                    timestep: {
                        required: true

                    },
                    upperboundaryflag: {
                        required: true
                    },
                    upperboundarysection: {
                        required: true
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error1.show();
                    App.scrollTo(error1, -200);
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.help-inline').removeClass('ok'); // display OK icon
                    $(element)
                        .closest('.control-group').removeClass('success').addClass('error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change dony by hightlight
                    $(element)
                        .closest('.control-group').removeClass('error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .addClass('valid').addClass('help-inline ok') // mark the current input as valid and display OK icon
                        .closest('.control-group').removeClass('error').addClass('success'); // set success class to the control group
                }

//                submitHandler: function (form) {
//                    success1.show();
//                    error1.hide();
//                }
            });


            jQuery.extend(jQuery.validator.messages,{
                range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
                min: jQuery.validator.format("请输入一个大于 0 的值")

            });
        }

    };


}();