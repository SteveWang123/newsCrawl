/**
 * 作者：zhangwenjun
 * 日期： 2014/12/18.
 * 说明：
 */

var Zhaobiao = function () {

    return {
        //main function to initiate the module
        init: function () {

            $(function() {
//                function log( message ) {
//                    $( "<div>" ).text( message ).prependTo( "#log" );
//                    $( "#log" ).scrollTop( 0 );
//                }


                   // remote jsonp
                $( "#city" ).autocomplete({
                    source: function( request, response ) {
                        $.ajax({
                            type:"get",
                            url: getContextPath() +"/tozhaobiao.html",
                            dataType: "jsonp",
                            data: {
                                q: request.term
                            },
                            success: function( data ) {

                                 alert(data);

                                alert(data.responseText);

                                 response( $.map( data, function( item ) {
                                   return {
                                       label:item.zbtitle,
                                       value:item.zbtitle

                                        }
                                }));
                            }
                        });
                    },
                    minLength: 3,
                    select: function( event, ui ) {
                        log( ui.item ?
                            "Selected: " + ui.item.label :
                            "Nothing selected, input was " + this.value);
                    },
                    open: function() {
                        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
                    },
                    close: function() {
                        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
                    }
                });


                  // remote datasource
//                $("#city").autocomplete(getContextPath() +"/tozhaobiao.html", {
//                    minChars: 0,
//                    max:15,
//                    width: 200,
//                    scroll: false,
//                    scrollHeight: 500,
//                    //需要把data转换成json数据格式
//                    parse: function(data) {
//                        return $.map(eval(data), function(row) {
//                            return {
//                                data: row,
//                                value: row.zbtitle,
//                                result: row.zbtitle + " <" + row.pubdate + ">"
//                            }
//                        });
//                    },
//                    formatItem: function(data, i, total) {
//                        return "<div style='float:left'>"+data.zbtitle+data.pubdate+"</div>"
//                    },
//                    formatMatch: function(data, i, total) {
//                        return data.zbtitle;
//                    },
//                    formatResult: function(data, value) {
//                        return data.zbtitle;
//                    }
//                }).result(function(event, data, formatted) {
//                    $("#city").val(data.zbtitle);
//                });



//                $( "#city" ).autocomplete({
//                    source: getContextPath() +"/tozhaobiao.html",
//                    minLength: 2,
//                    select: function( event, ui ) {
//                        log( ui.item ?
//                            "Selected: " + ui.item.value + " aka " + ui.item.id :
//                            "Nothing selected, input was " + this.value );
//                    }
//                });


                //mutiple remote
//                function split( val ) {
//                    return val.split( /,\s*/ );
//                }
//                function extractLast( term ) {
//                    return split( term ).pop();
//                }
//                $( "#city" )
//                   // don't navigate away from the field on tab when selecting an item
//                    .bind( "keydown", function( event ) {
//                        if ( event.keyCode === $.ui.keyCode.TAB &&
//                            $( this ).autocomplete( "instance" ).menu.active ) {
//                            event.preventDefault();
//                        }
//                    })
//                    .autocomplete({
//                        source: function( request, response ) {
//                            $.getJSON( getContextPath() +"/tozhaobiao.html", {
//                                term: extractLast( request.term )
//                            }, response );
//                        },
//                        search: function() {
//                        // custom minLength
//                            var term = extractLast( this.value );
//                            if ( term.length < 2 ) {
//                                return false;
//                            }
//                        },
//                        focus: function() {
//                        // prevent value inserted on focus
//                            return false;
//                        },
//                        select: function( event, ui ) {
//                            var terms = split( this.value );
//                            // remove the current input
//                            terms.pop();
//                           // add the selected item
//                            terms.push( ui.item.value );
//                            // add placeholder to get the comma-and-space at the end
//                            terms.push( "" );
//                            this.value = terms.join( ", " );
//                            return false;
//                        }
//                    });

            });







//            $(function() {
//                function log( message ) {
//                    $( "<div>" ).text( message ).prependTo( "#log" );
//                    $( "#log" ).scrollTop( 0 );
//                }
//                $( "#city" ).autocomplete({
//                    source: getContextPath() +"/tozhaobiao.html",
//                    minLength: 2,
//                    select: function( event, ui ) {
//                        log( ui.item ?
//                            "Selected: " + ui.item.value + " aka " + ui.item.id :
//                            "Nothing selected, input was " + this.value );
//                    }
//                });
//            });

        }

    };

}();
