/**
 * Created by yicj on 2017/5/10.
 */
//全局配置
var Config = {
    baseAdminPath:"/yuchou-admin",
    pagesize:20,
}

//工具类
var Tools =  {
    token:"",
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
    loadTable:function (options) {
        $(options.id).datagrid({
            cls:"theme-datagrid",
            title:(typeof options.title=='undefined'?'':options.title),
            singleSelect:true,
            width:'100%',
            //showFooter:true,
            method:"get",
            cache:false,
            pagination:true,
            pageSize:Config.pagesize,
            //rownumbers:true,//显示序号
            collapsible:true,
            url:Config.baseAdminPath+(typeof options.url=='undefined'?'':options.url),
            loader:function(param,success,error){
                var that = $(this);
                var opts = that.datagrid("options");
                if (!opts.url) {
                    return false;
                }
                var tempUrlParams = '?1=1';
                //console.log(options.params);
                //console.log(param);
                if(typeof param != 'undefined'){
                    $.each(param,function (key) {
                        if(key=='page'){
                            tempUrlParams+='&cpage='+(typeof param[key]=='undefined'?'':param[key]);
                        }else if(key=='rows'){
                            tempUrlParams+='&pagesize='+(typeof param[key]=='undefined'?'':param[key]);
                        }else{
                            tempUrlParams+='&'+key+'='+(typeof param[key]=='undefined'?'':param[key]);
                        }
                    });
                }
                if(typeof options.params != 'undefined'){
                    $.each(options.params,function (key) {
                        tempUrlParams+='&'+key+'='+(typeof options.params[key]=='undefined'?'':options.params[key]);
                    })
                }
                Tools.ajax({
                    type: opts.method,
                    url: opts.url+tempUrlParams,
                    success: function (data) {
                        var temp = {};
                        temp.rows=[];
                        temp.total=0;
                        if(data&&data.success&&data.code==0){
                            temp.rows=data.data;
                            temp.total=data.ext.pageInfo.totalCount;
                        }
                        success(temp);
                        if(typeof options.success!='undefined'){
                            options.success(data);
                        }
                    }
                });
            },
            onLoadSuccess:(typeof options.onLoadSuccess=='undefined'?function(){}:options.onLoadSuccess)
        });
    },
    href:function(url){
        window.location.href="#?"+url;
    },
    back:function(id){
        $(id).click(function(){
            window.history.back();
        });
    }

}