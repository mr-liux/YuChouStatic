/**
 * Created by yicj on 2017/5/9.
 */
var URLParams = [];
$(function () {
    function setTitle(title){
        //$('#page_center').panel("setTitle",setTitle);
    }
    Q.reg('admin_system_user',function(){$('#page_center').window('refresh','system/user/sys_user.html');setTitle("用户管理");});
    Q.reg('admin_system_user_add',function(){$('#page_center').window('refresh','system/user/sys_user_add.html');});
    Q.reg('admin_system_user_edit',function(){$('#page_center').window('refresh','system/user/sys_user_edit.html');});
    Q.reg('admin_system_user_right',function(){$('#page_center').window('refresh','system/user/sys_user_right.html');});


    Q.reg('admin_system_menu',function(){$('#page_center').window('refresh','system/menu/sys_menu.html');});
    Q.init({
        key:'?',
       // index:initOpenUrl
    });
});
