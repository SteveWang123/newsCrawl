var TableEditable = function () {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(riverParamTable, nRow) {
                var aData = riverParamTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    riverParamTable.fnUpdate(aData[i], nRow, i, false);
                }

                riverParamTable.fnDraw();
            }

            function editRow(riverParamTable, nRow) {
                var aData = riverParamTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                jqTds[0].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[3] + '">';
                jqTds[4].innerHTML = '<a class="edit" href="">保存</a>';

                var dataid = $(nRow).data("id");
                if (typeof dataid === 'number')
                    jqTds[5].innerHTML = '<a class="cancel" href="">取消</a>';
                else
                    jqTds[5].innerHTML = '<a class="cancel"   data-mode="new"  href="" >取消</a>';
            }

            function saveRow(riverParamTable, nRow) {
                var jqInputs = $('input', nRow);
                var riverid = $('#riverid').val();
                var version = jqInputs[0].value;
                var c = jqInputs[1].value;
                var thita = jqInputs[2].value;
                var fai = jqInputs[3].value;

                var dataid = $(nRow).data("id");
                var parameter = 'riverid=' + riverid +
                    '&version=' + version +
                    '&c=' + c +
                    '&thita=' + thita +
                    '&fai=' + fai;
                if (typeof dataid === 'number')
                    parameter += "&id=" + dataid;
                //验证

                var str=new Array();
                if(c<0)
                {
                    str.push("谢才系数不能小于0！");
                }
                if(thita<=0||thita>=1)
                {
                    str.push("θ必须在0~1之间！")
                }
                if(fai<=0||fai>=1)
                {
                    str.push("φ必须在0~1之间！");
                }
                if(str.length>0)
                {
                    alert(str);
                    //var nEditing = $('#riverParameterTable a.edit').parents('tr')[0];
                    return;
                }

                $.ajax({
                    type: "post",
                    url: getContextPath() + "/river/saveParameter.html",
                    dataType: 'json',
                    data: parameter,
                    success: function (json) {
                        if (json.status) {
                            riverParamTable.fnUpdate(version, nRow, 0, false);
                            riverParamTable.fnUpdate(c, nRow, 1, false);
                            riverParamTable.fnUpdate(thita, nRow, 2, false);
                            riverParamTable.fnUpdate(fai, nRow, 3, false);
                            var objid = json.obj;
                            riverParamTable.fnUpdate('<a class="edit"  href="">编辑</a>', nRow, 4, false);
                            if (typeof dataid !== 'number'){
                                //如果是新数据，就要给行加data-id的属性
                                $(nRow).attr("data-id",objid);
                            }
                            riverParamTable.fnUpdate('<a class="delete" href="">删除</a>', nRow, 5, false);
                            riverParamTable.fnDraw();
                        } else {
                            alert("operation failed!");
                        }
                    }
                });


            }

            function cancelEditRow(riverParamTable, nRow) {
                var jqInputs = $('input', nRow);
                riverParamTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                riverParamTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                riverParamTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                riverParamTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                riverParamTable.fnUpdate('<a class="edit" href="">编辑</a>', nRow, 4, false);
                riverParamTable.fnDraw();
            }

            var riverParamTable = $('#riverParameterTable').dataTable({
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
                },
                "aoColumnDefs": [
                    {
                        'bSortable': false,
                        'aTargets': [0]
                    }
                ]
            });

            jQuery('#riverParameterTable_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
            jQuery('#riverParameterTable_wrapper .dataTables_length select').addClass("m-wrap small"); // modify table per page dropdown
            jQuery('#riverParameterTable_wrapper .dataTables_length select').select2({
                showSearchInput: false //hide search box with special css class
            }); // initialzie select2 dropdown

            var nEditing = null;

            $('#riverParameterTable_new').click(function (e) {
                e.preventDefault();
                var aiNew = riverParamTable.fnAddData(['', '', '', '', '<a class="edit" href="">编辑</a>', '<a class="cancel" data-mode="new" href="">取消</a>'
                ]);
                var nRow = riverParamTable.fnGetNodes(aiNew[0]);
                editRow(riverParamTable, nRow);
                nEditing = nRow;
            });

            $('#riverParameterTable a.delete').live('click', function (e) {
                e.preventDefault();

                if (confirm("您确定删除该数据？") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                var dataid = $(nRow).data("id");
                $.ajax({
                    type: "post",
                    url: getContextPath() + "/river/deleteParameter.html",
                    dataType: 'json',
                    data: 'id=' + dataid,
                    success: function (json) {
                        if (json.status) {
                            riverParamTable.fnDeleteRow(nRow);
                        } else {
                            alert("operation failed!");
                        }
                    }
                });
            });

            $('#riverParameterTable a.cancel').live('click', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    riverParamTable.fnDeleteRow(nRow);
                    nEditing=null;
                } else {
                    restoreRow(riverParamTable, nEditing);
                    nEditing = null;
                }
            });

            $('#riverParameterTable a.edit').live('click', function (e) {
                e.preventDefault();

                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];

                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    restoreRow(riverParamTable, nEditing);
                    editRow(riverParamTable, nRow);
                    nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "保存") {
                    /* Editing this row and want to save it */
                    saveRow(riverParamTable, nEditing);
                    //nEditing = null;
                } else {
                    /* No edit in progress - let's start one */
                    editRow(riverParamTable, nRow);
                    nEditing = nRow;
                }
            });
        }

    };

}();