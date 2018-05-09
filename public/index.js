$(document).ready(function () {
    var b=''

    var a=''


    var height=$(window).height();
    $('.height').css({height:height-80})
    $('#pre').css({height:height-130})

    $("#submit").click(function () {
        var a = $('#aa').val();
        //去左右空格;
        a=$.trim(a);
        b=a.split(/[\r\n]/g);
        // console.log(typeof (a) ,a);
        b=JSON.stringify(b)
        $.confirm({
            title: 'emd一键生成',
            content: '生成edm',
            type:'red',
            icon:'glyphicon glyphicon-question-sign',
            buttons: {
                ok: {
                    text: '线下版本',
                    btnClass: 'btn-primary',
                    action: function(){
                        $('#page small')[0].innerHTML='线下页面预览'
                        $('#code small')[0].innerHTML='线下代码预览'
                        $("#pre")[0].innerHTML=''
                        $.post("bb",{suggest:b},function(res){
                            console.log(res.config,$("#externalFrame"))
                            if(res.status==0){
                                var confing=true
                                var infosArrs=JSON.stringify(res.infosArrs)
                                $.post("cc",{infosArrs:infosArrs,confing:confing},function(res){
                                    $(window.parent.document) .find("#externalFrame").attr("src","src/");
                                    $('#externalFrame').load(function(){
                                        a= $('#externalFrame').contents().find('table').html();
                                        var b=a.replace(/</g,"&lt").replace(/>/g,"&gt")
                                        $("#pre")[0].innerHTML=b
                                        console.log(typeof(b),b,'new')
                                    })
                                });
                            }
                        });
                    }
                },
                cancel: {
                    text: '线上版本',
                    btnClass: 'btn-primary',
                    action: function(){
                        $('#page small')[0].innerHTML='线上页面预览'
                        $('#code small')[0].innerHTML='线上代码预览'
                        $("#pre")[0].innerHTML=''
                        $.post("bb",{suggest:b},function(res){
                            let links=res.config
                            if(res.status==0){
                                var infosArrs=JSON.stringify(res.infosArrs)
                                //线上版本
                                var confing=false
                                $.post("cc",{infosArrs:infosArrs,confing:confing},function(res){

                                    $(window.parent.document) .find("#externalFrame").attr("src",links);
                                    $('#externalFrame').load(function(){
                                        a= $('#externalFrame').contents().find('table').html();
                                        var b=a.replace(/</g,"&lt").replace(/>/g,"&gt")
                                        $("#pre")[0].innerHTML=b
                                        console.log(typeof(b),b,'new')
                                    })
                                });
                            }
                        });
                    }

                },
            }
        });

        // $.post("bb",{suggest:b},function(res){
        //     console.log(res.config)
        //     $("#onLine").attr("href",res.config);
        //     if(res.status==0){
        //         var infosArrs=JSON.stringify(res.infosArrs)
        //         $.post("cc",{infosArrs:infosArrs},function(res){
        //             console.log(res.config)
        //             $("#onLine").attr("href",res.config);
        //         });
        //     }
        // });

    })


})
