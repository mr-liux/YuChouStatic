#添加用户对菜单权限分配日志表  --2017/05/12 19:40
CREATE TABLE `sys_user_menu_log` (
  `id` int(15) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `user_ky` int(15) NOT NULL COMMENT '用户ID，外键',
  `menu_ky_str` varchar(1000) NOT NULL COMMENT '菜单ID，分配的菜单主键集合用/分割',
  `is_user_ky` int(15) NOT NULL COMMENT '操作用户ID，外键',
  `status` int(1) DEFAULT '1' COMMENT '状态（0删除，1正常）',
  `add_time` timestamp NULL DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  KEY `sys_user_menu_user_ky` (`user_ky`),
  KEY `sys_user_menu_is_user_ky` (`is_user_ky`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='用户对菜单权限分配日志表';


 INSERT INTO `sys_menu` (`pid`, `htmlUrl`, `url`, `name`, `request`, `attribute`, `add_time`) VALUES 
 ('2', 'admin_content_insert', '/admin/content/insert', '内容添加', 'POST', '2', '2017-05-13 14:41:33')
 INSERT INTO `sys_menu` (`pid`, `htmlUrl`, `url`, `name`, `request`, `attribute`, `add_time`) VALUES 
 ('2', 'admin_content_pagelist_get', '/admin/content/pagelist', '内容列表', 'POST', '2', '2017-05-13 14:41:33')
 INSERT INTO `sys_menu` (`pid`, `htmlUrl`, `url`, `name`, `request`, `attribute`, `add_time`) VALUES 
 ('2', 'admin_content_update_put', '/admin/content/update', '内容修改', 'POST', '2', '2017-05-13 14:41:33')
 
 INSERT INTO `sys_menu` (`pid`, `htmlUrl`, `url`, `name`, `request`, `attribute`, `add_time`) VALUES 
 ('2', '', '/admin/adLocation/list', '查询广告位置集合信息', 'POST', '2', '2017-05-13 14:41:33');
 INSERT INTO `sys_menu` (`pid`, `htmlUrl`, `url`, `name`, `request`, `attribute`, `add_time`) VALUES 
 ('2', '', '/admin/adLocation/update', '修改广告位置信息', 'POST', '2', '2017-05-13 14:41:33');
 
 
 #菜单URL表 添加字段  --2017/05/13 16:40
 ALTER TABLE `sys_menu`
ADD COLUMN `type`  int(1) NOT NULL DEFAULT 0 COMMENT '菜单共用标识（0私有资源，1公共资源）' AFTER `attribute`;

