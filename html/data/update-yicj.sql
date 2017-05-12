#添加用户信息视图
DROP VIEW v_sys_users;
CREATE VIEW v_sys_users AS 
SELECT 
  u.user_ky,u.user_id,
  u.`name`,
  u.password,
  u.company_ky,
  c.name AS companyName,
  u.org_ky,
  o.name AS orgName,
  u.job_ky,
  j.name AS jobName,
  u.mobile_phone,
  u.phone,
  u.email,
  u.service_num,
  u.manage_flag,
  u.manage_parents,
  u.`status`,
  u.add_time,
  u.upd_time,
  u.last_login_ip,
  u.last_login_num,
  u.reserve1,
  u.reserve2
FROM
  sys_users AS u LEFT JOIN sys_company AS c ON u.company_ky = c.company_ky
                 LEFT JOIN sys_org AS o ON u.org_ky = o.org_ky
                 LEFT JOIN sys_job AS j ON u.job_ky = j.job_ky;
                 
 #修改用户权限表时间默认值为NULL                
ALTER TABLE `shangcheng_db`.`sys_user_menu` CHANGE `add_time` `add_time` TIMESTAMP NULL COMMENT '添加时间'; 

#创建公司视图
CREATE VIEW v_sys_company AS 
SELECT 
    company_ky, `name`, 
    pid,(SELECT `name` FROM sys_company sc WHERE sc.company_ky = c.pid)AS pname, 
    prov_id, (SELECT `name` FROM prov_city_area_street sc WHERE sc.id = c.prov_id)AS provName, 
    city_id, (SELECT `name` FROM prov_city_area_street sc WHERE sc.id = c.city_id)AS cityName, 
    area_id, (SELECT `name` FROM prov_city_area_street sc WHERE sc.id = c.area_id)AS areaName, 
    street_id, (SELECT `name` FROM prov_city_area_street sc WHERE sc.id = c.street_id)AS streetName, 
    detail_address, full_address, 
    service_phone, qq, weixin, sub_domain, sub_name, cash_deposit, manage_id, `status`, 
    add_time, upd_time,description
FROM
sys_company c ;

#创建部门视图
DROP VIEW v_sys_org;

CREATE VIEW v_sys_org AS 
SELECT org_ky, NAME, pid, operation, manage_id, STATUS, add_time, upd_time,(SELECT `name` FROM sys_org so WHERE so.org_ky = o.pid)AS pname FROM  sys_org o

#修改岗位表=》添加公司字段
ALTER TABLE `shangcheng_db`.`sys_job` ADD COLUMN `company_ky` INT(15) NOT NULL COMMENT '公司ID，外键' AFTER `org_ky`; 

#创建岗位视图
CREATE VIEW v_sys_job AS 
SELECT  job_ky, j.`name`, j.pid, j.org_ky, j.manage_id, j.`status`, j.add_time, j.upd_time,j.company_ky,o.`name`  oname,c.`name`  cname
FROM sys_job j 
LEFT JOIN 
sys_company c ON c.company_ky = j.company_ky 
LEFT JOIN 
sys_org o ON j.org_ky =o.org_ky;

ALTER TABLE `shangcheng_db`.`sys_menu` ADD COLUMN `htmlUrl` VARCHAR(200) NOT NULL AFTER `pid`; 
ALTER TABLE `shangcheng_db`.`sys_menu` CHANGE `htmlUrl` `htmlUrl` VARCHAR(200) CHARSET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '前端html地址'; 


 
