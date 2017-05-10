/**
 * Created by yicj on 2017/5/7.
 */

var Tools =  {
    token:"",
    baseAdminPath:"/yuchou-admin",
    setToken : function(token){
        this.token = token;
    },
    readToken:function(){
        this.token = this.getCookie("X-AUTH-TOKEN");
    },
    checkToken:function(){
        this.readToken();
        if(this.token=="") {
            $.messager.alert('提示',"暂无权限访问，请重新登陆。",'error',function(){
                window.location.href="../admin/login.html";
            });
            return false;
        } else{
            return true;
        }
    },
    getCookie : function(c_name){
        if (document.cookie.length>0)
        {
            c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1)
            {
                c_start=c_start + c_name.length+1
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return "";
    },
    ajax:function(option){
        var tools = this;
        $.ajax({
            url:option.url,
            type:option.type?"get":option.type,
            dataType:"json",
            async:option.async?true:option.async,
            contentType:"application/json",
            data:JSON.stringify(option.data),
            beforeSend:function(xhr){
                if(tools.checkToken(tools.token)){
                    xhr.setRequestHeader("X-AUTH-TOKEN",tools.token);
                }
               // $.messager.progress();
                return true;
            },
            success: function(data){
                if(data!=null){
                    if(typeof data.code != 'undefined'&&data.code != 0 &&data.code != 200){
                        $.messager.alert('提示',data.message,'error',function(){
                            window.location.href="login.html";
                        });
                    }
                }
                try
                {
                    option.success(data);
                }
                catch (e)
                {
                    console.log(e);
                }

            },
            complete:function(){
                //$.messager.progress('close');
            }
        });
    },
    href:function(url){
        window.location.href="#?"+url;
    }
    /*bulidData:function bulidData(data) {
        var temp = $.extend({},data);
        var tempRows = [];
        var start = (param.page - 1) * parseInt(param.rows);
        var end = start + parseInt(param.rows);
        var rows = data.rows;
        for (var i = start; i < end; i++) {
            if(rows[i]){
                tempRows.push(rows[i]);
            }else{
                break;
            }
        }
        temp.rows = tempRows;
        return temp;
    }*/
}

$(function(){



    var Index = {
        init:function(){
            /*布局部分*/
            $('#master-layout').layout({
                fit:true/*布局框架全屏*/
            });


            /*右侧菜单控制部分*/

            var left_control_status=true;
            var left_control_panel=$("#master-layout").layout("panel",'west');

            $(".left-control-switch").on("click",function(){
                if(left_control_status){
                    left_control_panel.panel('resize',{width:70});
                    left_control_status=false;
                    $(".theme-left-normal").hide();
                    $(".theme-left-minimal").show();
                }else{
                    left_control_panel.panel('resize',{width:200});
                    left_control_status=true;
                    $(".theme-left-normal").show();
                    $(".theme-left-minimal").hide();
                }
                $("#master-layout").layout('resize', {width:'100%'})
            });
            Tools.checkToken();
            this.loadRight();
        },
        loadRight:function(){
            var indexObj = this;
            Tools.ajax({
                url:Tools.baseAdminPath+"/admin/system/right/myMenu",
                type:"get",
                success:function(data){
                   var jsonData = data.data;


                   $.each(indexObj.getSubMenu(0,jsonData),function(i,o){
                       $("#menu").append("<a href=\"javascript:void(0);\" data-id=accordion"+o.menuKy+"  class=\" l-btn l-btn-small cls_menu_level\"  ><span class=\"l-btn-left \"><span class=\"l-btn-text\">"+o.name+"</span></span></a>");
                       $("#menu_left").append("<div id='accordion"+o.menuKy+"'></div>")
                       indexObj.createLeftMenu("#accordion"+o.menuKy);
                       $.each(indexObj.getSubMenu(o.menuKy,jsonData),function(i,o2){

                           var rowdata = [];
                           var html="";
                           $.each(indexObj.getSubMenu(o2.menuKy,jsonData),function(i,o3){
                               html+="<p class=\"menu3\" ><a  href='#?"+o3.htmlUrl+"'> "+o3.name+"</a></p>";
                           });
                           $('#accordion'+o.menuKy).accordion('add', {
                               cls: "menu_level"+o.menuKy,
                               title: o2.name,
                               content: html

                           });
                       });
                   });
                    indexObj.set3LevelMenuStyle();
                    indexObj.set1LevleClick();
                    indexObj.initFirstMenuClick();
                }
            });
        },
        getSubMenu:function(id,data){
            var menu = [];
            $.each(data,function(i,o){
                if(o.pid==id){
                    menu.push(o);
                }
            });
            return menu;
        },
        createLeftMenu:function(el){
            $(el).accordion({
                //面板属性
                //collapsible: true,
                //active: 0,
                multiple:true,  // 展开全部
                animate:true, //定义展开和折叠的时候是否显示动画效果
                fit :true,  //自适应父容器 默认false 在此例中就是浏览器，设置为true面板会铺满浏览器
                border:false //是否显示边框
            });
        },
        set3LevelMenuStyle:function(){
            /**
             * 3级菜单点击事件
             */
            $(".menu3").mouseout(function(){
                $(this).css("background-color","#232323");
            });
            $(".menu3").mousemove(function(){
                $(this).css("background-color","#1E1E1E");
            });
            $(".menu3").click(function(){
                $(".menu3").bind("mouseout",function(){
                    $(this).css("background-color","#232323");
                });
                $(".menu3").css("background-color","#232323");
                $(this).css("background-color","#1E1E1E");
                $(this).unbind("mouseout");
            });
        },
        set1LevleClick:function(){
            /**
             * 设置点击一级菜单事件
             */
           $(".cls_menu_level").click(function(){
               $(".cls_menu_level").css("background-color","#1d1d1d");
               $(".cls_menu_level").find(":first-child").find(":first-child").css("color","#c3c3c3");
               $(this).css("background-color","#e31515");
               $(this).find(":first-child").find(":first-child").css("color","#FFF");
               $("div[id^='accordion']").hide();  //隐藏所有id=accordion开头的元素
               $("#"+$(this).attr("data-id")).show();
           });
        },
        initFirstMenuClick:function(){
            $(".cls_menu_level:eq(0)").click();
        }

    }

    Index.init();
});