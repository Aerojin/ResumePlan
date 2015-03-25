/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.5.27 : Database - jianlipro
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `jl_admin` */

CREATE TABLE `jl_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `email` char(50) CHARACTER SET utf8 DEFAULT '' COMMENT '登录邮箱',
  `password` char(255) CHARACTER SET utf8 DEFAULT '' COMMENT '登录密码',
  `is_active` tinyint(1) DEFAULT '1' COMMENT '是否启用',
  `last_login_at` int(11) DEFAULT '0' COMMENT '最后登录时间',
  `created_at` int(11) DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='管理员表';

/*Table structure for table `jl_feedback` */

CREATE TABLE `jl_feedback` (
  `f_id` int(11) NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `f_ip` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT 'ip',
  `f_context` text COLLATE utf8_bin COMMENT '反馈内容',
  `create_at` int(11) NOT NULL DEFAULT '0' COMMENT '反馈时间',
  PRIMARY KEY (`f_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户反馈';

/*Table structure for table `jl_info` */

CREATE TABLE `jl_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL DEFAULT '0' COMMENT 'info_main  id',
  `u_id` int(11) NOT NULL COMMENT '用户id',
  `i_name` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '姓名',
  `i_photo` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '照片',
  `i_sex` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0:保密 1:男 2:女',
  `i_age` tinyint(3) NOT NULL DEFAULT '0' COMMENT '年龄',
  `i_email` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '邮箱',
  `i_phone` int(11) NOT NULL DEFAULT '0' COMMENT '电话',
  `i_gov` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '政治面貌',
  `i_nat` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '民族',
  `i_address` char(100) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '所在地',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='简历基本信息';

/*Table structure for table `jl_info_aihao` */

CREATE TABLE `jl_info_aihao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL DEFAULT '0',
  `u_id` int(11) NOT NULL DEFAULT '0',
  `sort` int(11) NOT NULL DEFAULT '0',
  `context` text COLLATE utf8_bin NOT NULL COMMENT '爱好描述',
  `create_at` int(11) NOT NULL DEFAULT '0',
  `update_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='爱好';

/*Table structure for table `jl_info_article` */

CREATE TABLE `jl_info_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `m_id` int(11) NOT NULL DEFAULT '0' COMMENT '简历id',
  `u_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '标题',
  `content` longtext NOT NULL COMMENT '内容',
  `publish_data` int(11) NOT NULL DEFAULT '0' COMMENT '发布时间',
  `paper_name` text NOT NULL COMMENT '报刊名称/刊号',
  `create_at` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `jl_info_course` */

CREATE TABLE `jl_info_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `m_id` int(11) NOT NULL DEFAULT '0' COMMENT '简历id',
  `u_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '标题',
  `publish_data` int(11) NOT NULL DEFAULT '0' COMMENT '发布时间',
  `create_at` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `jl_info_gongzuo` */

CREATE TABLE `jl_info_gongzuo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL DEFAULT '0',
  `u_id` int(11) NOT NULL DEFAULT '0',
  `sort` int(11) NOT NULL DEFAULT '0',
  `e_company` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '公司名称',
  `e_position` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '职位／角色',
  `bumen` char(50) COLLATE utf8_bin NOT NULL DEFAULT '',
  `e_start_y` tinyint(4) NOT NULL DEFAULT '0' COMMENT '开始年份',
  `e_start_m` tinyint(2) NOT NULL DEFAULT '0' COMMENT '开始月份',
  `e_end_y` tinyint(4) NOT NULL DEFAULT '0' COMMENT '结束年份',
  `e_end_m` tinyint(2) NOT NULL DEFAULT '0' COMMENT '结束月份',
  `e_context` varchar(255) COLLATE utf8_bin DEFAULT '' COMMENT '工作描述',
  `create_at` int(11) NOT NULL DEFAULT '0',
  `update_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='工作经历';

/*Table structure for table `jl_info_jiaoyu` */

CREATE TABLE `jl_info_jiaoyu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL DEFAULT '0' COMMENT 'info_main id',
  `u_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `sort` int(10) NOT NULL DEFAULT '0' COMMENT '排序',
  `xuewei` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '学位',
  `xuexiao` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '学校',
  `zhuanye` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '专业',
  `e_start_y` tinyint(4) NOT NULL DEFAULT '0' COMMENT '开始年份',
  `e_start_m` tinyint(2) NOT NULL DEFAULT '0' COMMENT '开始月份',
  `e_end_y` tinyint(4) NOT NULL DEFAULT '0' COMMENT '结束年份',
  `e_end_m` tinyint(2) NOT NULL DEFAULT '0' COMMENT '结束月份',
  `gpa` float(1,1) NOT NULL DEFAULT '0.0' COMMENT 'GPA',
  `zhuanyesort` int(11) NOT NULL DEFAULT '0' COMMENT '专业排名',
  `e_context` varchar(255) COLLATE utf8_bin DEFAULT '' COMMENT '课程描述',
  `create_at` int(11) NOT NULL DEFAULT '0',
  `update_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='教育背景';

/*Table structure for table `jl_info_jineng` */

CREATE TABLE `jl_info_jineng` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL DEFAULT '0',
  `u_id` int(11) NOT NULL DEFAULT '0',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `name` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '技能名称',
  `chengxv` int(4) NOT NULL DEFAULT '0' COMMENT '技能程序 0-100',
  `create_at` int(11) NOT NULL DEFAULT '0',
  `update_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='技能信息';

/*Table structure for table `jl_info_keyan` */

CREATE TABLE `jl_info_keyan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL DEFAULT '0',
  `u_id` int(11) NOT NULL DEFAULT '0',
  `sort` int(11) NOT NULL DEFAULT '0',
  `e_company` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '课题名称',
  `e_position` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '职责',
  `e_start_y` tinyint(4) NOT NULL DEFAULT '0' COMMENT '开始年份',
  `e_start_m` tinyint(2) NOT NULL DEFAULT '0' COMMENT '开始月份',
  `e_end_y` tinyint(4) NOT NULL DEFAULT '0' COMMENT '结束年份',
  `e_end_m` tinyint(2) NOT NULL DEFAULT '0' COMMENT '结束月份',
  `e_context` varchar(255) COLLATE utf8_bin DEFAULT '' COMMENT '描述',
  `create_at` int(11) NOT NULL DEFAULT '0',
  `update_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='科研经历';

/*Table structure for table `jl_info_main` */

CREATE TABLE `jl_info_main` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `m_id` int(11) NOT NULL DEFAULT '0' COMMENT '模板id',
  `name` varchar(200) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '姓名',
  `title` varchar(200) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '标题',
  `direction` varchar(200) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '求职意向',
  `language` varchar(200) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '语言',
  `i_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '简历状态 0:草稿 1:生成中 2:生成完毕',
  `i_img` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '生成图片地址',
  `i_pdf` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '生成pdf地址',
  `i_edit` tinyint(4) NOT NULL DEFAULT '0' COMMENT '编辑次数',
  `i_print` tinyint(4) NOT NULL DEFAULT '0' COMMENT '打印次数',
  `isMain` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0备用 1主',
  `update_at` int(11) NOT NULL DEFAULT '0' COMMENT '最后更新时间',
  `created_at` int(11) NOT NULL DEFAULT '0' COMMENT '增加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户简历主表';

/*Table structure for table `jl_info_peixun` */

CREATE TABLE `jl_info_peixun` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL DEFAULT '0' COMMENT 'info_main id',
  `u_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `sort` int(10) NOT NULL DEFAULT '0' COMMENT '排序',
  `lingyu` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '培训领域',
  `jigou` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '培训机构',
  `e_start_y` tinyint(4) NOT NULL DEFAULT '0' COMMENT '开始年份',
  `e_start_m` tinyint(2) NOT NULL DEFAULT '0' COMMENT '开始月份',
  `e_end_y` tinyint(4) NOT NULL DEFAULT '0' COMMENT '结束年份',
  `e_end_m` tinyint(2) NOT NULL DEFAULT '0' COMMENT '结束月份',
  `e_context` varchar(255) COLLATE utf8_bin DEFAULT '' COMMENT '描述',
  `create_at` int(11) NOT NULL DEFAULT '0',
  `update_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='培训经历';

/*Table structure for table `jl_info_prize` */

CREATE TABLE `jl_info_prize` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL DEFAULT '0',
  `u_id` int(11) NOT NULL DEFAULT '0',
  `sort` int(11) NOT NULL DEFAULT '0',
  `name` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '奖项名称',
  `p_date_y` tinyint(4) NOT NULL DEFAULT '0' COMMENT '获奖年份',
  `p_date_m` tinyint(2) NOT NULL DEFAULT '0' COMMENT '获奖月份',
  `jibie` int(3) NOT NULL DEFAULT '0' COMMENT '奖项级别',
  `create_at` int(11) NOT NULL DEFAULT '0',
  `update_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='获奖情况';

/*Table structure for table `jl_info_xiangmu` */

CREATE TABLE `jl_info_xiangmu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL DEFAULT '0',
  `u_id` int(11) NOT NULL DEFAULT '0',
  `sort` int(11) NOT NULL DEFAULT '0',
  `e_company` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '公司名称',
  `e_position` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '职位／角色',
  `bumen` char(50) COLLATE utf8_bin NOT NULL DEFAULT '',
  `e_start_y` tinyint(4) NOT NULL DEFAULT '0' COMMENT '开始年份',
  `e_start_m` tinyint(2) NOT NULL DEFAULT '0' COMMENT '开始月份',
  `e_end_y` tinyint(4) NOT NULL DEFAULT '0' COMMENT '结束年份',
  `e_end_m` tinyint(2) NOT NULL DEFAULT '0' COMMENT '结束月份',
  `e_context` varchar(255) COLLATE utf8_bin DEFAULT '' COMMENT '工作描述',
  `create_at` int(11) NOT NULL DEFAULT '0',
  `update_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='项目经历';

/*Table structure for table `jl_info_xiaoyuan` */

CREATE TABLE `jl_info_xiaoyuan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL DEFAULT '0',
  `u_id` int(11) NOT NULL DEFAULT '0',
  `sort` int(10) NOT NULL DEFAULT '0',
  `name` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '社团货活动名称',
  `e_position` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '职责',
  `e_start_y` tinyint(4) NOT NULL DEFAULT '0' COMMENT '开始年份',
  `e_start_m` tinyint(2) NOT NULL DEFAULT '0' COMMENT '开始月份',
  `e_end_y` tinyint(4) NOT NULL DEFAULT '0' COMMENT '结束年份',
  `e_end_m` tinyint(2) NOT NULL DEFAULT '0' COMMENT '结束月份',
  `e_context` varchar(255) COLLATE utf8_bin DEFAULT '' COMMENT '工作描述',
  `create_at` int(11) NOT NULL DEFAULT '0',
  `update_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='校园经历';

/*Table structure for table `jl_info_zhengshu` */

CREATE TABLE `jl_info_zhengshu` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL DEFAULT '0',
  `u_id` int(11) NOT NULL DEFAULT '0',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `name` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '技能名称',
  `chengxv` int(4) NOT NULL DEFAULT '0' COMMENT '技能程序 0-100',
  `create_at` int(11) NOT NULL DEFAULT '0',
  `update_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='证书信息';

/*Table structure for table `jl_info_zwpingjia` */

CREATE TABLE `jl_info_zwpingjia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL DEFAULT '0',
  `u_id` int(11) NOT NULL DEFAULT '0',
  `context` text COLLATE utf8_bin NOT NULL COMMENT '评价内容',
  `create_at` int(11) NOT NULL DEFAULT '0',
  `update_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='自我评价';

/*Table structure for table `jl_like` */

CREATE TABLE `jl_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `u_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `t_id` int(11) NOT NULL DEFAULT '0' COMMENT '模版id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `jl_sort` */

CREATE TABLE `jl_sort` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `u_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `m_id` int(11) NOT NULL DEFAULT '0' COMMENT '简历id',
  `ser_sot` text COMMENT '序列化排序',
  `ctime` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `utime` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `jl_temp` */

CREATE TABLE `jl_temp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态',
  `type_id` tinyint(2) NOT NULL DEFAULT '0' COMMENT '类型id',
  `cid` tinyint(1) NOT NULL DEFAULT '1' COMMENT '模版分类1:单 2:双',
  `ispic` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否需要照片 0：否',
  `name` char(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '模版名',
  `url` text COLLATE utf8_bin NOT NULL COMMENT '预览图地址',
  `num` int(11) NOT NULL DEFAULT '0' COMMENT '使用次数',
  `rec` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否推荐 0 不推荐 1推荐',
  `module_url` text COLLATE utf8_bin NOT NULL COMMENT '模板保存路径',
  `external` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '扩展字段，可以储存限时免费的deadline',
  `is_money` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0免费  1限时免费 2收费 ',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0沉稳  1热情 2淡雅 3开朗  4睿智 5信赖  6活力 ',
  `create_at` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='简历模版';

/*Table structure for table `jl_title` */

CREATE TABLE `jl_title` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `u_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `m_id` int(11) NOT NULL DEFAULT '0' COMMENT '模板id',
  `name` varchar(200) NOT NULL DEFAULT '' COMMENT '姓名',
  `title` varbinary(200) NOT NULL DEFAULT '' COMMENT '标题',
  `direction` varchar(200) NOT NULL DEFAULT '' COMMENT '求职意向',
  `language` tinyint(4) NOT NULL DEFAULT '0' COMMENT '语言 0中文 1自定义',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `jl_user` */

CREATE TABLE `jl_user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `u_email` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '登录邮箱',
  `u_password` varchar(32) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '登录密码',
  `logo` varchar(200) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '用户头像',
  `u_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0:锁定',
  `login_count` int(11) NOT NULL DEFAULT '0' COMMENT '登录次数',
  `last_login_at` int(11) NOT NULL DEFAULT '0' COMMENT '最后登录时间',
  `created_at` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `UNIQUE` (`u_email`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户表';

/*Table structure for table `jl_validmodule` */

CREATE TABLE `jl_validmodule` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `u_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `m_id` int(11) NOT NULL DEFAULT '0' COMMENT '模板id',
  `validdate` int(11) NOT NULL DEFAULT '0' COMMENT '有效期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `jl_vouchers` */

CREATE TABLE `jl_vouchers` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `u_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `voucherNum` int(11) NOT NULL DEFAULT '0' COMMENT '代金券号',
  `currency` int(11) NOT NULL DEFAULT '0' COMMENT '面值',
  `validdate` int(11) NOT NULL DEFAULT '0' COMMENT '有效期',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `create_at` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
