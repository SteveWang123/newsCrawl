var TableManaged = function () {

    return {

        //main function to initiate the module
        init: function () {

            if (!jQuery().dataTable) {
                return;
            }

            // begin first table
            var riverTable = $('#riverTable').dataTable({
                "aoColumns": [
                    { "bSortable": false },
                    { "bSortable": false },
                    { "bSortable": false },
                    { "bSortable": false },
                    { "bSortable": false },
                    { "bSortable": false },
                    { "bSortable": false },
                    { "bSortable": false }
                ],
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 5,
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ 条/页",
                    "oPaginate": {
                        "sPrevious": "上一页",
                        "sNext": "下一页"
                    }
                }
//                ,
//                "aoColumnDefs": [
//                    {
//                        'bSortable': false,
//                        'aTargets': [0]
//                    }
//                ]
            });

            $('#riverTable a.delete').live('click', function (e) {
                e.preventDefault();
                if (confirm("确定删除吗?") == false) {
                    return;
                }
                var riverId = $(this).attr("dataid");
                var nRow = $(this).parents('tr')[0];
                $.ajax({
                    type: "post",
                    url: getContextPath() + "/river/delete.html",
                    dataType: 'json',
                    data: 'id=' + riverId,
                    success: function (json) {
                        if (json.status) {
                            riverTable.fnDeleteRow(nRow);
                        }else{
                            alert("operation failed!");
                        }
                    }
                });
            });



            jQuery('#riverTable .group-checkable').change(function () {
                var set = jQuery(this).attr("data-set");
                var checked = jQuery(this).is(":checked");
                jQuery(set).each(function () {
                    if (checked) {
                        $(this).attr("checked", true);
                    } else {
                        $(this).attr("checked", false);
                    }
                });
                jQuery.uniform.update(set);
            });

            jQuery('#riverTable_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
            jQuery('#riverTable_wrapper .dataTables_length select').addClass("m-wrap small"); // modify table per page dropdown
            //jQuery('#riverTable_wrapper .dataTables_length select').select2(); // initialzie select2 dropdown


        }

    };

}();