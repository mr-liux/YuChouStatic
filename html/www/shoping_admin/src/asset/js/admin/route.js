/**
 * Created by yicj on 2017/5/9.
 */
var URLParams = [];
Q.init({
    key:'?',
    //index:'admin_system_user'
});

Q.reg('admin_system_user',function(){$('#page_center').window('refresh','system/user/sys_user.html');});

Q.reg('admin_system_menu',function(){$('#page_center').window('refresh','system/menu/sys_menu.html');});

