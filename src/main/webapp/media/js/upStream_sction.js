/**
 * Created by N08 on 2014/7/22.
 */

var Section=function()
{

  return{

      init: function () {

          // url:riversOfLevel
          $("#levelList").change(function () {
              var levelId = $(this).children('option:selected').val();
              if (levelId == "")return;

              $.ajax({
                  type: "post",
                  url: getContextPath() + "/river/riversOfLevel.html",
                  dataType: 'json',
                  data: 'level=' + levelId,
                  success: function (json) {
                      if (json) {

                          $("#upstreamriver option").remove();//先清空选项
                          $("#upstreamriver").append('<option value="">请选择</option>');
                          $.each(json, function (i, item) {//item相当于一个表集合
                           $("#upstreamriver").append("<option value=" + item.id + ">" + item.name+ "</option>");//item.ID代表表的ID字段；item.ClassName代表表的ClassName字段。

                          })

                      }
                  }

              });
          });


          $("#upstreamriver").change(function () {

              var riverId = $(this).children('option:selected').attr("value");
              if (riverId == "")return;

              $.ajax({
                  type: "post",
                  url: getContextPath() + "/river/recentSections.html",
                  dataType: 'json',
                  data: 'riverId=' + riverId,
                  success: function (json) {
                      if (json) {

                         $("#upstreamsectionNum option").remove();//先清空选项
                          $("#downstreamsectionNum option").remove();//先清空选项


                          $("#upstreamsectionNum").append('<option value="">请选择</option>');
                          $("#downstreamsectionNum").append('<option value="">请选择</option>');

                          $.each(json, function (i, item) {//item相当于一个表集合
                          $("#upstreamsectionNum").append("<option value=" + item.sectionnumber+ ">" + item.name + "</option>");//item.ID代表表的ID字段；item.ClassName代表表的ClassName字段。
                          $("#downstreamsectionNum").append("<option value=" + item.sectionnumber+ ">" + item.name + "</option>");
                          });
                      }

                  }
              });

          })
      }
  }

}()


