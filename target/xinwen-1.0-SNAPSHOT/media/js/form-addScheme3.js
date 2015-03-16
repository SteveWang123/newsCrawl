var SchemeAdd3 = function () {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(dm_editable, nRow) {
                var aData = dm_editable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    dm_editable.fnUpdate(aData[i], nRow, i, false);
                }
                dm_editable.fnDraw();
            }

            function editRow(dm_editable, nRow) {
                var aData = dm_editable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                jqTds[0].innerHTML = '<input type="text" readOnly="true" class="m-wrap small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" readOnly="true" class="m-wrap small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[3] + '">';
                jqTds[4].innerHTML = '<a class="edit" href="">保存</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class="cancel" href="">取消</a>';
            }

            function saveRow(dm_editable, nRow) {

                var jqInputs = $('input', nRow);
//                var schemeid = $('#schemeId').val();
                var sectionnumber =  jqInputs[0].value;
                var t =  jqInputs[1].value;
                var q = jqInputs[2].value;
                var h = jqInputs[3].value;

                var dataid = $(nRow).data("id");
                var parameter ="id="+dataid+'&q=' + q + '&h=' + h ;
                //验证
                $.ajax({
                    type: "post",
                    url:getContextPath() + "/scheme/saveModelData.html",
                    dataType: 'json',
                    data: parameter,
                    success:function(json){
                        if (json.status) {
                            dm_editable.fnUpdate(sectionnumber, nRow, 0, false);
                            dm_editable.fnUpdate(t, nRow, 1, false);
                            dm_editable.fnUpdate(q, nRow, 2, false);
                            dm_editable.fnUpdate(h, nRow, 3, false);
                            var objid = json.obj.id;
                            dm_editable.fnUpdate('<a class="edit"  href="">编辑</a>', nRow, 4, false);
                            if (typeof  dataid !== 'number') {
                                //如果是新数据，就要给行加data-id的属性
                                $(nRow).attr("data-id", objid);
                            }
                            dm_editable.fnDraw();
                        }
                        else {
                            alert("operation failed!");
                        }
                    }
                });
            }


            function cancelEditRow(dm_editable, nRow) {
                var jqInputs = $('input', nRow);
                dm_editable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                dm_editable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                dm_editable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                dm_editable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                dm_editable.fnUpdate('<a class="edit" href="">编辑</a>', nRow, 4, false);
                dm_editable.fnDraw();
            }

            var dm_editable = $('#dm_editable').dataTable({
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 20,
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ 记录/页",
                    "oPaginate": {
                        "sPrevious": "上一页",
                        "sNext": "下一页"
                    }
                },
                "aoColumnDefs": [{
                    'bSortable': false,
                    'aTargets': [0]
                }
                ]
            });

            jQuery('#dm_editable_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
            jQuery('#dm_editable_wrapper .dataTables_length select').addClass("m-wrap small"); // modify table per page dropdown
            jQuery('#dm_editable_wrapper .dataTables_length select').select2({
                showSearchInput : false //hide search box with special css class
            }); // initialzie select2 dropdown

            var nEditing = null;

            $('#dm_editable_new').click(function (e) {
                e.preventDefault();
                var aiNew = dm_editable.fnAddData(['', '', '', '', '', '', '',
                    '<a class="edit" href="">编辑</a>', '<a class="cancel" data-mode="new" href="">取消</a>'
                ]);
                var nRow = dm_editable.fnGetNodes(aiNew[0]);
                editRow(dm_editable, nRow);
                nEditing = nRow;
            });

//            $('#dm_editable a.delete').live('click', function (e) {
//                e.preventDefault();
//
//                if (confirm("您确定删除该数据？") == false) {
//                    return;
//                }
//
//                var nRow = $(this).parents('tr')[0];
//                var dataid = $(nRow).data("id");
//                $.ajax({
//                    type: "post",
//                    url: getContextPath() + "/river/deleteSectionParam.html",
//                    dataType: 'json',
//                    data: 'id=' + dataid,
//                    success: function (json) {
//                        if (json.status) {
//                            dm_editable.fnDeleteRow(nRow);
//                        } else {
//                            alert("operation failed!");
//                        }
//                    }
//                });
//            });

            $('#dm_editable a.cancel').live('click', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    dm_editable.fnDeleteRow(nRow);
                } else {
                    restoreRow(dm_editable, nEditing);
                    nEditing = null;
                }
            });

            $('#dm_editable a.edit').live('click', function (e) {
                e.preventDefault();

                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];

                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    restoreRow(dm_editable, nEditing);
                    editRow(dm_editable, nRow);
                    nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "保存") {
                    /* Editing this row and want to save it */
                    saveRow(dm_editable, nEditing);
                    nEditing = null;

                } else {
                    /* No edit in progress - let's start one */
                    editRow(dm_editable, nRow);
                    nEditing = nRow;
                }
            });

            $("#next").click(function(){
                var url=getContextPath() + '/scheme/addScheme4.html?id='+$('#schemeId').val();
                window.location.href = url;
            });

            $("#return_3").click(function(){
                var url=getContextPath() + '/scheme/addScheme2.html?id='+$('#schemeId').val();
                window.location.href = url;
            });

            $("#return_4").click(function(){
                var url=getContextPath() + '/scheme/addScheme3.html?id='+$('#schemeId').val();
                window.location.href = url;
            });

            $("#save").click(function(){
                var url=getContextPath() + '/scheme/startCompute.html?id='+$('#schemeId').val();
                window.location.href = url;
            });


        }

    };

}();