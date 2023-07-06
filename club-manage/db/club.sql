/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : club

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 06/07/2023 12:48:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `activity_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '活动编号',
  `apply_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '申请编号',
  `type_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '社团类型编号',
  `club_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '社团编号',
  `picture` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动logo',
  `activity_title` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动主题',
  `activity_intro` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动介绍',
  `activity_content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '活动内容',
  `release_time` datetime(0) NULL DEFAULT NULL COMMENT '发布活动时间',
  `start_time` datetime(0) NULL DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime(0) NULL DEFAULT NULL COMMENT '结束时间',
  `activity_heat` mediumint(0) NULL DEFAULT 0 COMMENT '活动热度',
  `activity_report` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '活动总结',
  `money` decimal(9, 2) NULL DEFAULT 0.00 COMMENT '活动资金',
  `activity_look` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动对象',
  `activity_state` tinyint(0) NULL DEFAULT 0 COMMENT '活动状态 0未发布1已发布2已结束',
  PRIMARY KEY (`activity_id`) USING BTREE,
  INDEX `activity_ibfk_1`(`apply_id`) USING BTREE,
  INDEX `activity_ibfk_2`(`type_id`) USING BTREE,
  INDEX `activity_ibfk_3`(`club_id`) USING BTREE,
  CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`apply_id`) REFERENCES `apply` (`apply_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `activity_type` (`type_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `activity_ibfk_3` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES ('202305092359358441', '202305092359350885', '202305041324423735', '202305081540154863', 'http://localhost:8080/images/activity/1.jpg', '诗歌比赛', '感受诗歌魅力', '<p>感受诗歌美丽</p>\n<img src=\"http://localhost:8080/images/text/2.jpg\" alt=\"undefined\" style=\"height: 10rem;width: 18rem\"/>\n<p></p>\n', '2023-05-11 09:52:24', '2023-07-03 22:35:35', '2023-07-29 22:35:38', 0, NULL, 100.00, '000000', 1);
INSERT INTO `activity` VALUES ('202305100011348401', '202305100011345560', '202305041324423735', '202305081540154863', 'http://localhost:8080/images/activity/1.jpg', 'dsa', 'dsa', '<p>das</p>\n', NULL, '2023-07-03 22:35:35', '2023-07-29 22:35:38', 0, NULL, 100.00, '000000', 0);
INSERT INTO `activity` VALUES ('202305101008431792', '202305101008435571', '202305041325117850', '202305081540154863', 'http://localhost:8080/images/activity/1.jpg', '社团团建', '拉近社团成员之间的关系', '<p style=\"text-align:center;\">拉近社团成员之间的关系</p>\n<p></p>\n<img src=\"http://localhost:8080/images/text/2.jpg\" alt=\"undefined\" style=\"height: 10rem;width: 18rem\"/>\n<p></p>\n<p><span style=\"color: rgb(18,18,18);background-color: rgb(255,255,255);font-size: medium;\">员工们最喜欢的放松方式是什么？那还用说！肯定是放假！（误，划掉），咳咳，是旅游。当然这旅游也不是随随便便地旅游，要是组织那种省钱（低端）路线的省内游，你们的员工肯定宁愿放假（来来自小员工发自内心的哭诉）。所以预算多的土豪爸爸们可以选择高端游，就是那种旅游目的地吸引人，旅游路线规划休闲舒适，没有时间压迫的旅游。当然这样的成本也不会低。所以个人认为此类方案适用于不差钱但是公司或者团队人少的。</span>&nbsp;</p>\n<p></p>\n<img src=\"http://localhost:8080/images/text/3.jpg\" alt=\"undefined\" style=\"height: 10rem;width: 18rem;\"/>\n<p></p>\n<p style=\"text-align:center;\"></p>\n', '2023-05-11 09:52:24', '2023-07-03 22:35:35', '2023-07-29 22:35:38', 0, NULL, 100.00, '202305081540154863', 1);
INSERT INTO `activity` VALUES ('202305101348457652', '202305101348456218', '202305041324581993', '202305062302265336', 'http://localhost:8080/images/activity/6.jpg', '泼水活动', '文化交流源远流长', '<p><span style=\"color: rgb(51,51,51);background-color: rgb(248,249,249);font-size: 16px;font-family: MicrosoftYaHei;\">每年公历4月13日—15日，傣家人就迎来了隆重、欢腾的傣历“新年”——泼水节。“泼水节”傣语译为“桑勘比迈”，意为傣历新年，因每年都有热闹狂欢的泼水活动而被称为“泼水节”。盛装打扮，载歌载舞，泼水节被傣家人视为最美好、吉祥的日子。</span>&nbsp;</p>\n<p></p>\n<img src=\"http://localhost:8080/images/text/8.jpg\" alt=\"undefined\" style=\"height: 10rem;width: 18rem\"/>\n<p></p>\n', '2023-05-10 13:50:08', '2023-07-03 22:35:35', '2023-07-29 22:35:38', 0, NULL, 0.00, '000000', 1);
INSERT INTO `activity` VALUES ('202305111412487535', '202305111412486355', '202305041324581993', '202305111250426296', 'http://localhost:8080/images/activity/2.jpg', '吉他大会', '召集喜欢吉他的爱好者', '<p>召集喜欢吉他的爱好者</p>\n', '2023-05-11 14:15:46', '2023-07-03 22:35:35', '2023-07-29 22:35:38', 0, NULL, 100.00, '000000', 1);
INSERT INTO `activity` VALUES ('202305121452226911', '202305121452226153', '202305041325117850', '202305121445426891', 'http://localhost:8080/images/activity/1.jpg', '计算机大赛', '创办计算机大赛', '<p>创建计算机大赛</p>\n', '2023-05-12 14:52:59', '2023-07-03 22:35:35', '2023-07-29 22:35:38', 0, NULL, 100.00, '000000', 1);
INSERT INTO `activity` VALUES ('202305131639324477', '202305131639327262', '202305041325117850', '202305131635027637', 'http://localhost:8080/images/activity/1.jpg', '红楼梦', '红楼梦', '<p>红楼梦</p>\n', '2023-05-13 16:40:01', '2023-07-03 22:35:35', '2023-07-29 22:35:38', 0, NULL, 500.00, '000000', 1);
INSERT INTO `activity` VALUES ('202307032236024794', '202307032236025452', '202305041324423735', '202305081540154863', 'http://localhost:8080/images/activity/5.jpg', '雷锋精神 ', '雷锋精神内容为热爱党、热爱国家、热爱社会主义的崇高理想和坚定信念；服务人民、助人为乐的奉献精神；干一行爱一行、专一行精一行的敬业精神；锐意进取、自强不息的创新精神；艰苦奋斗、勤俭节约的创业精神。', '<p>&nbsp;<span style=\"color: rgb(51,51,51);background-color: white;\">雷锋精神内容为热爱党、热爱国家、热爱社会主义的崇高理想和坚定信念；服务人民、助人为乐的奉献精神；干一行爱一行、专一行精一行的敬业精神；锐意进取、自强不息的创新精神；艰苦奋斗、勤俭节约的创业精神。</span>&nbsp;</p>\n<p></p>\n<img src=\"http://localhost:8080/images/text/8.jpg\" alt=\"undefined\" style=\"height: 10rem;width: 18rem\"/>\n<p>&nbsp;雷锋精神是新中国成立以来无时无刻不熏陶鼓舞中国人祖祖辈辈的做人法则，深入贯彻了以爱国主义为核心的团结统一爱好和平勤劳勇敢自强不息的伟大的民族精神，中国梦的实现，需要雷锋精神才能在两个百年之际怦然落地。&nbsp;</p>\n<p>这个时代有无数英雄，任何一个国家，任何一个民族，任何历史阶段，是不可能没有英雄的。因为人类对英雄有着本质上的，基因里的一种英雄崇拜情结。所以，我们可以没有钱，我们可以穷，但是我们真的不能没有英雄。&nbsp;</p>\n<p>我们要保卫雷锋精神。一个没有偶像的时代还是时代吗？一个没有偶像的青春还是青春吗？正确地选择你的偶像，就是正确的选择你的人生。&nbsp;&nbsp;</p>\n', '2023-07-03 22:37:08', '2023-07-03 22:35:35', '2023-07-29 22:35:38', 0, NULL, 0.00, '202305081540154863', 1);

-- ----------------------------
-- Table structure for activity_member
-- ----------------------------
DROP TABLE IF EXISTS `activity_member`;
CREATE TABLE `activity_member`  (
  `user_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '账号',
  `activity_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '活动编号',
  `stage_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '阶段编号',
  `bear_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '职位',
  `appraise` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '评价',
  `join_time` datetime(0) NULL DEFAULT NULL COMMENT '加入时间',
  PRIMARY KEY (`user_id`, `activity_id`) USING BTREE,
  INDEX `activity_member_ibfk_2`(`activity_id`) USING BTREE,
  INDEX `activity_member_ibfk_3`(`stage_id`) USING BTREE,
  CONSTRAINT `activity_member_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `activity_member_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity_member
-- ----------------------------
INSERT INTO `activity_member` VALUES ('000000', '202305092359358441', NULL, '活动负责人', '', '2023-05-10 03:44:13');
INSERT INTO `activity_member` VALUES ('000000', '202305101008431792', NULL, '活动负责人', '', '2023-05-10 10:08:57');
INSERT INTO `activity_member` VALUES ('000000', '202305101348457652', NULL, '活动负责人', '', '2023-05-10 13:48:59');
INSERT INTO `activity_member` VALUES ('000000', '202307032236024794', NULL, '活动负责人', '', '2023-07-03 22:36:37');
INSERT INTO `activity_member` VALUES ('202305081106313286', '202305101008431792', NULL, '成员', NULL, '2023-05-10 20:43:11');
INSERT INTO `activity_member` VALUES ('202305081106313286', '202305111412487535', NULL, '活动负责人', '', '2023-05-11 14:14:45');
INSERT INTO `activity_member` VALUES ('202305081106313286', '202307032236024794', NULL, '成员', NULL, '2023-07-03 22:38:22');
INSERT INTO `activity_member` VALUES ('202305111216139730', '202305131639324477', NULL, '活动负责人', '', '2023-05-13 16:39:52');
INSERT INTO `activity_member` VALUES ('202305121438536125', '202305121452226911', NULL, '活动负责人', '', '2023-05-12 14:52:45');

-- ----------------------------
-- Table structure for activity_stage
-- ----------------------------
DROP TABLE IF EXISTS `activity_stage`;
CREATE TABLE `activity_stage`  (
  `stage_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '阶段编号',
  `activity_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '活动编号',
  `stage_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '阶段名称',
  `stage_content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '阶段内容',
  `start_time` datetime(0) NULL DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime(0) NULL DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`stage_id`) USING BTREE,
  INDEX `activity_stage_ibfk_1`(`activity_id`) USING BTREE,
  CONSTRAINT `activity_stage_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity_stage
-- ----------------------------
INSERT INTO `activity_stage` VALUES ('202305102236598326', '202305101008431792', '第一阶段', '开始活动', '2023-05-11 12:00:26', '2023-05-11 16:31:37');
INSERT INTO `activity_stage` VALUES ('202305102327507037', '202305101008431792', '第二阶段', 'dasdas', '2023-05-12 06:27:21', '2023-05-12 23:27:25');

-- ----------------------------
-- Table structure for activity_type
-- ----------------------------
DROP TABLE IF EXISTS `activity_type`;
CREATE TABLE `activity_type`  (
  `type_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '活动类型编号',
  `type_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '类型名',
  `type_content` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '类型介绍',
  `picture` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '类型logo',
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity_type
-- ----------------------------
INSERT INTO `activity_type` VALUES ('202305041324423735', '文化类', '666', 'http://localhost:8080/images/type/8.jpg');
INSERT INTO `activity_type` VALUES ('202305041324581993', '娱乐类', '666', 'http://localhost:8080/images/type/1.jpg');
INSERT INTO `activity_type` VALUES ('202305041325117850', '兴趣类', '666', 'http://localhost:8080/images/type/18.jpg');
INSERT INTO `activity_type` VALUES ('202305041340174601', '新闻类', '阿斯顿撒', 'http://localhost:8080/images/type/2.jpg');
INSERT INTO `activity_type` VALUES ('202305051334488110', '音乐类', '66', 'http://localhost:8080/images/type/1.jpg');

-- ----------------------------
-- Table structure for apply
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply`  (
  `apply_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '申请编号',
  `area_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '场地编号',
  `apply_user` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '申请用户',
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '名称',
  `apply_content` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '申请理由',
  `apply_time` datetime(0) NULL DEFAULT NULL COMMENT '申请时间',
  `apply_state` tinyint(0) NULL DEFAULT 0 COMMENT '申请状态,状态 0: 审核中 1: 通过 2:未通过 10:保存',
  `reply` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '回复',
  `reply_time` datetime(0) NULL DEFAULT NULL COMMENT '回复时间',
  PRIMARY KEY (`apply_id`) USING BTREE,
  INDEX `apply_ibfk_1`(`area_id`) USING BTREE,
  INDEX `apply_ibfk_2`(`apply_user`) USING BTREE,
  CONSTRAINT `apply_ibfk_1` FOREIGN KEY (`area_id`) REFERENCES `area` (`area_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `apply_ibfk_2` FOREIGN KEY (`apply_user`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apply
-- ----------------------------
INSERT INTO `apply` VALUES ('202305062302263318', '202305031553425497', '000000', '娱乐社团', '丰富学生业余生活', '2023-05-06 23:02:26', 1, '通过', '2023-05-06 23:03:13');
INSERT INTO `apply` VALUES ('202305071815597689', '202305031553587875', '000000', '音乐社团', '发扬传统音乐', '2023-05-07 18:15:59', 1, '通过', '2023-05-07 18:17:06');
INSERT INTO `apply` VALUES ('202305071916317525', '202305041628228033', '000000', '诗词社团', '感受诗词魅力', '2023-05-07 19:16:31', 2, '内容不够', '2023-05-07 19:16:48');
INSERT INTO `apply` VALUES ('202305081540158608', '202305031553305043', '000000', '文化社团', '传播传统文化', '2023-05-08 15:40:16', 1, '通过', '2023-05-08 15:40:27');
INSERT INTO `apply` VALUES ('202305091600557380', '202305041628228033', '000000', '棋社', '丰富学生的业余生活', '2023-05-09 16:00:56', 0, NULL, NULL);
INSERT INTO `apply` VALUES ('202305092359350885', '202305092350415986', '000000', '诗歌比赛', '举办诗歌比赛', '2023-05-09 23:59:36', 1, '通过', '2023-05-10 03:44:13');
INSERT INTO `apply` VALUES ('202305100011345560', '202305092350556120', '000000', 'dsa', 'sadsa', '2023-05-10 00:11:35', 2, '不通过', '2023-05-10 03:44:22');
INSERT INTO `apply` VALUES ('202305101008435571', '202305092350556120', '000000', '社团团建', '团建', '2023-05-10 10:08:44', 1, '通过', '2023-05-10 10:08:57');
INSERT INTO `apply` VALUES ('202305101348456218', '202305041628443458', '000000', '泼水活动', '举办泼水节', '2023-05-10 13:48:46', 1, '通过', '2023-05-10 13:48:59');
INSERT INTO `apply` VALUES ('202305111250421205', '202305092351073276', '202305081106313286', '吉他社', '吉他社是一个综合的吉他爱好者的社团，提供吉他谱分享，吉他视频欣赏，吉他入门教学，经验交流，乐器评测等。', '2023-05-11 12:50:43', 1, '通过', '2023-05-11 13:11:30');
INSERT INTO `apply` VALUES ('202305111412486355', '202305041629266554', '202305081106313286', '吉他大会', '举办吉他大会', '2023-05-11 14:12:49', 1, '通过', '2023-05-11 14:14:45');
INSERT INTO `apply` VALUES ('202305121445426494', '202305121442242955', '202305121438536125', '计算机社团', '创建计算机社团', '2023-05-12 14:45:42', 1, '通过', '2023-05-12 14:46:12');
INSERT INTO `apply` VALUES ('202305121452226153', '202305121442337010', '202305121438536125', '计算机大赛', '举办计算机大赛', '2023-05-12 14:52:22', 1, '通过', '2023-05-12 14:52:45');
INSERT INTO `apply` VALUES ('202305131635025249', '202305121442427839', '202305111216139730', '红楼梦社团', '创建红楼梦社团', '2023-05-13 16:35:03', 1, '通过', '2023-05-13 16:35:38');
INSERT INTO `apply` VALUES ('202305131639327262', '202305121442516965', '202305111216139730', '红楼梦', '红楼梦', '2023-05-13 16:39:32', 1, '通过', '2023-05-13 16:39:52');
INSERT INTO `apply` VALUES ('202306291605573269', '202305121443022751', '000000', 'dasd', 'asdas', '2023-06-29 16:05:58', 2, 'as', '2023-06-29 16:07:37');
INSERT INTO `apply` VALUES ('202307032236025452', '202305121443022751', '000000', '雷锋精神 ', '宣传雷锋精神', '2023-07-03 22:36:03', 1, '通过', '2023-07-03 22:36:37');

-- ----------------------------
-- Table structure for area
-- ----------------------------
DROP TABLE IF EXISTS `area`;
CREATE TABLE `area`  (
  `area_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '场地编号',
  `area_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '场地名',
  `status` tinyint(0) NULL DEFAULT 0 COMMENT '场地状态：0-禁用，1-未使用，2-使用中',
  `regist_time` datetime(0) NULL DEFAULT NULL COMMENT '注册',
  `remark` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`area_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of area
-- ----------------------------
INSERT INTO `area` VALUES ('202305031553131834', '尚大楼', 0, '2023-05-03 15:53:14', '666');
INSERT INTO `area` VALUES ('202305031553305043', '禹州楼301', 2, '2023-05-03 15:53:30', '666');
INSERT INTO `area` VALUES ('202305031553425497', '建发楼301', 2, '2023-05-03 15:53:42', '666');
INSERT INTO `area` VALUES ('202305031553587875', '汉水楼301', 2, '2023-05-03 15:53:59', '666');
INSERT INTO `area` VALUES ('202305041628228033', '禹州楼302', 2, '2023-05-04 16:28:22', NULL);
INSERT INTO `area` VALUES ('202305041628443458', '庄重文1号', 2, '2023-05-04 16:28:45', NULL);
INSERT INTO `area` VALUES ('202305041629266554', '禹州楼303', 2, '2023-05-04 16:29:26', NULL);
INSERT INTO `area` VALUES ('202305041629418377', '禹州楼305', 1, '2023-05-04 16:29:42', NULL);
INSERT INTO `area` VALUES ('202305041630020703', '禹州楼304', 1, '2023-05-04 16:30:03', NULL);
INSERT INTO `area` VALUES ('202305092350415986', '建发401', 2, '2023-05-09 23:50:41', NULL);
INSERT INTO `area` VALUES ('202305092350556120', '建发402', 2, '2023-05-09 23:50:55', NULL);
INSERT INTO `area` VALUES ('202305092351073276', '建发403', 2, '2023-05-09 23:51:08', NULL);
INSERT INTO `area` VALUES ('202305121442242955', '建发501', 2, '2023-05-12 14:42:25', NULL);
INSERT INTO `area` VALUES ('202305121442337010', '建发502', 2, '2023-05-12 14:42:34', NULL);
INSERT INTO `area` VALUES ('202305121442427839', '建发503', 2, '2023-05-12 14:42:43', NULL);
INSERT INTO `area` VALUES ('202305121442516965', '建发504', 2, '2023-05-12 14:42:52', NULL);
INSERT INTO `area` VALUES ('202305121443022751', '建发505', 2, '2023-05-12 14:43:02', NULL);
INSERT INTO `area` VALUES ('202305121443100995', '建发506', 1, '2023-05-12 14:43:11', NULL);
INSERT INTO `area` VALUES ('202305121443205298', '建发507', 1, '2023-05-12 14:43:20', NULL);
INSERT INTO `area` VALUES ('202305121443293523', '建发508', 1, '2023-05-12 14:43:29', NULL);
INSERT INTO `area` VALUES ('202305121443497881', '建发509', 1, '2023-05-12 14:43:50', NULL);
INSERT INTO `area` VALUES ('202305121443593411', '建发510', 1, '2023-05-12 14:43:59', NULL);
INSERT INTO `area` VALUES ('202305121444076676', '建发511', 1, '2023-05-12 14:44:08', NULL);
INSERT INTO `area` VALUES ('202305121444177247', '建发512', 1, '2023-05-12 14:44:17', NULL);
INSERT INTO `area` VALUES ('202306272103307344', '建发555', 1, '2023-06-27 21:03:30', NULL);

-- ----------------------------
-- Table structure for bear
-- ----------------------------
DROP TABLE IF EXISTS `bear`;
CREATE TABLE `bear`  (
  `bear_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '担任编号',
  `teacher_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '账号',
  `bear_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '职位',
  `contribute` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '贡献',
  PRIMARY KEY (`bear_id`, `teacher_id`) USING BTREE,
  INDEX `bear_ibfk_1`(`teacher_id`) USING BTREE,
  CONSTRAINT `bear_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bear
-- ----------------------------
INSERT INTO `bear` VALUES ('202305062302265336', '202305062109597986', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305071815595970', '202305071657150320', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305071916318237', '202305071907102069', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305081540154863', '202305071927540743', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305091600554815', '202305071907102069', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305092359358441', '202305071907102069', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305100011348401', '202305062103132799', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305101008431792', '202305062103132799', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305101348457652', '202305071927540743', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305111250426296', '202305071657150320', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305111412487535', '202305071657150320', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305121445426891', '202305062103132799', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305121452226911', '202305062103132799', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305131635027637', '202305071907102069', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202305131639324477', '202305071907102069', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202306291605576507', '202305062109597986', '指导老师', NULL);
INSERT INTO `bear` VALUES ('202307032236024794', '202305071657150320', '指导老师', NULL);

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill`  (
  `bill_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '账单号',
  `bill_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '账单名',
  `bill_belong` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '账单归属',
  `source_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '资金来源',
  `user_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '使用用户',
  `pay_object` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '支付对象',
  `date` datetime(0) NULL DEFAULT NULL COMMENT '日期',
  `pay_state` tinyint(0) NULL DEFAULT 0 COMMENT '支付状态,0:支付中,1:已支付,2:未支付',
  `bill_type` enum('支出','收入') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '支出' COMMENT '账单类型',
  `remark` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`bill_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bill
-- ----------------------------
INSERT INTO `bill` VALUES ('202305091633493735', '给文化社团举办活动的资金', '202305081540154863', '000000', '000000', '202305081540154863', '2023-05-09 16:33:49', 1, '收入', '同意');
INSERT INTO `bill` VALUES ('202305091633497711', '给文化社团举办活动的资金', '000000', '000000', '000000', '202305081540154863', '2023-05-09 16:33:49', 1, '支出', '同意');
INSERT INTO `bill` VALUES ('202305091943343495', '举办活动', '000000', '000000', '000000', '202305081540154863', '2023-05-09 19:43:35', 1, '支出', '通过');
INSERT INTO `bill` VALUES ('202305091943344435', '举办活动', '202305081540154863', '000000', '000000', '202305081540154863', '2023-05-09 19:43:35', 1, '收入', '通过');
INSERT INTO `bill` VALUES ('202305100344135234', '诗歌比赛', '202305081540154863', '202305081540154863', '000000', '202305092359358441', '2023-05-10 03:44:13', 1, '支出', '举办诗歌比赛');
INSERT INTO `bill` VALUES ('202305100344137520', '诗歌比赛', '202305092359358441', '202305081540154863', '000000', '202305092359358441', '2023-05-10 03:44:13', 1, '收入', '举办诗歌比赛');
INSERT INTO `bill` VALUES ('202305101008564938', '社团团建', '202305081540154863', '202305081540154863', '000000', '202305101008431792', '2023-05-10 10:08:57', 1, '支出', '团建');
INSERT INTO `bill` VALUES ('202305101008567518', '社团团建', '202305101008431792', '202305081540154863', '000000', '202305101008431792', '2023-05-10 10:08:57', 1, '收入', '团建');
INSERT INTO `bill` VALUES ('202305101348590072', '泼水活动', '202305101348457652', '202305062302265336', '000000', '202305101348457652', '2023-05-10 13:48:59', 1, '收入', '举办泼水节');
INSERT INTO `bill` VALUES ('202305101348598601', '泼水活动', '202305062302265336', '202305062302265336', '000000', '202305101348457652', '2023-05-10 13:48:59', 1, '支出', '举办泼水节');
INSERT INTO `bill` VALUES ('202305111407494762', '吉他社举办活动', '202305111250426296', '000000', '202305081106313286', '202305111250426296', '2023-05-11 14:07:49', 1, '收入', '通过');
INSERT INTO `bill` VALUES ('202305111407497934', '吉他社举办活动', '000000', '000000', '202305111001541667', '202305111250426296', '2023-05-11 14:07:49', 1, '支出', '通过');
INSERT INTO `bill` VALUES ('202305111414440293', '吉他大会', '202305111412487535', '202305111250426296', '202305081106313286', '202305111412487535', '2023-05-11 14:14:45', 1, '收入', '举办吉他大会');
INSERT INTO `bill` VALUES ('202305111414442666', '吉他大会', '202305111250426296', '202305111250426296', '202305081106313286', '202305111412487535', '2023-05-11 14:14:45', 1, '支出', '举办吉他大会');
INSERT INTO `bill` VALUES ('202305121449506653', '计算机社团举办活动', '000000', '000000', '000000', '202305121445426891', '2023-05-12 14:49:50', 1, '支出', '通过');
INSERT INTO `bill` VALUES ('202305121449509986', '计算机社团举办活动', '202305121445426891', '000000', '202305121438536125', '202305121445426891', '2023-05-12 14:49:50', 1, '收入', '通过');
INSERT INTO `bill` VALUES ('202305121452457142', '计算机大赛', '202305121445426891', '202305121445426891', '202305121438536125', '202305121452226911', '2023-05-12 14:52:45', 1, '支出', '举办计算机大赛');
INSERT INTO `bill` VALUES ('202305121452457600', '计算机大赛', '202305121452226911', '202305121445426891', '202305121438536125', '202305121452226911', '2023-05-12 14:52:45', 1, '收入', '举办计算机大赛');
INSERT INTO `bill` VALUES ('202305131637573076', '给红楼梦社团', '202305131635027637', '000000', '202305111216139730', '202305131635027637', '2023-05-13 16:37:58', 1, '收入', '通过');
INSERT INTO `bill` VALUES ('202305131637578773', '给红楼梦社团', '000000', '000000', '000000', '202305131635027637', '2023-05-13 16:37:58', 1, '支出', '通过');
INSERT INTO `bill` VALUES ('202305131639523270', '红楼梦', '202305131639324477', '202305131635027637', '202305111216139730', '202305131639324477', '2023-05-13 16:39:52', 1, '收入', '红楼梦');
INSERT INTO `bill` VALUES ('202305131639524183', '红楼梦', '202305131635027637', '202305131635027637', '202305111216139730', '202305131639324477', '2023-05-13 16:39:52', 1, '支出', '红楼梦');
INSERT INTO `bill` VALUES ('202307032236372378', '雷锋精神 ', '202307032236024794', '202305081540154863', '000000', '202307032236024794', '2023-07-03 22:36:37', 1, '收入', '宣传雷锋精神');
INSERT INTO `bill` VALUES ('202307032236373804', '雷锋精神 ', '202305081540154863', '202305081540154863', '000000', '202307032236024794', '2023-07-03 22:36:37', 1, '支出', '宣传雷锋精神');

-- ----------------------------
-- Table structure for club
-- ----------------------------
DROP TABLE IF EXISTS `club`;
CREATE TABLE `club`  (
  `club_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '社团编号',
  `apply_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '申请编号',
  `type_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '社团类型编号',
  `user_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '社长编号',
  `club_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '社团名称',
  `picture` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '社团logo',
  `club_intro` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '社团介绍',
  `club_content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '社团内容',
  `state` tinyint(0) NULL DEFAULT 0 COMMENT '社团是否解散。0:未发布,1:发布2:解散',
  `money` decimal(9, 2) NULL DEFAULT 0.00 COMMENT '金额',
  PRIMARY KEY (`club_id`) USING BTREE,
  INDEX `club_ibfk_1`(`apply_id`) USING BTREE,
  INDEX `club_ibfk_2`(`type_id`) USING BTREE,
  INDEX `club_ibfk_3`(`user_id`) USING BTREE,
  CONSTRAINT `club_ibfk_1` FOREIGN KEY (`apply_id`) REFERENCES `apply` (`apply_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `club_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `club_type` (`type_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `club_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of club
-- ----------------------------
INSERT INTO `club` VALUES ('202305062302265336', '202305062302263318', '202305032142589815', '000000', '娱乐社团', 'http://localhost:8080/images/type/3.jpg', '丰富学生业余生活，充实自我', '<p>丰富学生业余生活</p>\n<img src=\"http://localhost:8080/images/text/1.jpg\" alt=\"undefined\" style=\"height: 10rem;width: 18rem\"/>\n<p>嘻嘻</p>\n', 1, 0.00);
INSERT INTO `club` VALUES ('202305071815595970', '202305071815597689', '202305032142042799', '000000', '音乐社团', 'http://localhost:8080/images/type/13.jpg', '发扬传统音乐', '<p>发扬传统音乐</p>\n<img src=\"http://localhost:8080/images/text/20.jpeg\" alt=\"undefined\" style=\"height: 10rem;width: 18rem\"/>\n<p></p>\n', 1, 0.00);
INSERT INTO `club` VALUES ('202305071916318237', '202305071916317525', '202305032143403075', '000000', '诗词社团', 'http://localhost:8080/images/type/2.jpg', '感受诗词魅力', '<p>感受诗词魅力</p>\n', 0, 0.00);
INSERT INTO `club` VALUES ('202305081540154863', '202305081540158608', '202305032143403075', '000000', '文化社团', 'http://localhost:8080/images/club/4.jpg', '文化社始终以“学习国学知识，提高人文素养”为学习目的，致力于继承、弘扬和发展中华优秀传统文化', '<p>文化社始终以“学习国学知识，提高人文素养”为学习目的，致力于继承、弘扬和发展中华优秀传统文化</p>\n<img src=\"http://localhost:8080/images/text/5.jpg\" alt=\"undefined\" style=\"height: 10rem;width: 18rem\"/>\n<p><span style=\"color: rgb(25,25,25);background-color: rgb(255,255,255);font-size: 16px;font-family: PingFang SC\", Arial, 微软雅黑, 宋体, simsun, sans-serif;\">宁负秋光曼妙，不负国学经典。</span>&nbsp;</p>\n', 1, 1800.00);
INSERT INTO `club` VALUES ('202305091600554815', '202305091600557380', '202305032143562241', '000000', '棋社', 'http://localhost:8080/images/club/6.jpg', '有各种各样的棋类活动', '<p>有各种各样的棋类活动</p>\n<img src=\"http://localhost:8080/images/text/8.jpg\" alt=\"undefined\" style=\"height: 10rem;width: 18rem\"/>\n<p></p>\n', 0, 0.00);
INSERT INTO `club` VALUES ('202305111250426296', '202305111250421205', '202305032142042799', '202305081106313286', '吉他社', 'http://localhost:8080/images/club/4.jpg', '吉他社是一个综合的吉他爱好者的社团，提供吉他谱分享，吉他视频欣赏，吉他入门教学，经验交流，乐器评测等。', '<p>吉他社是一个综合的吉他爱好者的社团，提供吉他谱分享，吉他视频欣赏，吉他入门教学，经验交流，乐器评测等。</p>\n<p></p>\n<img src=\"http://localhost:8080/images/text/8.jpg\" alt=\"undefined\" style=\"height: 10rem;width: 18rem\"/>\n<p></p>\n', 1, 900.00);
INSERT INTO `club` VALUES ('202305121445426891', '202305121445426494', '202305032141522130', '202305121438536125', '计算机社团', 'http://localhost:8080/images/club/3.jpg', '吸引学计算机的爱好者，666', '<p>创建计算机社团</p>\n<img src=\"http://localhost:8080/images/text/4.jpg\" alt=\"undefined\" style=\"height: 10rem;width: 18rem\"/>\n<p></p>\n', 1, 9900.00);
INSERT INTO `club` VALUES ('202305131635027637', '202305131635025249', '202305032143403075', '202305111216139730', '红楼梦社团', 'http://localhost:8080/images/club/2.jpg', '红楼梦', '<p>红楼</p>\n<img src=\"http://localhost:8080/images/text/2.jpg\" alt=\"undefined\" style=\"height: 10rem;width: 18rem\"/>\n<p></p>\n', 1, 500.00);
INSERT INTO `club` VALUES ('202306291605576507', '202306291605573269', '202305032142520237', '000000', 'dasd', 'http://localhost:8080/images/club/4.jpg', 'asd', '<p>asd</p>\n', 0, 0.00);

-- ----------------------------
-- Table structure for club_member
-- ----------------------------
DROP TABLE IF EXISTS `club_member`;
CREATE TABLE `club_member`  (
  `user_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '成员账号',
  `club_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '社团编号',
  `bear_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '职位',
  `contribute` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '社团贡献',
  `join_time` datetime(0) NULL DEFAULT NULL COMMENT '加入时间',
  PRIMARY KEY (`user_id`, `club_id`) USING BTREE,
  INDEX `club_member_ibfk_2`(`club_id`) USING BTREE,
  CONSTRAINT `club_member_ibfk_2` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of club_member
-- ----------------------------
INSERT INTO `club_member` VALUES ('000000', '202305062302265336', '社长', '', '2023-05-06 23:03:13');
INSERT INTO `club_member` VALUES ('000000', '202305071815595970', '社长', '', '2023-05-07 18:17:06');
INSERT INTO `club_member` VALUES ('000000', '202305081540154863', '社长', '', '2023-05-08 15:40:27');
INSERT INTO `club_member` VALUES ('202305071657150897', '202305062302265336', '成员', NULL, '2023-06-29 23:38:11');
INSERT INTO `club_member` VALUES ('202305081106313286', '202305081540154863', '成员', NULL, '2023-05-08 15:41:03');
INSERT INTO `club_member` VALUES ('202305081106313286', '202305111250426296', '社长', '', '2023-05-11 13:11:30');
INSERT INTO `club_member` VALUES ('202305081106313286', '202305121445426891', '成员', NULL, '2023-05-12 14:48:14');
INSERT INTO `club_member` VALUES ('202305111216139730', '202305131635027637', '社长', '', '2023-05-13 16:35:38');
INSERT INTO `club_member` VALUES ('202305111216462713', '202305111250426296', '成员', NULL, '2023-05-11 13:38:46');
INSERT INTO `club_member` VALUES ('202305121438536125', '202305111250426296', '成员', NULL, '2023-05-12 14:39:44');
INSERT INTO `club_member` VALUES ('202305121438536125', '202305121445426891', '社长', '', '2023-05-12 14:46:12');
INSERT INTO `club_member` VALUES ('202305121438536125', '202305131635027637', '成员', NULL, '2023-05-13 16:36:40');

-- ----------------------------
-- Table structure for club_report
-- ----------------------------
DROP TABLE IF EXISTS `club_report`;
CREATE TABLE `club_report`  (
  `report_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '总结编号',
  `club_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '社团编号',
  `user_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '发起人',
  `report_title` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '总结主题',
  `report_intro` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '介绍',
  `report_content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '总结内容',
  `picture` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '代表图',
  `stage_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '阶段名称',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`report_id`) USING BTREE,
  INDEX `club_report_ibfk_1`(`club_id`) USING BTREE,
  INDEX `club_report_ibfk_2`(`user_id`) USING BTREE,
  CONSTRAINT `club_report_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `club_report_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of club_report
-- ----------------------------
INSERT INTO `club_report` VALUES ('202305081553491857', '202305081540154863', '000000', '初步完成社团的搭建', '顺利开展了多项活动', '<p style=\"text-align:center;\"><strong>顺利开展了多项活动</strong></p>\n<p></p>\n<img src=\"http://localhost:8080/images/text/6.jpg\" alt=\"undefined\" style=\"height: 10rem;width: 18rem\"/>\n<ol>\n<li>开展诗歌活动</li>\n<li>开展四大名著讲解活动</li>\n<li>上述活动顺利完成</li>\n</ol>\n', 'http://localhost:8080/images/club/3.jpg', '文化社团初级阶段', '2023-05-08 15:53:49');
INSERT INTO `club_report` VALUES ('202305111357116345', '202305111250426296', '202305081106313286', '多项活动开展成功', '本学期我们社团的各种活动都十分顺利，收到广大学生的好评', '<p>本学期我们社团的各种活动都十分顺利，收到广大学生的好评</p>\n', 'http://localhost:8080/images/club/3.jpg', '社团初创阶段', '2023-05-11 13:57:12');
INSERT INTO `club_report` VALUES ('202306302220230298', '202305081540154863', '000000', 'sadfa', 'asdas', '<p>asdfasdf</p>\n', 'http://localhost:8080/images/club/2.jpg', '发大水发大水', '2023-06-30 22:20:23');

-- ----------------------------
-- Table structure for club_type
-- ----------------------------
DROP TABLE IF EXISTS `club_type`;
CREATE TABLE `club_type`  (
  `type_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '社团类型编号',
  `type_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '类型名',
  `type_content` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '类型介绍',
  `picture` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '类型logo',
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of club_type
-- ----------------------------
INSERT INTO `club_type` VALUES ('202305032141522130', '理论学习类', '理论学习不仅要读好原著、学好原文，最关键的还是悟原理', 'http://localhost:8080/images/type/1.jpg');
INSERT INTO `club_type` VALUES ('202305032142042799', '艺术类', '666', 'http://localhost:8080/images/type/6.jpg');
INSERT INTO `club_type` VALUES ('202305032142115728', '公益服务类', '有效的服务，才能温暖群众、凝聚人心', 'http://localhost:8080/images/type/1.jpg');
INSERT INTO `club_type` VALUES ('202305032142211034', '职业发展类', '喜喜', NULL);
INSERT INTO `club_type` VALUES ('202305032142520237', '体育锻炼类', '锻炼的内容极其丰富', 'http://localhost:8080/images/type/2.jpg');
INSERT INTO `club_type` VALUES ('202305032142589815', '兴趣爱好', '喜喜', 'http://localhost:8080/images/type/2.jpg');
INSERT INTO `club_type` VALUES ('202305032143352417', '娱乐类', '喜喜', NULL);
INSERT INTO `club_type` VALUES ('202305032143403075', '文化类', '文化是相对于经济、政治而言的人类全部精神活动及其产品', 'http://localhost:8080/images/type/1.jpg');
INSERT INTO `club_type` VALUES ('202305032143562241', '棋类', '策略型两人棋类游戏，被认为是世界上最复杂的棋盘游戏', 'http://localhost:8080/images/type/1.jpg');

-- ----------------------------
-- Table structure for cost_apply
-- ----------------------------
DROP TABLE IF EXISTS `cost_apply`;
CREATE TABLE `cost_apply`  (
  `apply_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '申请编号',
  `club_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '社团申请',
  `apply_user` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '申请用户',
  `apply_content` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '申请理由',
  `apply_time` datetime(0) NULL DEFAULT NULL COMMENT '申请时间',
  `apply_state` tinyint(0) NULL DEFAULT 0 COMMENT '申请状态,状态 0: 审核中 1: 通过 2: 未通过',
  `apply_cost` decimal(9, 2) NULL DEFAULT 0.00 COMMENT '申请资金',
  `reply` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '回复',
  `reply_time` datetime(0) NULL DEFAULT NULL COMMENT '回复时间',
  PRIMARY KEY (`apply_id`) USING BTREE,
  INDEX `cost_apply_ibfk_2`(`apply_user`) USING BTREE,
  INDEX `cost_apply_ibfk_1`(`club_id`) USING BTREE,
  CONSTRAINT `cost_apply_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `cost_apply_ibfk_2` FOREIGN KEY (`apply_user`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cost_apply
-- ----------------------------
INSERT INTO `cost_apply` VALUES ('202305091556367628', '202305081540154863', '000000', '撒大苏打', '2023-05-09 15:56:36', 2, 1000.00, '不通过', '2023-05-09 16:18:52');
INSERT INTO `cost_apply` VALUES ('202305091619492276', '202305081540154863', '000000', '举办活动', '2023-05-09 16:19:49', 1, 1000.00, '同意', '2023-05-09 16:33:49');
INSERT INTO `cost_apply` VALUES ('202305091634266147', '202305081540154863', '000000', '举办诗词比赛', '2023-05-09 16:34:26', 1, 1000.00, '通过', '2023-05-09 19:43:35');
INSERT INTO `cost_apply` VALUES ('202305111405575405', '202305111250426296', '202305081106313286', '举办活动', '2023-05-11 14:05:57', 1, 1000.00, '通过', '2023-05-11 14:07:49');
INSERT INTO `cost_apply` VALUES ('202305111642448032', '202305111250426296', '202305081106313286', '举办吉他比赛', '2023-05-11 16:42:44', 0, 100.00, NULL, NULL);
INSERT INTO `cost_apply` VALUES ('202305121449246672', '202305121445426891', '202305121438536125', '举办活动', '2023-05-12 14:49:25', 1, 10000.00, '通过', '2023-05-12 14:49:50');
INSERT INTO `cost_apply` VALUES ('202305131637341461', '202305131635027637', '202305111216139730', '举办活动', '2023-05-13 16:37:35', 1, 1000.00, '通过', '2023-05-13 16:37:58');
INSERT INTO `cost_apply` VALUES ('202307011355076242', '202305062302265336', '000000', 'dasdas', '2023-07-01 13:55:07', 2, 100.00, '理由不对', '2023-07-01 13:55:23');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `menu_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '菜单编号',
  `name` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '单菜名称',
  `href` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '访问地址',
  `parent_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '上级菜单',
  `sort` tinyint(0) NULL DEFAULT 0 COMMENT '排序',
  `menu_logo` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '菜单LOGO',
  `is_show` tinyint(0) NULL DEFAULT 0 COMMENT '是否显示',
  `remarks` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('202304191451121710', '菜单管理', '/backstage/admin/menu', '202304191451128540', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202304191451121861', '场地管理', '/area', '', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202304191451122680', '活动管理', '/activity', NULL, 10, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202304191451123451', '用户管理', '/backstage/users', NULL, 40, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202304191451123452', '用户列表', '/backstage/users/list', '202304191451123451', 20, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202304191451123453', '系统信息', '/backstage/home', NULL, 127, 'HomeOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202304191451128540', '权限管理', '/backstage/admin', NULL, 30, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202304191451128590', '角色管理', '/backstage/admin/role', '202304191451128540', 10, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202304191451129777', '社团管理', '/club', NULL, 20, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305031434232703', '场地列表', '/area/list', '202304191451121861', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305031445514618', '活动列表', '/activity/list', '202304191451122680', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305031446147555', '社团列表', '/club/list', '202304191451129777', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305031950244107', '社团类型列表', '/club/club-type/list', '202304191451129777', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305041329312669', '活动类型列表', '/activity/activity-type/list', '202304191451122680', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305041522184457', '申请社团', '/club/club-apply/apply', '202304191451129777', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305051454523309', '申请列表', '/club/club-apply/list', '202304191451129777', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305061116052527', '审核列表', '/club/club-apply/audit/list', '202304191451129777', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305061648448783', '老师管理', '/backstage/teacher', NULL, 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305061649318803', '老师列表', '/backstage/teacher/list', '202305061648448783', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305062256491470', '我的社团', '/club/my-club', '202304191451129777', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305091024141709', '费用管理', '/cost', NULL, 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305091025037466', '审核申请', '/cost/audit', '202305091024141709', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305091446462063', '费用列表', '/cost/cost-list', '202305091024141709', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305100310423078', '审核列表', '/activity/activity-apply/audit/list', '202304191451122680', 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202305110846307368', '个人信息', '/my/information', NULL, 0, 'UserOutlined', 1, NULL);
INSERT INTO `menu` VALUES ('202307051656571638', '我的活动', '/activity/user-activity', '202304191451122680', 0, 'UserOutlined', 1, NULL);

-- ----------------------------
-- Table structure for menu_role
-- ----------------------------
DROP TABLE IF EXISTS `menu_role`;
CREATE TABLE `menu_role`  (
  `menu_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '菜单编号',
  `role_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '角色编号',
  `remark` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`menu_id`, `role_id`) USING BTREE,
  INDEX `menu_role_ibfk_2`(`role_id`) USING BTREE,
  CONSTRAINT `menu_role_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `menu_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu_role
-- ----------------------------
INSERT INTO `menu_role` VALUES ('202304191451121710', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202304191451121861', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202304191451122680', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202304191451122680', '202304191413420001', NULL);
INSERT INTO `menu_role` VALUES ('202304191451122680', '202304191413520003', NULL);
INSERT INTO `menu_role` VALUES ('202304191451122680', '202304191414070004', NULL);
INSERT INTO `menu_role` VALUES ('202304191451122680', '202304191414130005', NULL);
INSERT INTO `menu_role` VALUES ('202304191451123451', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202304191451123452', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202304191451123453', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202304191451123453', '202304191413420001', NULL);
INSERT INTO `menu_role` VALUES ('202304191451123453', '202304191413520003', NULL);
INSERT INTO `menu_role` VALUES ('202304191451123453', '202304191414070004', NULL);
INSERT INTO `menu_role` VALUES ('202304191451123453', '202304191414130005', NULL);
INSERT INTO `menu_role` VALUES ('202304191451128540', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202304191451128590', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202304191451129777', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202304191451129777', '202304191413420001', NULL);
INSERT INTO `menu_role` VALUES ('202304191451129777', '202304191413520003', NULL);
INSERT INTO `menu_role` VALUES ('202304191451129777', '202304191414070004', NULL);
INSERT INTO `menu_role` VALUES ('202304191451129777', '202304191414130005', NULL);
INSERT INTO `menu_role` VALUES ('202305031434232703', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305031445514618', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305031445514618', '202304191413420001', NULL);
INSERT INTO `menu_role` VALUES ('202305031445514618', '202304191413520003', NULL);
INSERT INTO `menu_role` VALUES ('202305031445514618', '202304191414070004', NULL);
INSERT INTO `menu_role` VALUES ('202305031445514618', '202304191414130005', NULL);
INSERT INTO `menu_role` VALUES ('202305031446147555', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305031446147555', '202304191413420001', NULL);
INSERT INTO `menu_role` VALUES ('202305031446147555', '202304191413520003', NULL);
INSERT INTO `menu_role` VALUES ('202305031446147555', '202304191414070004', NULL);
INSERT INTO `menu_role` VALUES ('202305031446147555', '202304191414130005', NULL);
INSERT INTO `menu_role` VALUES ('202305031950244107', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305041329312669', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305041329312669', '202304191413420001', NULL);
INSERT INTO `menu_role` VALUES ('202305041522184457', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305041522184457', '202304191413420001', NULL);
INSERT INTO `menu_role` VALUES ('202305041522184457', '202304191413520003', NULL);
INSERT INTO `menu_role` VALUES ('202305041522184457', '202304191414070004', NULL);
INSERT INTO `menu_role` VALUES ('202305041522184457', '202304191414130005', NULL);
INSERT INTO `menu_role` VALUES ('202305051454523309', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305051454523309', '202304191413420001', NULL);
INSERT INTO `menu_role` VALUES ('202305051454523309', '202304191413520003', NULL);
INSERT INTO `menu_role` VALUES ('202305051454523309', '202304191414070004', NULL);
INSERT INTO `menu_role` VALUES ('202305051454523309', '202304191414130005', NULL);
INSERT INTO `menu_role` VALUES ('202305061116052527', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305061648448783', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305061649318803', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305062256491470', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305062256491470', '202304191413420001', NULL);
INSERT INTO `menu_role` VALUES ('202305062256491470', '202304191413520003', NULL);
INSERT INTO `menu_role` VALUES ('202305062256491470', '202304191414070004', NULL);
INSERT INTO `menu_role` VALUES ('202305062256491470', '202304191414130005', NULL);
INSERT INTO `menu_role` VALUES ('202305091024141709', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305091025037466', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305091446462063', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305100310423078', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305100310423078', '202304191413420001', NULL);
INSERT INTO `menu_role` VALUES ('202305110846307368', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202305110846307368', '202304191413420001', NULL);
INSERT INTO `menu_role` VALUES ('202305110846307368', '202304191413520003', NULL);
INSERT INTO `menu_role` VALUES ('202305110846307368', '202304191414070004', NULL);
INSERT INTO `menu_role` VALUES ('202305110846307368', '202304191414130005', NULL);
INSERT INTO `menu_role` VALUES ('202307051656571638', '202304191411040000', NULL);
INSERT INTO `menu_role` VALUES ('202307051656571638', '202304191413420001', NULL);
INSERT INTO `menu_role` VALUES ('202307051656571638', '202304191413520003', NULL);
INSERT INTO `menu_role` VALUES ('202307051656571638', '202304191414070004', NULL);
INSERT INTO `menu_role` VALUES ('202307051656571638', '202304191414130005', NULL);

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `notice_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '通知编号',
  `source_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '来源编号',
  `notice_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '通知名',
  `notice_content` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '通知内容',
  `notice_time` datetime(0) NULL DEFAULT NULL COMMENT '通知时间',
  `user_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '通知发起者',
  `notice_type` enum('活动通知','社团通知') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '活动通知' COMMENT '通知类型',
  `notice_object` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '通知对象',
  PRIMARY KEY (`notice_id`) USING BTREE,
  INDEX `notice_ibfk_1`(`user_id`) USING BTREE,
  CONSTRAINT `notice_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice
-- ----------------------------

-- ----------------------------
-- Table structure for play_role
-- ----------------------------
DROP TABLE IF EXISTS `play_role`;
CREATE TABLE `play_role`  (
  `user_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '账号',
  `role_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '角色编号',
  `remark` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE,
  INDEX `play_role_ibfk_2`(`role_id`) USING BTREE,
  CONSTRAINT `play_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `play_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of play_role
-- ----------------------------
INSERT INTO `play_role` VALUES ('000000', '202304191411040000', NULL);
INSERT INTO `play_role` VALUES ('123456', '202304191413420001', NULL);
INSERT INTO `play_role` VALUES ('202305062103135733', '202304191414130005', NULL);
INSERT INTO `play_role` VALUES ('202305062109590538', '202304191414130005', NULL);
INSERT INTO `play_role` VALUES ('202305071657150897', '202304191414130005', NULL);
INSERT INTO `play_role` VALUES ('202305071907101409', '202304191414130005', NULL);
INSERT INTO `play_role` VALUES ('202305071927548966', '202304191414130005', NULL);
INSERT INTO `play_role` VALUES ('202305072205185342', '202304191413520003', NULL);
INSERT INTO `play_role` VALUES ('202305081106313286', '202304191413520003', NULL);
INSERT INTO `play_role` VALUES ('202305111000383440', '202304191413520003', NULL);
INSERT INTO `play_role` VALUES ('202305111001541667', '202304191413520003', NULL);
INSERT INTO `play_role` VALUES ('202305111216139730', '202304191413520003', NULL);
INSERT INTO `play_role` VALUES ('202305111216462713', '202304191413520003', NULL);
INSERT INTO `play_role` VALUES ('202305121438536125', '202304191413520003', NULL);

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `project_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '项目号',
  `bill_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '账单号',
  `project_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '名称',
  `project_num` mediumint(0) NULL DEFAULT 1 COMMENT '数量',
  `price` decimal(9, 2) NULL DEFAULT 0.00 COMMENT '价格',
  PRIMARY KEY (`project_id`) USING BTREE,
  INDEX `project_member_ibfk_1`(`bill_id`) USING BTREE,
  CONSTRAINT `project_member_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`bill_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('202305091633493822', '202305091633493735', '给文化社团举办活动的资金', 1, 1000.00);
INSERT INTO `project` VALUES ('202305091633495481', '202305091633497711', '给文化社团举办活动的资金', 1, 1000.00);
INSERT INTO `project` VALUES ('202305091943345863', '202305091943344435', '举办活动', 1, 1000.00);
INSERT INTO `project` VALUES ('202305091943349188', '202305091943343495', '举办活动', 1, 1000.00);
INSERT INTO `project` VALUES ('202305100344139011', '202305100344135234', '诗歌比赛', 1, 100.00);
INSERT INTO `project` VALUES ('202305100344139648', '202305100344137520', '诗歌比赛', 1, 100.00);
INSERT INTO `project` VALUES ('202305101008566940', '202305101008567518', '社团团建', 1, 100.00);
INSERT INTO `project` VALUES ('202305101008569501', '202305101008564938', '社团团建', 1, 100.00);
INSERT INTO `project` VALUES ('202305101348591489', '202305101348598601', '泼水活动', 1, 0.00);
INSERT INTO `project` VALUES ('202305101348595557', '202305101348590072', '泼水活动', 1, 0.00);
INSERT INTO `project` VALUES ('202305111407493265', '202305111407494762', '吉他社举办活动', 1, 1000.00);
INSERT INTO `project` VALUES ('202305111407496314', '202305111407497934', '吉他社举办活动', 1, 1000.00);
INSERT INTO `project` VALUES ('202305111414440185', '202305111414442666', '吉他大会', 1, 100.00);
INSERT INTO `project` VALUES ('202305111414443242', '202305111414440293', '吉他大会', 1, 100.00);
INSERT INTO `project` VALUES ('202305121449503935', '202305121449509986', '计算机社团举办活动', 1, 10000.00);
INSERT INTO `project` VALUES ('202305121449506907', '202305121449506653', '计算机社团举办活动', 1, 10000.00);
INSERT INTO `project` VALUES ('202305121452453006', '202305121452457142', '计算机大赛', 1, 100.00);
INSERT INTO `project` VALUES ('202305121452457959', '202305121452457600', '计算机大赛', 1, 100.00);
INSERT INTO `project` VALUES ('202305131637576878', '202305131637573076', '给红楼梦社团', 1, 1000.00);
INSERT INTO `project` VALUES ('202305131637578708', '202305131637578773', '给红楼梦社团', 1, 1000.00);
INSERT INTO `project` VALUES ('202305131639524501', '202305131639524183', '红楼梦', 1, 500.00);
INSERT INTO `project` VALUES ('202305131639529404', '202305131639523270', '红楼梦', 1, 500.00);
INSERT INTO `project` VALUES ('202307032236371349', '202307032236373804', '雷锋精神 ', 1, 0.00);
INSERT INTO `project` VALUES ('202307032236378551', '202307032236372378', '雷锋精神 ', 1, 0.00);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `role_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '角色编号',
  `role_name` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '角色名称',
  `role_logo` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '角色logo',
  `rank` int(0) NULL DEFAULT 0 COMMENT '角色等级',
  `remark` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('202304191411040000', '超级管理员', NULL, 0, '管理所有功能');
INSERT INTO `role` VALUES ('202304191413420001', '管理员', 'UserOutlined', 100, '管理活动的各方面功能');
INSERT INTO `role` VALUES ('202304191413520003', '用户', NULL, 6000, '查询');
INSERT INTO `role` VALUES ('202304191414070004', '社长', '', 200, '社长');
INSERT INTO `role` VALUES ('202304191414130005', '老师', '', 400, '老师');

-- ----------------------------
-- Table structure for sign
-- ----------------------------
DROP TABLE IF EXISTS `sign`;
CREATE TABLE `sign`  (
  `sign_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '签到编号',
  `user_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '签到发起者',
  `stage_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '阶段编号',
  `sign_type` enum('数字签到') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '数字签到' COMMENT '签到类型',
  `sign_content` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '签到内容',
  `sign_reason` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '签到理由',
  `start_time` datetime(0) NULL DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime(0) NULL DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`sign_id`) USING BTREE,
  INDEX `sign_ibfk_1`(`user_id`) USING BTREE,
  INDEX `sign_ibfk_2`(`stage_id`) USING BTREE,
  CONSTRAINT `sign_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `sign_ibfk_2` FOREIGN KEY (`stage_id`) REFERENCES `activity_stage` (`stage_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sign
-- ----------------------------

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `stu_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '学号',
  `user_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '账号',
  `college` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '学院',
  `classes` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '班级',
  `major` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '专业',
  PRIMARY KEY (`stu_id`) USING BTREE,
  INDEX `student_ibfk_1`(`user_id`) USING BTREE,
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `teacher_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '职工编号',
  `user_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户编号',
  `college` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '学院',
  `position` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '职位',
  PRIMARY KEY (`teacher_id`) USING BTREE,
  INDEX `teacher_ibfk_1`(`user_id`) USING BTREE,
  INDEX `teacher_ibfk_2`(`teacher_id`) USING BTREE,
  CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('202305062103132799', '202305062103135733', '计算机工程学院', '教授');
INSERT INTO `teacher` VALUES ('202305062109597986', '202305062109590538', '海洋与技术学院', '副教授');
INSERT INTO `teacher` VALUES ('202305071657150320', '202305071657150897', '音乐学院', '副教授');
INSERT INTO `teacher` VALUES ('202305071907102069', '202305071907101409', '文学院', '副教授');
INSERT INTO `teacher` VALUES ('202305071927540743', '202305071927548966', '文学院', '教授');
INSERT INTO `teacher` VALUES ('202305111000386353', '202305111000383440', '外国语学院', '副教授');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` char(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '账号',
  `password` char(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '密码',
  `nickname` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `user_name` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户姓名',
  `sex` enum('男','女') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '男' COMMENT '性别',
  `phone` char(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '电话',
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `picture` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '头像',
  `intro` varchar(130) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '个人介绍',
  `regist_time` datetime(0) NULL DEFAULT NULL COMMENT '注册',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('000000', '$2a$10$uPa93vCg3VwJSZG8zsHTj.h3eZFsZVf7AfJ8IQXBA9HGT4xsY5kCm', '张三', '张翰', '男', '19859252969', '123@qq.com', 'http://localhost:8080/images/head/1.jpg', '举办本期培训班是为了深入学习贯彻习近平新时代中国特色社会主义思想和党的二十大精神，推动党员干部深刻领悟“两个确立”的决定性意义，增强“四个意识”、坚定“四个自信”、做到“两个维护”，确保在政治立场、政治方向、政治原则', '2023-05-07 22:05:19');
INSERT INTO `user` VALUES ('123456', '$2a$10$ZzFkDwDmhTdB0YIoVZIlQuRyTIQTIekJ8.yUWchSqdHMYYCasFeXK', '王五', '张三', '男', '12345678912', '456@qq.com', 'http://localhost:8080/images/head/2.jpg', '435', '2023-05-07 22:05:19');
INSERT INTO `user` VALUES ('202305062103135733', '$2a$10$.4q7lC7JxSG05OZw8csyU.oa8IjPIXj81/a9ScPyGnkwQecQxhIKS', '张雅', '张雅', '女', '16112361245', NULL, 'http://localhost:8080/images/head/1.jpg', NULL, '2023-05-07 22:05:19');
INSERT INTO `user` VALUES ('202305062109590538', '$2a$10$NHXNkaaXWaijcSwgCbhshul4jZEJIJr29l9qrP836yce3ifvNrjn6', '程翔', '程翔', '男', '12345678911', NULL, 'http://localhost:8080/images/head/1.jpg', NULL, '2023-05-07 22:05:19');
INSERT INTO `user` VALUES ('202305071657150897', '$2a$10$t2rW/E46F2OSFd5Uugunwe14xSDA4dWMwn7jTiequKCT/AbqK.fOG', '韩婷', '韩婷', '女', '12345678922', NULL, 'http://localhost:8080/images/head/1.jpg', NULL, '2023-05-07 22:05:19');
INSERT INTO `user` VALUES ('202305071907101409', '$2a$10$LqAYgvybSPO/zALwlOwvMuXZUX4Y/.ZSFNFbZnC3U4t9E92jItK22', '王刚', '王刚', '男', '12345678955', NULL, 'http://localhost:8080/images/head/1.jpg', NULL, '2023-05-07 22:05:19');
INSERT INTO `user` VALUES ('202305071927548966', '$2a$10$ei.O619QNy/bzhO4dh5rcOxv/bxNEh2BXqekMiZDF5oKqClwllvO.', '李若涵', '李若涵', '女', '12345678966', NULL, 'http://localhost:8080/images/head/1.jpg', NULL, '2023-05-07 22:05:19');
INSERT INTO `user` VALUES ('202305072205185342', '$2a$10$3NtKBxmFgHEbq1MbHeGT0eqA5V2e2jn.5v13pThQu8ymjcN2opjuO', '张芳', '张芳', '女', '12345678903', NULL, 'http://localhost:8080/images/head/1.jpg', NULL, '2023-05-07 22:05:19');
INSERT INTO `user` VALUES ('202305081106313286', '$2a$10$4z0zGsX4VXh/J8hhUgv9Xe.dd/aDkJgFQr/9H02gGRRQtmUcHx/wa', '李新', '李新', '男', '12345678907', NULL, 'http://localhost:8080/images/head/1.jpg', '性格开朗', NULL);
INSERT INTO `user` VALUES ('202305111000383440', '$2a$10$bcCxa2S0VcHxLBuc2wC3g.6nJMTzViSsco6MHwZF1M.bWM2OBmG2K', '吴优', '吴优', '女', '13512450111', NULL, 'http://localhost:8080/images/head/1.jpg', NULL, '2023-05-11 10:00:39');
INSERT INTO `user` VALUES ('202305111001541667', '$2a$10$TO5E4sv5InFUX6iGlo73c.tiWk73LtN5m8np1wt/.AiEoanc3i3Te', '孙膑', '孙膑', '男', '13512450022', NULL, NULL, NULL, '2023-05-11 10:01:54');
INSERT INTO `user` VALUES ('202305111216139730', '$2a$10$sKF2DXbQaufdYoTUhRr0L.vQRMIpfd.q9LwC/Ltsmuf5fKROIIRNq', '李白', '李白', '男', '12300000001', NULL, 'http://localhost:8080/images/head/2.jpg', NULL, NULL);
INSERT INTO `user` VALUES ('202305111216462713', '$2a$10$Dydw0jiqe9FceVCPHoVw3esC0q9f9IkDNaStzJ43WRb8DHfkMSJWS', '甄姬', '甄姬', '女', '12300000002', NULL, NULL, NULL, '2023-05-11 12:16:46');
INSERT INTO `user` VALUES ('202305121438536125', '$2a$10$9oI4B1noJ/6XXA6W9TvP6uCGzhWC4VCQUZZYHj4Gkhzf8anU8Vjn6', '周斌', '周斌', '男', '12345678910', NULL, 'http://localhost:8080/images/head/2.jpg', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
