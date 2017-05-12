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


 
