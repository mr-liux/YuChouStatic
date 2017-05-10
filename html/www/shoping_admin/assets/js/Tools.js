/**
 * Created by yicj on 2017/5/10.
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

}