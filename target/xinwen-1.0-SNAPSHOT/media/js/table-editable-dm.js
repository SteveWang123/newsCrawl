var DM_TableEditable = function () {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(riverSectionTable, nRow) {
                var aData = riverSectionTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    riverSectionTable.fnUpdate(aData[i], nRow, i, false);
                }
                riverSectionTable.fnDraw();
            }

            function editRow(riverSectionTable, nRow) {
                var aData = riverSectionTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                jqTds[0].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[3] + '">';
                jqTds[4].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[4] + '">';
                jqTds[5].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[5] + '">';
                jqTds[6].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[6] + '">';
                jqTds[7].innerHTML = '<a class="edit" href="">保存</a>';
                var dataid = $(nRow).data("id");
                if (typeof dataid === 'number')
                    jqTds[8].innerHTML = '<a class="cancel" href="">取消</a>';
                else
                    jqTds[8].innerHTML = '<a class="cancel"   data-mode="new"  href="" >取消</a>';
            }

            function saveRow(riverSectionTable, nRow) {
                var jqInputs = $('input', nRow);
                var riverid = $('#riverid').val();
                var version = jqInputs[0].value;
                var serialNumber = jqInputs[1].value;
                var sectionnumber = jqInputs[2].value;
                var name = jqInputs[3].value;
                var width = jqInputs[4].value;
                var slope = jqInputs[5].value;
                var distance = jqInputs[6].value;

                //验证断面宽度，坡底，距离
                var str=new Array();
                if(width<=0)
                {
                    str.push("断面宽度不能小于0！");
                }
                if(slope<0||slope>=1)
                {
                    str.push("底坡系数必须在0~1之间");
                }
                if(distance<=0)
                {
                    str.push("与上断面距离必须符合实际距离！");
                }
                if(str.length>0)
                {
                    alert(str);
                    return;
                }

                var dataid = $(nRow).data("id");
                var parameter = 'riverid=' + riverid + '&version=' + version +
                    '&serialNumber=' + serialNumber + '&sectionnumber=' + sectionnumber +
                    '&name=' + name + '&width=' + width + '&slope=' +slope + '&distance=' + distance;
                if (typeof dataid === 'number')
                     parameter += "&id=" +dataid;
                //验证

                $.ajax({
                    type: "post",
                    url:getContextPath() + "/river/saveSection.html",
                    dataType: 'json',
                    data: parameter,
                    success:function(json){
                        if (json.status) {
                            riverSectionTable.fnUpdate(version, nRow, 0, false);
                            riverSectionTable.fnUpdate(serialNumber, nRow, 1, false);
                            riverSectionTable.fnUpdate(sectionnumber, nRow, 2, false);
                            riverSectionTable.fnUpdate(name, nRow, 3, false);
                            riverSectionTable.fnUpdate(width, nRow, 4, false);
                            riverSectionTable.fnUpdate(slope, nRow, 5, false);
                            riverSectionTable.fnUpdate(distance, nRow, 6, false);
                            var objid = json.obj.id;
                            riverSectionTable.fnUpdate('<a class="edit"  href="">编辑</a>', nRow, 7, false);
                            if (typeof  dataid !== 'number') {
                                //如果是新数据，就要给行加data-id的属性
                                $(nRow).attr("data-id", objid);
                            }
                            riverSectionTable.fnUpdate('<a class="delete" href="">删除</a>', nRow, 8, false);
                            riverSectionTable.fnDraw();
                        }
                        else {
                            alert("operation failed!");
                        }
                    }
                });
        }


            function cancelEditRow(riverSectionTable, nRow) {
                var jqInputs = $('input', nRow);
                riverSectionTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                riverSectionTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                riverSectionTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                riverSectionTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                riverSectionTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
                riverSectionTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
                riverSectionTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
                riverSectionTable.fnUpdate('<a class="edit" href="">编辑</a>', nRow, 7, false);
                riverSectionTable.fnDraw();
            }

            var riverSectionTable = $('#riverSectionTable').dataTable({
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

            jQuery('#riverSectionTable_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
            jQuery('#riverSectionTable_wrapper .dataTables_length select').addClass("m-wrap small"); // modify table per page dropdown
            jQuery('#riverSectionTable_wrapper .dataTables_length select').select2({
                showSearchInput : false //hide search box with special css class
            }); // initialzie select2 dropdown

            var nEditing = null;

            $('#riverSectionTable_new').click(function (e) {
                e.preventDefault();
                var aiNew = riverSectionTable.fnAddData(['', '', '', '', '', '', '',
                        '<a class="edit" href="">编辑</a>', '<a class="cancel" data-mode="new" href="">取消</a>'
                ]);
                var nRow = riverSectionTable.fnGetNodes(aiNew[0]);
                editRow(riverSectionTable, nRow);
                nEditing = nRow;
            });

            $('#riverSectionTable a.delete').live('click', function (e) {
                e.preventDefault();

                if (confirm("您确定删除该数据？") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                var dataid = $(nRow).data("id");
                $.ajax({
                    type: "post",
                    url: getContextPath() + "/river/deleteSection.html",
                    dataType: 'json',
                    data: 'id=' + dataid,
                    success: function (json) {
                        if (json.status) {
                            riverSectionTable.fnDeleteRow(nRow);
                        } else {
                            alert("operation failed!");
                        }
                    }
                });
            });

            $('#riverSectionTable a.cancel').live('click', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    riverSectionTable.fnDeleteRow(nRow);
                    nEditing=null;
                } else {
                    restoreRow(riverSectionTable, nEditing);
                    nEditing = null;
                }
            });


            $('#riverSectionTable a.edit').live('click', function (e) {
                    e.preventDefault();

                    /* Get the row as a parent of the link that was clicked on */
                    var nRow = $(this).parents('tr')[0];

                    if (nEditing !== null && nEditing != nRow) {
                        /* Currently editing - but not this row - restore the old before continuing to edit mode */
                        restoreRow(riverSectionTable, nEditing);
                        editRow(riverSectionTable, nRow);
                        nEditing = nRow;
                    } else if (nEditing == nRow && this.innerHTML == "保存") {
                        /* Editing this row and want to save it */
                        saveRow(riverSectionTable, nEditing);
                       // nEditing = null;

                    } else {
                        /* No edit in progress - let's start one */
                        editRow(riverSectionTable, nRow);
                        nEditing = nRow;
                    }
            });
        }

    };

}();