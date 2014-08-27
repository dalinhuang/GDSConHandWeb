CREATE DATABASE  IF NOT EXISTS `wips` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `wips`;
/*
Navicat MySQL Data Transfer

Source Server         : localhost_3308
Source Server Version : 50615
Source Host           : localhost:3308
Source Database       : wips

Target Server Type    : MYSQL
Target Server Version : 50615
File Encoding         : 65001

Date: 2014-08-26 15:57:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ad
-- ----------------------------
DROP TABLE IF EXISTS `ad`;
CREATE TABLE `ad` (
  `ad_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `thumbnail_img_url` varchar(100) DEFAULT NULL,
  `large_img_url` varchar(100) DEFAULT NULL,
  `thumbnail_img_id` int(11) DEFAULT NULL,
  `large_img_id` int(11) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `duration` tinyint(4) DEFAULT NULL,
  `from_date` datetime DEFAULT NULL,
  `to_date` datetime DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ad_id`),
  UNIQUE KEY `ad_id_UNIQUE` (`ad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ad
-- ----------------------------
INSERT INTO `ad` VALUES ('1', '/WifiIpsServer/ads/ericsson_ad0.png', '/WifiIpsServer/ads/ericsson_ad0.png', '4', '5', 'http://www.ericsson.com', '7', '2013-04-12 00:00:00', '2013-05-16 00:00:00', '2013-11-13 15:41:59');
INSERT INTO `ad` VALUES ('2', '/wips/upload/xhs/bus_station.th.2.png', '4/wips/upload/xhs/bus_station.lg.2.png', '7', '8', 'http://www.google.com', '8', '2013-06-21 00:00:00', '2013-06-12 00:00:00', '2013-10-17 10:14:22');
INSERT INTO `ad` VALUES ('3', 'http://localhost:8080/wips/ad/', null, null, null, 'http://www.163.com', '9', '2013-11-15 00:00:00', '2013-11-29 00:00:00', '2013-11-14 15:10:37');
INSERT INTO `ad` VALUES ('4', 'http://localhost:8080/wips/ad/', null, null, null, 'http://www.sina.com', '10', '2013-11-20 00:00:00', '2013-11-16 00:00:00', '2013-11-14 15:11:40');
INSERT INTO `ad` VALUES ('5', 'http://localhost:8080/wips/ad/', null, null, null, 'http://www.weibo.com', '11', '2013-11-22 00:00:00', '2013-11-28 00:00:00', '2013-11-14 15:32:47');

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `address_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(50) NOT NULL,
  `address2` varchar(50) DEFAULT NULL,
  `district` varchar(20) NOT NULL,
  `province_id` smallint(5) unsigned DEFAULT NULL,
  `city_id` smallint(5) unsigned NOT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`address_id`),
  KEY `idx_fk_city_id` (`city_id`),
  KEY `fk_address_province_idx` (`province_id`),
  CONSTRAINT `fk_address_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_address_province` FOREIGN KEY (`province_id`) REFERENCES `province` (`province_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=609 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('606', '科韵路16号', '15楼', '天河区', '1', '601', '510420', '13922118888', '2013-09-11 07:06:56');
INSERT INTO `address` VALUES ('607', '科韵路16号', '16楼', '天河区', '1', '601', '510420', '13922118989', '2013-09-11 07:08:26');
INSERT INTO `address` VALUES ('608', '科韵路16号', '17楼', '天河区', '1', '601', '510420', '13922119898', '2013-09-11 07:08:26');

-- ----------------------------
-- Table structure for algorithm_verify
-- ----------------------------
DROP TABLE IF EXISTS `algorithm_verify`;
CREATE TABLE `algorithm_verify` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `device` varchar(45) DEFAULT NULL,
  `scan_seq` int(11) DEFAULT NULL,
  `collect_time` datetime DEFAULT NULL,
  `ESSID` varchar(45) DEFAULT NULL,
  `BSSID` varchar(17) DEFAULT NULL,
  `RSS` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `avg` float DEFAULT NULL,
  `RSS-AVG` float DEFAULT NULL,
  `scan_avg_RSS-AVG` float DEFAULT NULL,
  `RSS/AVG` float DEFAULT NULL,
  `scan_avg_RSS/AVG` float DEFAULT NULL,
  `AP_MSE_per_device` float DEFAULT NULL,
  `device_scan_mse_per` float DEFAULT NULL,
  `device_scan_mse_minus` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of algorithm_verify
-- ----------------------------

-- ----------------------------
-- Table structure for building
-- ----------------------------
DROP TABLE IF EXISTS `building`;
CREATE TABLE `building` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `generation` int(11) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `maps` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of building
-- ----------------------------

-- ----------------------------
-- Table structure for map
-- ----------------------------
DROP TABLE IF EXISTS `map`;
CREATE TABLE `map` (
  `map_id` int(11) NOT NULL AUTO_INCREMENT,
  `columns` int(11) DEFAULT NULL,
  `generation` int(11) DEFAULT NULL,
  `large_img_url` varchar(255) DEFAULT NULL,
  `edit_time` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cell_pixel` int(11) DEFAULT NULL,
  `rows` int(11) DEFAULT NULL,
  `thumbnail_img_url` varchar(255) DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `version_code` int(11) DEFAULT NULL,
  PRIMARY KEY (`map_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of map
-- ----------------------------

-- ----------------------------
-- Table structure for navigator_data
-- ----------------------------
DROP TABLE IF EXISTS `navigator_data`;
CREATE TABLE `navigator_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `distance` float DEFAULT NULL,
  `from_node` int(11) DEFAULT NULL,
  `guide_info` varchar(255) DEFAULT NULL,
  `to_node` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of navigator_data
-- ----------------------------

-- ----------------------------
-- Table structure for navigator_neighbor_maps
-- ----------------------------
DROP TABLE IF EXISTS `navigator_neighbor_maps`;
CREATE TABLE `navigator_neighbor_maps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_map` int(11) DEFAULT NULL,
  `to_map` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of navigator_neighbor_maps
-- ----------------------------

-- ----------------------------
-- Table structure for navigator_nodes
-- ----------------------------
DROP TABLE IF EXISTS `navigator_nodes`;
CREATE TABLE `navigator_nodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `col_id` int(11) DEFAULT NULL,
  `map_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `row_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of navigator_nodes
-- ----------------------------

-- ----------------------------
-- Table structure for navi_node
-- ----------------------------
DROP TABLE IF EXISTS `navi_node`;
CREATE TABLE `navi_node` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `map_id` int(11) NOT NULL,
  `placeX` int(11) NOT NULL,
  `placeY` int(11) NOT NULL,
  `label` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ID_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of navi_node
-- ----------------------------
INSERT INTO `navi_node` VALUES ('1', '15', '235', '479', '');
INSERT INTO `navi_node` VALUES ('2', '15', '339', '585', '');
INSERT INTO `navi_node` VALUES ('3', '15', '481', '523', '');
INSERT INTO `navi_node` VALUES ('4', '15', '358', '425', '');
INSERT INTO `navi_node` VALUES ('8', '15', '222', '669', '');
INSERT INTO `navi_node` VALUES ('9', '15', '174', '583', '');
INSERT INTO `navi_node` VALUES ('10', '15', '331', '755', '');
INSERT INTO `navi_node` VALUES ('11', '15', '280', '427', '');
INSERT INTO `navi_node` VALUES ('12', '15', '434', '463', '');
INSERT INTO `navi_node` VALUES ('13', '15', '490', '683', '');
INSERT INTO `navi_node` VALUES ('14', '15', '425', '729', '');
INSERT INTO `navi_node` VALUES ('15', '15', '915', '551', '');
INSERT INTO `navi_node` VALUES ('16', '15', '887', '414', '');
INSERT INTO `navi_node` VALUES ('19', '15', '934', '750', '');
INSERT INTO `navi_node` VALUES ('20', '15', '793', '691', '');
INSERT INTO `navi_node` VALUES ('21', '15', '709', '566', '');
INSERT INTO `navi_node` VALUES ('23', '15', '1054', '451', '');
INSERT INTO `navi_node` VALUES ('24', '15', '749', '621', '');
INSERT INTO `navi_node` VALUES ('25', '15', '862', '704', '');
INSERT INTO `navi_node` VALUES ('26', '15', '1092', '546', '');
INSERT INTO `navi_node` VALUES ('27', '15', '1039', '707', '');
INSERT INTO `navi_node` VALUES ('28', '15', '1114', '665', '');
INSERT INTO `navi_node` VALUES ('29', '15', '224', '744', '');
INSERT INTO `navi_node` VALUES ('30', '5', '706', '192', '');
INSERT INTO `navi_node` VALUES ('31', '5', '529', '299', '');
INSERT INTO `navi_node` VALUES ('32', '5', '666', '411', '');
INSERT INTO `navi_node` VALUES ('33', '5', '842', '292', '');
INSERT INTO `navi_node` VALUES ('34', '5', '756', '424', '');
INSERT INTO `navi_node` VALUES ('35', '15', '136', '343', '');
INSERT INTO `navi_node` VALUES ('36', '15', '119', '430', '');
INSERT INTO `navi_node` VALUES ('37', '15', '79', '517', '');

-- ----------------------------
-- Table structure for navi_path
-- ----------------------------
DROP TABLE IF EXISTS `navi_path`;
CREATE TABLE `navi_path` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fromNode` int(11) NOT NULL,
  `toNode` int(11) NOT NULL,
  `direction` tinyint(4) DEFAULT NULL,
  `forwardGuide` varchar(100) NOT NULL,
  `backwardGuide` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of navi_path
-- ----------------------------
INSERT INTO `navi_path` VALUES ('163', '1', '8', '2', '', '');
INSERT INTO `navi_path` VALUES ('164', '1', '2', '2', '', '');
INSERT INTO `navi_path` VALUES ('165', '1', '12', '2', '', '');
INSERT INTO `navi_path` VALUES ('166', '1', '4', '2', '', '');
INSERT INTO `navi_path` VALUES ('167', '1', '3', '2', '', '');
INSERT INTO `navi_path` VALUES ('168', '1', '9', '2', '', '');
INSERT INTO `navi_path` VALUES ('169', '1', '10', '2', '', '');
INSERT INTO `navi_path` VALUES ('170', '1', '14', '2', '', '');
INSERT INTO `navi_path` VALUES ('171', '1', '13', '2', '', '');
INSERT INTO `navi_path` VALUES ('172', '15', '16', '1', '', '');
INSERT INTO `navi_path` VALUES ('173', '15', '25', '1', '', '');
INSERT INTO `navi_path` VALUES ('174', '15', '23', '1', '', '');
INSERT INTO `navi_path` VALUES ('175', '15', '26', '1', '', '');
INSERT INTO `navi_path` VALUES ('177', '15', '24', '1', '', '');
INSERT INTO `navi_path` VALUES ('178', '15', '20', '1', '', '');
INSERT INTO `navi_path` VALUES ('179', '15', '21', '1', '', '');
INSERT INTO `navi_path` VALUES ('181', '15', '19', '1', '', '');
INSERT INTO `navi_path` VALUES ('182', '15', '27', '1', '', '');
INSERT INTO `navi_path` VALUES ('183', '15', '28', '1', '', '');
INSERT INTO `navi_path` VALUES ('184', '4', '21', '1', '', '');
INSERT INTO `navi_path` VALUES ('185', '4', '22', '2', '', '');
INSERT INTO `navi_path` VALUES ('186', '24', '4', '2', '', '');
INSERT INTO `navi_path` VALUES ('189', '1', '11', '2', '', '');
INSERT INTO `navi_path` VALUES ('190', '1', '29', '2', '', '');
INSERT INTO `navi_path` VALUES ('191', '30', '33', '1', '', '');
INSERT INTO `navi_path` VALUES ('192', '30', '31', '2', '', '');
INSERT INTO `navi_path` VALUES ('193', '32', '30', '2', '', '');
INSERT INTO `navi_path` VALUES ('194', '30', '34', '1', '', '');
INSERT INTO `navi_path` VALUES ('195', '9', '30', '1', '', '');
INSERT INTO `navi_path` VALUES ('196', '9', '31', '2', '', '');
INSERT INTO `navi_path` VALUES ('197', '1', '35', '2', '', '');
INSERT INTO `navi_path` VALUES ('198', '1', '36', '2', '', '');
INSERT INTO `navi_path` VALUES ('199', '1', '37', '2', '', '');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of news
-- ----------------------------

-- ----------------------------
-- Table structure for playhouse
-- ----------------------------
DROP TABLE IF EXISTS `playhouse`;
CREATE TABLE `playhouse` (
  `id` int(11) NOT NULL,
  `poiId` int(11) DEFAULT NULL,
  `normalDayTime` varchar(255) DEFAULT NULL,
  `weekendTime` varchar(255) DEFAULT NULL,
  `festivalTime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of playhouse
-- ----------------------------
INSERT INTO `playhouse` VALUES ('1', '7', '10:20;14:30', '10:30;12:00;15:30', '10:30;12:00;15:30');
INSERT INTO `playhouse` VALUES ('2', '10', '11:00;14:00', '11:00;14:00;14:30', '11:20');
INSERT INTO `playhouse` VALUES ('3', '11', '11:30;14:30', '10:20', '14:30');
INSERT INTO `playhouse` VALUES ('4', '13', '10:30;14:00', '14:30', '10:00;14:00');

-- ----------------------------
-- Table structure for poi
-- ----------------------------
DROP TABLE IF EXISTS `poi`;
CREATE TABLE `poi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `hallId` int(11) DEFAULT NULL,
  `ttsNo` int(11) DEFAULT NULL,
  `mapId` int(11) DEFAULT NULL,
  `placeX` int(11) DEFAULT NULL,
  `placeY` int(11) DEFAULT NULL,
  `neareastNaviNode` int(11) DEFAULT NULL,
  `iconUrl` varchar(255) DEFAULT NULL,
  `audioUrl` varchar(255) DEFAULT NULL,
  `webUrl` varchar(255) DEFAULT NULL,
  `picUrl` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `generalDesc` varchar(255) DEFAULT NULL,
  `detailedDesc` varchar(255) DEFAULT NULL,
  `shareble` bit(1) DEFAULT NULL,
  `reachable` bit(1) DEFAULT NULL,
  `readable` bit(1) DEFAULT NULL,
  `scale` float DEFAULT NULL,
  `alpha` float DEFAULT NULL,
  `rotation` float DEFAULT NULL,
  `minZoomFactor` float DEFAULT NULL,
  `maxZoomFactor` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of poi
-- ----------------------------
INSERT INTO `poi` VALUES ('22', '0', '11', '12', '15', '442', '177', '12', 'icon2.png', 'audio2.mp3', 'www.163.com', 'pic2.jpg', '通信世界', '通信世界展馆', '通信世界展馆', '', '', '', '13', '14', '15', '16', '17');
INSERT INTO `poi` VALUES ('24', '4', '11', '12', '15', '559', '281', '-10000', '', '', '', '', '环球影城', '环球影城简介', '环球影城详细', '\0', '\0', '\0', '-10000', '-10000', '-10000', '-10000', '-10000');
INSERT INTO `poi` VALUES ('26', '3', '-10000', '-10000', '5', '405', '163', '-10000', '', '', '', '', '客运站', '客运站', '', '\0', '\0', '\0', '-10000', '-10000', '-10000', '-10000', '-10000');
INSERT INTO `poi` VALUES ('27', '0', '-10000', '-10000', '5', '598', '194', '-10000', '', '', '', '', '恐龙馆', '恐龙馆简介', '', '\0', '\0', '\0', '-10000', '-10000', '-10000', '-10000', '-10000');
INSERT INTO `poi` VALUES ('28', '6', '1', '2', '15', '343', '241', '3', 'icon1.jpg', 'audio1.mp3', 'www.163.com', 'pic1.jpg', '肯德基', '肯德基餐厅', '肯德基餐厅', '', '', '\0', '4', '5', '6', '7', '8');
INSERT INTO `poi` VALUES ('29', '0', '-10000', '-10000', '5', '387', '258', '-10000', '', '', '', '', '云中心', '云中心简介', '爱立信云中心详细介绍', '', '', '', '11', '12', '13', '-10000', '-10000');
INSERT INTO `poi` VALUES ('30', '0', '2', '3', '5', '736', '244', '7', '', '', '', '', '电子馆', '电子馆介绍', '爱立信电子馆详细信息展示', '', '', '', '-10000', '-10000', '-10000', '-10000', '-10000');
INSERT INTO `poi` VALUES ('31', '0', '1', '12', '5', '870', '181', '2', '', '', '', '', '培训中心', '培训中心简介', '培训中心详细', '', '', '', '-10000', '-10000', '-10000', '-10000', '-10000');
INSERT INTO `poi` VALUES ('32', '0', '-10000', '-10000', '15', '431', '299', '-10000', '', '', '', '', '危险', '', '', '\0', '\0', '\0', '-10000', '-10000', '-10000', '-10000', '-10000');
INSERT INTO `poi` VALUES ('33', '0', '-10000', '-10000', '15', '346', '276', '-10000', '', '', '', '', '尝试', '', '', '\0', '\0', '\0', '-10000', '-10000', '-10000', '-10000', '-10000');

-- ----------------------------
-- Table structure for position
-- ----------------------------
DROP TABLE IF EXISTS `position`;
CREATE TABLE `position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `col_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `map_id` int(11) DEFAULT NULL,
  `row_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `title_alpha` float DEFAULT NULL,
  `title_rotation` float DEFAULT NULL,
  `title_scale` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of position
-- ----------------------------

-- ----------------------------
-- Table structure for position_ad
-- ----------------------------
DROP TABLE IF EXISTS `position_ad`;
CREATE TABLE `position_ad` (
  `position_ad_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `position_id` varchar(45) DEFAULT NULL,
  `ad_id` varchar(45) DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`position_ad_id`),
  UNIQUE KEY `position_ad_id_UNIQUE` (`position_ad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of position_ad
-- ----------------------------
INSERT INTO `position_ad` VALUES ('1', '324', '1', '2013-10-18 02:43:16');
INSERT INTO `position_ad` VALUES ('2', '539', '2', '2013-10-18 02:43:16');
INSERT INTO `position_ad` VALUES ('3', '540', '2', '2013-10-18 02:43:16');
INSERT INTO `position_ad` VALUES ('4', '804', '2', '2013-10-18 02:43:16');
INSERT INTO `position_ad` VALUES ('5', '805', '1', '2013-10-18 02:43:16');
INSERT INTO `position_ad` VALUES ('6', '807', '1', '2013-10-18 02:43:16');
INSERT INTO `position_ad` VALUES ('7', '4', '0', '2013-11-14 07:32:48');
INSERT INTO `position_ad` VALUES ('8', '5', '0', '2013-11-14 07:32:49');
INSERT INTO `position_ad` VALUES ('9', '6', '0', '2013-11-14 07:32:50');

-- ----------------------------
-- Table structure for quadrangle_area
-- ----------------------------
DROP TABLE IF EXISTS `quadrangle_area`;
CREATE TABLE `quadrangle_area` (
  `ID` int(11) NOT NULL,
  `A_ColID` int(11) DEFAULT NULL,
  `A_RowID` int(11) DEFAULT NULL,
  `B_ColID` int(11) DEFAULT NULL,
  `B_RowID` int(11) DEFAULT NULL,
  `C_ColID` int(11) DEFAULT NULL,
  `C_RowID` int(11) DEFAULT NULL,
  `D_ColID` int(11) DEFAULT NULL,
  `D_RowID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of quadrangle_area
-- ----------------------------

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `resource_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `resource_name` varchar(50) DEFAULT NULL,
  `resource_type` varchar(45) DEFAULT NULL,
  `resource_string` varchar(100) DEFAULT NULL,
  `priority` tinyint(4) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`resource_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES ('1', null, 'URL', '/admin.jsp', '1', null, '2013-09-23 00:24:42');
INSERT INTO `resource` VALUES ('2', null, 'URL', '/**', '6', null, '2013-09-23 00:24:42');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `role_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(20) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', 'ROLE_ADMIN', '管理员', '2013-09-23 00:23:03');
INSERT INTO `role` VALUES ('2', 'ROLE_USER', '用户', '2013-09-23 00:23:03');

-- ----------------------------
-- Table structure for role_resource
-- ----------------------------
DROP TABLE IF EXISTS `role_resource`;
CREATE TABLE `role_resource` (
  `role_resource_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` tinyint(4) DEFAULT NULL,
  `resource_id` tinyint(4) DEFAULT NULL,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_resource_id`),
  KEY `fk_role_id_idx` (`role_id`),
  KEY `fk_resource_id_idx` (`resource_id`),
  CONSTRAINT `fk_role_resource_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `resource` (`resource_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_role_resource_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_resource
-- ----------------------------
INSERT INTO `role_resource` VALUES ('1', '1', '1', '2013-09-23 00:28:43');
INSERT INTO `role_resource` VALUES ('2', '2', '2', '2013-09-23 00:28:43');
INSERT INTO `role_resource` VALUES ('3', '1', '2', '2013-11-07 05:55:50');

-- ----------------------------
-- Table structure for test_record
-- ----------------------------
DROP TABLE IF EXISTS `test_record`;
CREATE TABLE `test_record` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `deviceMac` varchar(45) NOT NULL,
  `time` datetime DEFAULT NULL,
  `fromMap` int(11) DEFAULT NULL,
  `fromX` int(11) DEFAULT NULL,
  `fromY` int(11) DEFAULT NULL,
  `locateMap` int(11) DEFAULT NULL,
  `locateX` int(11) DEFAULT NULL,
  `locateY` varchar(45) DEFAULT NULL,
  `fromSignal` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `idtest_record_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=557 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of test_record
-- ----------------------------
INSERT INTO `test_record` VALUES ('1', '04:46:65:7D:F0:C9', '2013-08-22 16:26:51', '15', '9', '12', '15', '5', '12', null);
INSERT INTO `test_record` VALUES ('2', '04:46:65:7D:F0:C9', '2013-08-22 16:31:15', '15', '9', '12', '15', '11', '9', null);
INSERT INTO `test_record` VALUES ('3', '04:46:65:7D:F0:C9', '2013-08-22 16:53:12', '15', '9', '12', '15', '7', '12', null);
INSERT INTO `test_record` VALUES ('4', '04:46:65:7D:F0:C9', '2013-08-22 16:56:12', '15', '8', '12', '15', '7', '12', null);
INSERT INTO `test_record` VALUES ('5', 'ac:f7:f3:5b:21:96', '2013-08-22 17:31:53', '15', '7', '11', '15', '5', '12', null);
INSERT INTO `test_record` VALUES ('6', 'a0:0b:ba:ba:12:84', '2013-08-22 18:01:31', '15', '29', '6', '15', '26', '3', null);
INSERT INTO `test_record` VALUES ('7', 'a0:0b:ba:ba:12:84', '2013-08-22 18:01:43', '15', '29', '6', '15', '26', '3', null);
INSERT INTO `test_record` VALUES ('8', 'a0:0b:ba:ba:12:84', '2013-08-22 18:03:01', '15', '29', '6', '15', '26', '3', null);
INSERT INTO `test_record` VALUES ('9', 'a0:0b:ba:ba:12:84', '2013-08-22 18:06:54', '15', '29', '6', '15', '26', '3', null);
INSERT INTO `test_record` VALUES ('10', '10:bf:48:ec:7c:e3', '2013-08-22 18:09:18', '15', '29', '6', '15', '25', '8', null);
INSERT INTO `test_record` VALUES ('11', '10:bf:48:ec:7c:e3', '2013-08-22 18:15:01', '15', '29', '6', '15', '37', '8', null);
INSERT INTO `test_record` VALUES ('12', '10:bf:48:ec:7c:e3', '2013-08-22 18:15:28', '15', '29', '6', '15', '26', '3', null);
INSERT INTO `test_record` VALUES ('13', '04:46:65:7D:F0:C9', '2013-08-22 22:34:46', '201', '30', '10', '-1', '-1', '-1', null);
INSERT INTO `test_record` VALUES ('14', '04:46:65:7D:F0:C9', '2013-08-22 22:35:37', '201', '21', '10', '201', '27', '11', null);
INSERT INTO `test_record` VALUES ('15', '04:46:65:7D:F0:C9', '2013-08-22 22:40:39', '201', '20', '11', '201', '27', '11', null);
INSERT INTO `test_record` VALUES ('16', '04:46:65:7D:F0:C9', '2013-08-22 22:42:30', '201', '27', '11', '201', '27', '11', null);
INSERT INTO `test_record` VALUES ('17', '04:46:65:7D:F0:C9', '2013-08-22 22:57:25', '201', '27', '11', '-1', '-1', '-1', null);
INSERT INTO `test_record` VALUES ('18', '04:46:65:7D:F0:C9', '2013-08-22 22:58:06', '201', '27', '11', '201', '27', '11', null);
INSERT INTO `test_record` VALUES ('19', '04:46:65:7D:F0:C9', '2013-08-22 23:09:53', '201', '28', '10', '201', '27', '11', null);
INSERT INTO `test_record` VALUES ('20', '04:46:65:7D:F0:C9', '2013-08-23 09:26:30', '15', '9', '12', '15', '7', '12', null);
INSERT INTO `test_record` VALUES ('21', '04:46:65:7D:F0:C9', '2013-08-23 09:26:59', '15', '9', '12', '15', '11', '2', null);
INSERT INTO `test_record` VALUES ('22', '04:46:65:7D:F0:C9', '2013-08-23 09:27:58', '15', '9', '12', '15', '8', '14', null);
INSERT INTO `test_record` VALUES ('23', '04:46:65:7D:F0:C9', '2013-08-23 10:22:57', '15', '9', '12', '15', '8', '11', null);
INSERT INTO `test_record` VALUES ('24', 'a0:0b:ba:ba:12:84', '2013-08-23 10:53:12', '101', '14', '11', '101', '14', '14', null);
INSERT INTO `test_record` VALUES ('25', 'a0:0b:ba:ba:12:84', '2013-08-23 10:57:52', '101', '14', '10', '101', '13', '10', null);
INSERT INTO `test_record` VALUES ('26', 'a0:0b:ba:ba:12:84', '2013-08-23 11:01:05', '101', '14', '11', '101', '17', '16', null);
INSERT INTO `test_record` VALUES ('27', 'a0:0b:ba:ba:12:84', '2013-08-23 11:02:41', '101', '14', '11', '101', '14', '14', null);
INSERT INTO `test_record` VALUES ('28', 'a0:0b:ba:ba:12:84', '2013-08-23 11:10:01', '101', '11', '24', '101', '14', '24', null);
INSERT INTO `test_record` VALUES ('29', 'a0:0b:ba:ba:12:84', '2013-08-23 11:12:51', '101', '11', '24', '101', '14', '24', null);
INSERT INTO `test_record` VALUES ('30', 'a0:0b:ba:ba:12:84', '2013-08-23 11:16:23', '101', '11', '24', '101', '11', '24', null);
INSERT INTO `test_record` VALUES ('31', 'a0:0b:ba:ba:12:84', '2013-08-23 11:19:51', '101', '11', '24', '101', '11', '24', null);
INSERT INTO `test_record` VALUES ('32', 'a0:0b:ba:ba:12:84', '2013-08-23 11:24:04', '101', '12', '36', '101', '10', '38', null);
INSERT INTO `test_record` VALUES ('33', 'a0:0b:ba:ba:12:84', '2013-08-23 11:25:23', '101', '12', '36', '101', '11', '36', null);
INSERT INTO `test_record` VALUES ('34', 'a0:0b:ba:ba:12:84', '2013-08-23 11:27:14', '101', '12', '36', '101', '11', '36', null);
INSERT INTO `test_record` VALUES ('35', 'a0:0b:ba:ba:12:84', '2013-08-23 11:31:21', '101', '12', '36', '101', '13', '33', null);
INSERT INTO `test_record` VALUES ('36', 'a0:0b:ba:ba:12:84', '2013-08-23 11:37:03', '101', '28', '23', '101', '34', '25', null);
INSERT INTO `test_record` VALUES ('37', 'a0:0b:ba:ba:12:84', '2013-08-23 11:38:30', '101', '28', '23', '101', '34', '25', null);
INSERT INTO `test_record` VALUES ('38', 'a0:0b:ba:ba:12:84', '2013-08-23 11:39:54', '101', '28', '23', '101', '34', '25', null);
INSERT INTO `test_record` VALUES ('39', 'a0:0b:ba:ba:12:84', '2013-08-23 11:41:27', '101', '28', '22', '101', '32', '31', null);
INSERT INTO `test_record` VALUES ('40', 'a0:0b:ba:ba:12:84', '2013-08-23 11:53:16', '101', '5', '44', '101', '3', '40', null);
INSERT INTO `test_record` VALUES ('41', 'a0:0b:ba:ba:12:84', '2013-08-23 11:55:05', '101', '5', '44', '101', '6', '44', null);
INSERT INTO `test_record` VALUES ('42', 'a0:0b:ba:ba:12:84', '2013-08-23 11:56:11', '101', '5', '44', '101', '3', '40', null);
INSERT INTO `test_record` VALUES ('43', 'a0:0b:ba:ba:12:84', '2013-08-23 11:57:05', '101', '5', '44', '101', '3', '40', null);
INSERT INTO `test_record` VALUES ('44', 'a0:0b:ba:ba:12:84', '2013-08-23 12:10:40', '101', '13', '10', '101', '16', '6', null);
INSERT INTO `test_record` VALUES ('45', 'a0:0b:ba:ba:12:84', '2013-08-23 12:12:20', '101', '18', '7', '101', '16', '11', null);
INSERT INTO `test_record` VALUES ('46', 'a0:0b:ba:ba:12:84', '2013-08-23 12:17:19', '101', '18', '6', '101', '20', '9', null);
INSERT INTO `test_record` VALUES ('47', 'a0:0b:ba:ba:12:84', '2013-08-23 12:23:54', '101', '22', '11', '101', '21', '9', null);
INSERT INTO `test_record` VALUES ('48', 'a0:0b:ba:ba:12:84', '2013-08-23 13:11:57', '101', '26', '39', '101', '16', '39', null);
INSERT INTO `test_record` VALUES ('49', 'a0:0b:ba:ba:12:84', '2013-08-23 13:13:04', '101', '26', '38', '101', '16', '39', null);
INSERT INTO `test_record` VALUES ('50', 'a0:0b:ba:ba:12:84', '2013-08-23 13:14:38', '101', '26', '39', '101', '19', '42', null);
INSERT INTO `test_record` VALUES ('51', 'a0:0b:ba:ba:12:84', '2013-08-23 13:15:49', '101', '26', '39', '101', '28', '38', null);
INSERT INTO `test_record` VALUES ('52', 'a0:0b:ba:ba:12:84', '2013-08-23 13:18:08', '101', '37', '40', '101', '39', '41', null);
INSERT INTO `test_record` VALUES ('53', 'a0:0b:ba:ba:12:84', '2013-08-23 13:19:53', '101', '37', '40', '101', '39', '41', null);
INSERT INTO `test_record` VALUES ('54', 'a0:0b:ba:ba:12:84', '2013-08-23 13:21:27', '101', '37', '40', '101', '39', '41', null);
INSERT INTO `test_record` VALUES ('55', 'a0:0b:ba:ba:12:84', '2013-08-23 13:22:21', '101', '37', '40', '101', '39', '41', null);
INSERT INTO `test_record` VALUES ('56', 'a0:0b:ba:ba:12:84', '2013-08-23 13:29:00', '101', '47', '27', '101', '43', '26', null);
INSERT INTO `test_record` VALUES ('57', 'a0:0b:ba:ba:12:84', '2013-08-23 13:30:02', '101', '47', '27', '101', '47', '24', null);
INSERT INTO `test_record` VALUES ('58', 'a0:0b:ba:ba:12:84', '2013-08-23 13:31:33', '101', '47', '27', '101', '47', '24', null);
INSERT INTO `test_record` VALUES ('59', 'a0:0b:ba:ba:12:84', '2013-08-23 13:32:24', '101', '47', '27', '101', '46', '24', null);
INSERT INTO `test_record` VALUES ('60', 'a0:0b:ba:ba:12:84', '2013-08-23 13:34:25', '101', '45', '20', '101', '46', '20', null);
INSERT INTO `test_record` VALUES ('61', 'a0:0b:ba:ba:12:84', '2013-08-23 13:36:21', '101', '45', '18', '101', '46', '20', null);
INSERT INTO `test_record` VALUES ('62', 'a0:0b:ba:ba:12:84', '2013-08-23 13:40:54', '101', '45', '18', '101', '46', '20', null);
INSERT INTO `test_record` VALUES ('63', 'a0:0b:ba:ba:12:84', '2013-08-23 13:41:54', '101', '45', '18', '101', '42', '22', null);
INSERT INTO `test_record` VALUES ('64', 'a0:0b:ba:ba:12:84', '2013-08-23 13:43:05', '101', '45', '18', '101', '46', '20', null);
INSERT INTO `test_record` VALUES ('65', '10:bf:48:ec:7c:e3', '2013-08-23 13:53:04', '101', '45', '19', '101', '44', '9', null);
INSERT INTO `test_record` VALUES ('66', '10:bf:48:ec:7c:e3', '2013-08-23 13:58:16', '101', '49', '19', '101', '44', '10', null);
INSERT INTO `test_record` VALUES ('67', '10:bf:48:ec:7c:e3', '2013-08-23 14:01:55', '101', '49', '19', '101', '44', '9', null);
INSERT INTO `test_record` VALUES ('68', '10:bf:48:ec:7c:e3', '2013-08-23 14:02:55', '101', '49', '19', '101', '44', '9', null);
INSERT INTO `test_record` VALUES ('69', '10:bf:48:ec:7c:e3', '2013-08-23 14:03:38', '101', '49', '19', '101', '46', '20', null);
INSERT INTO `test_record` VALUES ('70', '10:bf:48:ec:7c:e3', '2013-08-23 14:09:04', '101', '44', '10', '101', '42', '10', null);
INSERT INTO `test_record` VALUES ('71', '10:bf:48:ec:7c:e3', '2013-08-23 14:10:36', '101', '44', '10', '101', '40', '15', null);
INSERT INTO `test_record` VALUES ('72', '10:bf:48:ec:7c:e3', '2013-08-23 14:11:32', '101', '44', '10', '101', '42', '10', null);
INSERT INTO `test_record` VALUES ('73', '10:bf:48:ec:7c:e3', '2013-08-23 14:12:26', '101', '44', '10', '101', '41', '17', null);
INSERT INTO `test_record` VALUES ('74', '10:bf:48:ec:7c:e3', '2013-08-23 14:16:48', '101', '38', '28', '101', '42', '32', null);
INSERT INTO `test_record` VALUES ('75', '10:bf:48:ec:7c:e3', '2013-08-23 14:18:16', '101', '38', '28', '101', '45', '20', null);
INSERT INTO `test_record` VALUES ('76', '10:bf:48:ec:7c:e3', '2013-08-23 14:19:04', '101', '38', '28', '101', '42', '27', null);
INSERT INTO `test_record` VALUES ('77', '10:bf:48:ec:7c:e3', '2013-08-23 14:19:50', '101', '38', '28', '101', '40', '23', null);
INSERT INTO `test_record` VALUES ('78', '10:bf:48:ec:7c:e3', '2013-08-23 14:23:36', '101', '31', '30', '101', '31', '31', null);
INSERT INTO `test_record` VALUES ('79', '10:bf:48:ec:7c:e3', '2013-08-23 14:24:56', '101', '31', '29', '101', '31', '31', null);
INSERT INTO `test_record` VALUES ('80', '10:bf:48:ec:7c:e3', '2013-08-23 14:25:54', '101', '31', '29', '101', '32', '31', null);
INSERT INTO `test_record` VALUES ('81', '10:bf:48:ec:7c:e3', '2013-08-23 14:27:14', '101', '31', '29', '101', '32', '31', null);
INSERT INTO `test_record` VALUES ('82', '10:bf:48:ec:7c:e3', '2013-08-23 14:31:45', '101', '27', '12', '101', '27', '11', null);
INSERT INTO `test_record` VALUES ('83', '10:bf:48:ec:7c:e3', '2013-08-23 14:33:07', '101', '27', '11', '101', '27', '11', null);
INSERT INTO `test_record` VALUES ('84', '10:bf:48:ec:7c:e3', '2013-08-23 14:34:49', '101', '27', '11', '101', '26', '13', null);
INSERT INTO `test_record` VALUES ('85', '10:bf:48:ec:7c:e3', '2013-08-23 14:35:42', '101', '27', '11', '101', '25', '12', null);
INSERT INTO `test_record` VALUES ('86', '10:bf:48:ec:7c:e3', '2013-08-23 14:41:24', '101', '33', '23', '101', '32', '27', null);
INSERT INTO `test_record` VALUES ('87', '10:bf:48:ec:7c:e3', '2013-08-23 14:42:42', '101', '33', '23', '101', '31', '27', null);
INSERT INTO `test_record` VALUES ('88', '10:bf:48:ec:7c:e3', '2013-08-23 14:44:00', '101', '33', '23', '101', '32', '27', null);
INSERT INTO `test_record` VALUES ('89', '10:bf:48:ec:7c:e3', '2013-08-23 14:45:07', '101', '33', '23', '101', '32', '27', null);
INSERT INTO `test_record` VALUES ('90', '10:bf:48:ec:7c:e3', '2013-08-23 14:48:36', '101', '20', '36', '101', '20', '35', null);
INSERT INTO `test_record` VALUES ('91', '10:bf:48:ec:7c:e3', '2013-08-23 14:49:38', '101', '20', '36', '101', '20', '35', null);
INSERT INTO `test_record` VALUES ('92', '10:bf:48:ec:7c:e3', '2013-08-23 14:50:57', '101', '20', '36', '101', '20', '35', null);
INSERT INTO `test_record` VALUES ('93', '10:bf:48:ec:7c:e3', '2013-08-23 14:50:58', '101', '20', '36', '101', '20', '35', null);
INSERT INTO `test_record` VALUES ('94', '10:bf:48:ec:7c:e3', '2013-08-23 14:53:19', '101', '20', '36', '101', '22', '36', null);
INSERT INTO `test_record` VALUES ('95', '10:bf:48:ec:7c:e3', '2013-08-23 14:56:51', '101', '6', '36', '101', '7', '37', null);
INSERT INTO `test_record` VALUES ('96', '10:bf:48:ec:7c:e3', '2013-08-23 14:57:47', '101', '6', '37', '101', '10', '36', null);
INSERT INTO `test_record` VALUES ('97', '10:bf:48:ec:7c:e3', '2013-08-23 14:59:39', '101', '6', '37', '101', '10', '36', null);
INSERT INTO `test_record` VALUES ('98', '10:bf:48:ec:7c:e3', '2013-08-23 15:00:38', '101', '6', '36', '101', '7', '37', null);
INSERT INTO `test_record` VALUES ('99', '10:bf:48:ec:7c:e3', '2013-08-23 15:05:15', '101', '24', '17', '101', '23', '17', null);
INSERT INTO `test_record` VALUES ('100', '10:bf:48:ec:7c:e3', '2013-08-23 15:06:42', '101', '24', '17', '101', '22', '19', null);
INSERT INTO `test_record` VALUES ('101', '10:bf:48:ec:7c:e3', '2013-08-23 15:08:11', '101', '24', '18', '101', '23', '17', null);
INSERT INTO `test_record` VALUES ('102', '10:bf:48:ec:7c:e3', '2013-08-23 15:09:24', '101', '24', '17', '101', '22', '19', null);
INSERT INTO `test_record` VALUES ('103', '10:bf:48:ec:7c:e3', '2013-08-23 15:14:28', '101', '35', '35', '101', '38', '37', null);
INSERT INTO `test_record` VALUES ('104', '10:bf:48:ec:7c:e3', '2013-08-23 15:15:15', '101', '35', '35', '101', '38', '37', null);
INSERT INTO `test_record` VALUES ('105', '10:bf:48:ec:7c:e3', '2013-08-23 15:16:05', '101', '35', '36', '101', '36', '41', null);
INSERT INTO `test_record` VALUES ('106', '10:bf:48:ec:7c:e3', '2013-08-23 15:16:36', '101', '35', '36', '101', '36', '37', null);
INSERT INTO `test_record` VALUES ('107', '10:bf:48:ec:7c:e3', '2013-08-23 15:17:39', '101', '35', '36', '101', '36', '37', null);
INSERT INTO `test_record` VALUES ('108', '04:46:65:7D:F0:C9', '2013-08-23 18:05:19', '15', '9', '13', '15', '8', '14', null);
INSERT INTO `test_record` VALUES ('109', '04:46:65:7D:F0:C9', '2013-08-23 18:05:34', '15', '8', '12', '15', '8', '12', null);
INSERT INTO `test_record` VALUES ('110', '04:46:65:7D:F0:C9', '2013-08-23 18:06:16', '15', '8', '12', '15', '8', '12', null);
INSERT INTO `test_record` VALUES ('111', '04:46:65:7D:F0:C9', '2013-08-23 18:07:45', '15', '8', '12', '15', '7', '12', null);
INSERT INTO `test_record` VALUES ('112', '04:46:65:7D:F0:C9', '2013-08-23 18:25:09', '15', '9', '12', '15', '10', '7', null);
INSERT INTO `test_record` VALUES ('113', '04:46:65:7D:F0:C9', '2013-08-23 18:26:24', '15', '10', '7', '15', '8', '12', null);
INSERT INTO `test_record` VALUES ('114', '04:46:65:7D:F0:C9', '2013-08-23 18:27:30', '15', '10', '6', '15', '11', '9', null);
INSERT INTO `test_record` VALUES ('115', '04:46:65:7D:F0:C9', '2013-08-23 18:28:12', '15', '10', '6', '15', '11', '9', null);
INSERT INTO `test_record` VALUES ('116', '04:46:65:7D:F0:C9', '2013-08-23 18:38:07', '15', '10', '6', '15', '11', '2', null);
INSERT INTO `test_record` VALUES ('117', '04:46:65:7D:F0:C9', '2013-08-23 18:39:14', '15', '10', '6', '15', '11', '2', null);
INSERT INTO `test_record` VALUES ('118', '04:46:65:7D:F0:C9', '2013-08-23 18:40:58', '15', '10', '6', '15', '11', '2', null);
INSERT INTO `test_record` VALUES ('119', '04:46:65:7D:F0:C9', '2013-08-23 18:42:26', '15', '10', '6', '15', '5', '12', null);
INSERT INTO `test_record` VALUES ('120', '04:46:65:7D:F0:C9', '2013-08-23 20:39:28', '201', '23', '11', '201', '23', '11', null);
INSERT INTO `test_record` VALUES ('121', '04:46:65:7D:F0:C9', '2013-08-23 20:41:07', '201', '27', '11', '201', '23', '11', null);
INSERT INTO `test_record` VALUES ('122', '04:46:65:7D:F0:C9', '2013-08-23 20:49:12', '201', '23', '10', '201', '23', '10', null);
INSERT INTO `test_record` VALUES ('123', '04:46:65:7D:F0:C9', '2013-08-23 21:06:31', '201', '23', '11', '201', '23', '11', null);
INSERT INTO `test_record` VALUES ('124', '04:46:65:7D:F0:C9', '2013-08-23 21:06:39', '201', '23', '10', '201', '23', '11', null);
INSERT INTO `test_record` VALUES ('125', '04:46:65:7D:F0:C9', '2013-08-23 22:15:36', '201', '24', '11', '201', '24', '11', null);
INSERT INTO `test_record` VALUES ('126', '04:46:65:7D:F0:C9', '2013-08-23 22:17:05', '201', '23', '11', '201', '23', '11', null);
INSERT INTO `test_record` VALUES ('127', '04:46:65:7D:F0:C9', '2013-08-23 22:17:20', '201', '24', '11', '201', '24', '11', null);
INSERT INTO `test_record` VALUES ('128', '04:46:65:7D:F0:C9', '2013-08-23 22:17:35', '201', '23', '11', '201', '23', '11', null);
INSERT INTO `test_record` VALUES ('129', '04:46:65:7D:F0:C9', '2013-08-23 22:50:54', '201', '20', '11', '201', '20', '11', null);
INSERT INTO `test_record` VALUES ('130', '04:46:65:7D:F0:C9', '2013-08-24 11:33:36', '201', '21', '11', '201', '20', '11', null);
INSERT INTO `test_record` VALUES ('131', '04:46:65:7D:F0:C9', '2013-08-24 11:34:00', '201', '27', '9', '201', '27', '9', null);
INSERT INTO `test_record` VALUES ('132', '04:46:65:7D:F0:C9', '2013-08-24 20:03:09', '201', '24', '11', '201', '24', '11', null);
INSERT INTO `test_record` VALUES ('133', 'a0:0b:ba:ba:12:84', '2013-08-26 10:18:23', '15', '29', '7', '15', '29', '7', null);
INSERT INTO `test_record` VALUES ('134', 'a0:0b:ba:ba:12:84', '2013-08-26 10:20:53', '15', '29', '7', '15', '26', '3', null);
INSERT INTO `test_record` VALUES ('135', 'a0:0b:ba:ba:12:84', '2013-08-26 10:21:08', '15', '29', '7', '15', '29', '7', null);
INSERT INTO `test_record` VALUES ('136', '10:bf:48:c0:f2:8d', '2013-08-26 10:39:18', '101', '34', '24', '101', '33', '24', null);
INSERT INTO `test_record` VALUES ('137', '10:bf:48:c0:f2:8d', '2013-08-26 13:48:46', '15', '9', '12', '15', '6', '14', null);
INSERT INTO `test_record` VALUES ('138', '04:46:65:7D:F0:C9', '2013-08-27 12:18:01', '15', '9', '12', '15', '9', '12', 'test locate 1st');
INSERT INTO `test_record` VALUES ('139', '04:46:65:7D:F0:C9', '2013-08-27 12:18:24', '15', '9', '12', '15', '9', '12', 'test collect');
INSERT INTO `test_record` VALUES ('140', '04:46:65:7D:F0:C9', '2013-08-28 10:55:25', '101', '24', '54', '101', '24', '54', 'test locate 1st');
INSERT INTO `test_record` VALUES ('141', '04:46:65:7D:F0:C9', '2013-08-28 10:56:47', '101', '24', '54', '101', '24', '54', 'test locate');
INSERT INTO `test_record` VALUES ('142', '04:46:65:7D:F0:C9', '2013-08-28 10:57:46', '101', '24', '54', '15', '9', '12', 'test locate');
INSERT INTO `test_record` VALUES ('143', 'ac:f7:f3:5b:21:96', '2013-08-28 12:11:56', '101', '17', '122', '101', '18', '119', 'test locate');
INSERT INTO `test_record` VALUES ('144', 'ac:f7:f3:5b:21:96', '2013-08-28 12:12:57', '101', '15', '118', '101', '25', '119', 'test locate');
INSERT INTO `test_record` VALUES ('145', 'ac:f7:f3:5b:21:96', '2013-08-28 12:13:24', '101', '13', '121', '101', '15', '123', 'test locate');
INSERT INTO `test_record` VALUES ('146', 'ac:f7:f3:5b:21:96', '2013-08-28 12:13:43', '101', '14', '125', '101', '15', '123', 'test locate');
INSERT INTO `test_record` VALUES ('147', 'ac:f7:f3:5b:21:96', '2013-08-28 12:14:07', '101', '17', '125', '101', '20', '124', 'test locate');
INSERT INTO `test_record` VALUES ('148', 'ac:f7:f3:5b:21:96', '2013-08-28 12:14:31', '101', '23', '125', '101', '29', '121', 'test locate');
INSERT INTO `test_record` VALUES ('149', 'ac:f7:f3:5b:21:96', '2013-08-28 12:15:03', '101', '28', '122', '101', '24', '124', 'test locate');
INSERT INTO `test_record` VALUES ('150', 'ac:f7:f3:5b:21:96', '2013-08-28 12:15:31', '101', '30', '118', '101', '29', '120', 'test locate');
INSERT INTO `test_record` VALUES ('151', 'ac:f7:f3:5b:21:96', '2013-08-28 12:16:01', '101', '32', '114', '101', '41', '112', 'test locate');
INSERT INTO `test_record` VALUES ('152', 'ac:f7:f3:5b:21:96', '2013-08-28 12:16:46', '101', '35', '110', '101', '36', '109', 'test locate');
INSERT INTO `test_record` VALUES ('153', 'ac:f7:f3:5b:21:96', '2013-08-28 12:17:15', '101', '32', '114', '101', '30', '113', 'test locate');
INSERT INTO `test_record` VALUES ('154', 'ac:f7:f3:5b:21:96', '2013-08-28 12:17:50', '101', '38', '115', '101', '33', '126', 'test locate');
INSERT INTO `test_record` VALUES ('155', 'ac:f7:f3:5b:21:96', '2013-08-28 12:18:05', '101', '38', '115', '101', '41', '112', 'test locate');
INSERT INTO `test_record` VALUES ('156', 'ac:f7:f3:5b:21:96', '2013-08-28 12:18:37', '101', '38', '106', '101', '40', '106', 'test locate');
INSERT INTO `test_record` VALUES ('157', 'ac:f7:f3:5b:21:96', '2013-08-28 12:19:01', '101', '45', '113', '101', '40', '115', 'test locate');
INSERT INTO `test_record` VALUES ('158', 'ac:f7:f3:5b:21:96', '2013-08-28 12:19:40', '101', '46', '120', '101', '44', '123', 'test locate');
INSERT INTO `test_record` VALUES ('159', 'ac:f7:f3:5b:21:96', '2013-08-28 12:20:24', '101', '48', '127', '101', '49', '126', 'test locate');
INSERT INTO `test_record` VALUES ('160', 'ac:f7:f3:5b:21:96', '2013-08-28 12:21:03', '101', '44', '127', '101', '38', '129', 'test locate');
INSERT INTO `test_record` VALUES ('161', 'ac:f7:f3:5b:21:96', '2013-08-28 12:21:33', '101', '44', '127', '101', '41', '126', 'test locate');
INSERT INTO `test_record` VALUES ('162', 'ac:f7:f3:5b:21:96', '2013-08-28 12:22:05', '101', '37', '127', '101', '34', '129', 'test locate');
INSERT INTO `test_record` VALUES ('163', 'ac:f7:f3:5b:21:96', '2013-08-28 12:22:25', '101', '37', '127', '101', '34', '127', 'test locate');
INSERT INTO `test_record` VALUES ('164', 'ac:f7:f3:5b:21:96', '2013-08-28 12:22:42', '101', '37', '127', '101', '36', '127', 'test locate');
INSERT INTO `test_record` VALUES ('165', 'ac:f7:f3:5b:21:96', '2013-08-28 12:22:58', '101', '37', '127', '101', '36', '127', 'test locate');
INSERT INTO `test_record` VALUES ('166', 'ac:f7:f3:5b:21:96', '2013-08-28 12:23:17', '101', '37', '127', '101', '36', '127', 'test locate');
INSERT INTO `test_record` VALUES ('167', 'ac:f7:f3:5b:21:96', '2013-08-28 12:26:33', '101', '37', '127', '101', '33', '126', 'test locate');
INSERT INTO `test_record` VALUES ('168', 'ac:f7:f3:5b:21:96', '2013-08-28 13:21:09', '101', '126', '39', '101', '122', '40', 'test locate');
INSERT INTO `test_record` VALUES ('169', 'ac:f7:f3:5b:21:96', '2013-08-28 13:21:28', '101', '126', '39', '101', '126', '38', 'test locate');
INSERT INTO `test_record` VALUES ('170', 'ac:f7:f3:5b:21:96', '2013-08-28 13:21:42', '101', '124', '37', '101', '126', '38', 'test locate');
INSERT INTO `test_record` VALUES ('171', 'ac:f7:f3:5b:21:96', '2013-08-28 13:22:11', '101', '124', '37', '101', '126', '38', 'test locate');
INSERT INTO `test_record` VALUES ('172', 'ac:f7:f3:5b:21:96', '2013-08-28 13:22:27', '101', '123', '34', '101', '119', '34', 'test locate');
INSERT INTO `test_record` VALUES ('173', 'ac:f7:f3:5b:21:96', '2013-08-28 13:22:39', '101', '123', '34', '101', '123', '33', 'test locate');
INSERT INTO `test_record` VALUES ('174', 'ac:f7:f3:5b:21:96', '2013-08-28 13:23:03', '101', '125', '32', '101', '126', '38', 'test locate');
INSERT INTO `test_record` VALUES ('175', 'ac:f7:f3:5b:21:96', '2013-08-28 13:23:18', '101', '125', '32', '101', '123', '33', 'test locate');
INSERT INTO `test_record` VALUES ('176', 'ac:f7:f3:5b:21:96', '2013-08-28 13:23:38', '101', '129', '28', '101', '123', '33', 'test locate');
INSERT INTO `test_record` VALUES ('177', 'ac:f7:f3:5b:21:96', '2013-08-28 13:24:05', '101', '132', '29', '101', '129', '30', 'test locate');
INSERT INTO `test_record` VALUES ('178', 'ac:f7:f3:5b:21:96', '2013-08-28 13:24:35', '101', '132', '29', '101', '132', '27', 'test locate');
INSERT INTO `test_record` VALUES ('179', 'ac:f7:f3:5b:21:96', '2013-08-28 13:25:09', '101', '133', '26', '101', '132', '27', 'test locate');
INSERT INTO `test_record` VALUES ('180', 'ac:f7:f3:5b:21:96', '2013-08-28 13:25:54', '101', '135', '27', '101', '132', '27', 'test locate');
INSERT INTO `test_record` VALUES ('181', 'ac:f7:f3:5b:21:96', '2013-08-28 13:26:11', '101', '136', '28', '101', '140', '30', 'test locate');
INSERT INTO `test_record` VALUES ('182', 'ac:f7:f3:5b:21:96', '2013-08-28 13:28:55', '101', '137', '29', '101', '132', '27', 'test locate');
INSERT INTO `test_record` VALUES ('183', 'ac:f7:f3:5b:21:96', '2013-08-28 13:28:59', '101', '137', '29', '101', '134', '32', 'test locate');
INSERT INTO `test_record` VALUES ('184', 'ac:f7:f3:5b:21:96', '2013-08-28 13:29:13', '101', '138', '30', '101', '137', '29', 'test locate');
INSERT INTO `test_record` VALUES ('185', 'ac:f7:f3:5b:21:96', '2013-08-28 13:29:50', '101', '135', '33', '101', '133', '42', 'test locate');
INSERT INTO `test_record` VALUES ('186', 'ac:f7:f3:5b:21:96', '2013-08-28 13:30:22', '101', '135', '37', '101', '132', '44', 'test locate');
INSERT INTO `test_record` VALUES ('187', 'ac:f7:f3:5b:21:96', '2013-08-28 13:30:42', '101', '135', '37', '101', '132', '44', 'test locate');
INSERT INTO `test_record` VALUES ('188', 'ac:f7:f3:5b:21:96', '2013-08-28 13:32:08', '101', '131', '40', '101', '131', '40', 'test locate 1st');
INSERT INTO `test_record` VALUES ('189', 'ac:f7:f3:5b:21:96', '2013-08-28 13:32:18', '101', '131', '40', '101', '131', '40', 'test locate');
INSERT INTO `test_record` VALUES ('190', 'ac:f7:f3:5b:21:96', '2013-08-28 13:32:45', '101', '128', '41', '101', '126', '38', 'test locate');
INSERT INTO `test_record` VALUES ('191', 'ac:f7:f3:5b:21:96', '2013-08-28 13:33:18', '101', '126', '44', '101', '126', '38', 'test locate');
INSERT INTO `test_record` VALUES ('192', 'ac:f7:f3:5b:21:96', '2013-08-28 13:34:39', '101', '122', '44', '101', '122', '44', 'test locate 1st');
INSERT INTO `test_record` VALUES ('193', 'ac:f7:f3:5b:21:96', '2013-08-28 13:34:42', '101', '122', '44', '101', '122', '44', 'test locate');
INSERT INTO `test_record` VALUES ('194', 'ac:f7:f3:5b:21:96', '2013-08-28 13:35:34', '101', '117', '43', '101', '122', '44', 'test locate');
INSERT INTO `test_record` VALUES ('195', 'ac:f7:f3:5b:21:96', '2013-08-28 13:35:51', '101', '116', '39', '101', '117', '38', 'test locate');
INSERT INTO `test_record` VALUES ('196', 'ac:f7:f3:5b:21:96', '2013-08-28 13:44:32', '101', '115', '118', '101', '114', '116', 'test locate');
INSERT INTO `test_record` VALUES ('197', 'ac:f7:f3:5b:21:96', '2013-08-28 13:44:49', '101', '114', '116', '101', '114', '116', 'test locate');
INSERT INTO `test_record` VALUES ('198', 'ac:f7:f3:5b:21:96', '2013-08-28 13:45:04', '101', '112', '114', '101', '111', '113', 'test locate');
INSERT INTO `test_record` VALUES ('199', 'ac:f7:f3:5b:21:96', '2013-08-28 13:45:17', '101', '112', '112', '101', '111', '113', 'test locate');
INSERT INTO `test_record` VALUES ('200', 'ac:f7:f3:5b:21:96', '2013-08-28 13:45:59', '101', '112', '110', '101', '112', '110', 'test locate 1st');
INSERT INTO `test_record` VALUES ('201', 'ac:f7:f3:5b:21:96', '2013-08-28 13:46:18', '101', '109', '110', '101', '111', '114', 'test locate');
INSERT INTO `test_record` VALUES ('202', 'ac:f7:f3:5b:21:96', '2013-08-28 13:46:38', '101', '109', '110', '101', '108', '111', 'test locate');
INSERT INTO `test_record` VALUES ('203', 'ac:f7:f3:5b:21:96', '2013-08-28 13:47:29', '101', '107', '109', '101', '98', '100', 'test locate');
INSERT INTO `test_record` VALUES ('204', 'ac:f7:f3:5b:21:96', '2013-08-28 13:47:55', '101', '107', '109', '101', '111', '104', 'test locate');
INSERT INTO `test_record` VALUES ('205', 'ac:f7:f3:5b:21:96', '2013-08-28 13:48:23', '101', '105', '106', '101', '105', '100', 'test locate');
INSERT INTO `test_record` VALUES ('206', 'ac:f7:f3:5b:21:96', '2013-08-28 13:49:26', '101', '105', '103', '101', '105', '103', 'test locate 1st');
INSERT INTO `test_record` VALUES ('207', 'ac:f7:f3:5b:21:96', '2013-08-28 13:49:53', '101', '106', '101', '101', '106', '99', 'test locate');
INSERT INTO `test_record` VALUES ('208', 'ac:f7:f3:5b:21:96', '2013-08-28 13:50:16', '101', '103', '97', '101', '102', '95', 'test locate');
INSERT INTO `test_record` VALUES ('209', 'ac:f7:f3:5b:21:96', '2013-08-28 14:30:32', '101', '132', '37', '101', '135', '35', 'test locate');
INSERT INTO `test_record` VALUES ('210', 'ac:f7:f3:5b:21:96', '2013-08-28 14:30:45', '101', '135', '34', '101', '132', '43', 'test locate');
INSERT INTO `test_record` VALUES ('211', 'ac:f7:f3:5b:21:96', '2013-08-28 14:31:00', '101', '137', '31', '101', '135', '35', 'test locate');
INSERT INTO `test_record` VALUES ('212', 'ac:f7:f3:5b:21:96', '2013-08-28 14:31:14', '101', '136', '29', '101', '135', '35', 'test locate');
INSERT INTO `test_record` VALUES ('213', 'ac:f7:f3:5b:21:96', '2013-08-28 14:31:33', '101', '133', '27', '101', '140', '30', 'test locate');
INSERT INTO `test_record` VALUES ('214', 'ac:f7:f3:5b:21:96', '2013-08-28 14:31:55', '101', '130', '28', '101', '132', '27', 'test locate');
INSERT INTO `test_record` VALUES ('215', 'ac:f7:f3:5b:21:96', '2013-08-28 14:32:27', '101', '126', '28', '101', '123', '33', 'test locate');
INSERT INTO `test_record` VALUES ('216', 'ac:f7:f3:5b:21:96', '2013-08-28 14:33:00', '101', '122', '29', '101', '122', '43', 'test locate');
INSERT INTO `test_record` VALUES ('217', 'ac:f7:f3:5b:21:96', '2013-08-28 14:33:30', '101', '115', '35', '101', '118', '36', 'test locate');
INSERT INTO `test_record` VALUES ('218', 'ac:f7:f3:5b:21:96', '2013-08-28 14:33:51', '101', '116', '38', '101', '117', '38', 'test locate');
INSERT INTO `test_record` VALUES ('219', 'ac:f7:f3:5b:21:96', '2013-08-28 14:34:19', '101', '117', '42', '101', '126', '38', 'test locate');
INSERT INTO `test_record` VALUES ('220', 'ac:f7:f3:5b:21:96', '2013-08-28 14:34:36', '101', '117', '42', '101', '122', '40', 'test locate');
INSERT INTO `test_record` VALUES ('221', 'ac:f7:f3:5b:21:96', '2013-08-28 14:34:43', '101', '117', '42', '101', '122', '40', 'test locate');
INSERT INTO `test_record` VALUES ('222', 'ac:f7:f3:5b:21:96', '2013-08-28 14:35:21', '101', '125', '43', '101', '126', '38', 'test locate');
INSERT INTO `test_record` VALUES ('223', 'ac:f7:f3:5b:21:96', '2013-08-28 14:35:59', '101', '124', '47', '101', '122', '44', 'test locate');
INSERT INTO `test_record` VALUES ('224', 'ac:f7:f3:5b:21:96', '2013-08-28 14:37:24', '101', '121', '46', '101', '121', '46', 'test locate 1st');
INSERT INTO `test_record` VALUES ('225', 'ac:f7:f3:5b:21:96', '2013-08-28 14:37:25', '101', '121', '46', '101', '122', '44', 'test locate');
INSERT INTO `test_record` VALUES ('226', 'ac:f7:f3:5b:21:96', '2013-08-28 15:07:42', '101', '47', '121', '101', '45', '119', 'test locate');
INSERT INTO `test_record` VALUES ('227', 'ac:f7:f3:5b:21:96', '2013-08-28 15:08:34', '101', '45', '128', '101', '48', '128', 'test locate');
INSERT INTO `test_record` VALUES ('228', 'ac:f7:f3:5b:21:96', '2013-08-28 15:09:10', '101', '43', '128', '101', '40', '127', 'test locate');
INSERT INTO `test_record` VALUES ('229', 'ac:f7:f3:5b:21:96', '2013-08-28 15:09:49', '101', '38', '128', '101', '34', '129', 'test locate');
INSERT INTO `test_record` VALUES ('230', 'ac:f7:f3:5b:21:96', '2013-08-28 15:10:23', '101', '34', '126', '101', '33', '126', 'test locate');
INSERT INTO `test_record` VALUES ('231', 'ac:f7:f3:5b:21:96', '2013-08-28 15:11:56', '101', '31', '121', '101', '31', '121', 'test locate 1st');
INSERT INTO `test_record` VALUES ('232', 'ac:f7:f3:5b:21:96', '2013-08-28 15:12:11', '101', '30', '119', '101', '31', '121', 'test locate');
INSERT INTO `test_record` VALUES ('233', 'ac:f7:f3:5b:21:96', '2013-08-28 15:12:31', '101', '30', '117', '101', '29', '115', 'test locate');
INSERT INTO `test_record` VALUES ('234', 'ac:f7:f3:5b:21:96', '2013-08-28 15:12:59', '101', '25', '116', '101', '20', '117', 'test locate');
INSERT INTO `test_record` VALUES ('235', 'ac:f7:f3:5b:21:96', '2013-08-28 15:13:22', '101', '20', '116', '101', '19', '115', 'test locate');
INSERT INTO `test_record` VALUES ('236', 'ac:f7:f3:5b:21:96', '2013-08-28 15:13:39', '101', '19', '120', '101', '19', '116', 'test locate');
INSERT INTO `test_record` VALUES ('237', 'ac:f7:f3:5b:21:96', '2013-08-28 15:14:04', '101', '18', '124', '101', '20', '124', 'test locate');
INSERT INTO `test_record` VALUES ('238', 'ac:f7:f3:5b:21:96', '2013-08-28 15:14:23', '101', '14', '124', '101', '15', '115', 'test locate');
INSERT INTO `test_record` VALUES ('239', 'ac:f7:f3:5b:21:96', '2013-08-28 15:14:33', '101', '14', '124', '101', '16', '123', 'test locate');
INSERT INTO `test_record` VALUES ('240', 'ac:f7:f3:5b:21:96', '2013-08-28 15:15:43', '101', '12', '124', '101', '12', '124', 'test locate 1st');
INSERT INTO `test_record` VALUES ('241', 'ac:f7:f3:5b:21:96', '2013-08-28 15:16:20', '101', '14', '120', '101', '18', '118', 'test locate');
INSERT INTO `test_record` VALUES ('242', 'a0:0b:ba:ba:12:84', '2013-08-29 10:43:34', '101', '24', '116', '101', '21', '121', 'test locate');
INSERT INTO `test_record` VALUES ('243', 'a0:0b:ba:ba:12:84', '2013-08-29 10:43:44', '101', '24', '116', '101', '21', '121', 'test locate');
INSERT INTO `test_record` VALUES ('244', 'a0:0b:ba:ba:12:84', '2013-08-29 10:44:14', '101', '24', '116', '101', '19', '119', 'test locate');
INSERT INTO `test_record` VALUES ('245', 'a0:0b:ba:ba:12:84', '2013-08-29 10:44:38', '101', '24', '116', '101', '29', '121', 'test locate');
INSERT INTO `test_record` VALUES ('246', 'a0:0b:ba:ba:12:84', '2013-08-29 10:49:33', '101', '24', '116', '101', '24', '118', 'test locate');
INSERT INTO `test_record` VALUES ('247', 'a0:0b:ba:ba:12:84', '2013-08-29 10:52:47', '101', '24', '116', '101', '25', '122', 'test locate');
INSERT INTO `test_record` VALUES ('248', 'a0:0b:ba:ba:12:84', '2013-08-29 10:53:26', '101', '24', '116', '101', '34', '129', 'test locate');
INSERT INTO `test_record` VALUES ('249', 'a0:0b:ba:ba:12:84', '2013-08-29 10:54:07', '101', '24', '116', '101', '28', '123', 'test locate');
INSERT INTO `test_record` VALUES ('250', 'a0:0b:ba:ba:12:84', '2013-08-29 10:54:45', '101', '24', '121', '101', '23', '125', 'test locate');
INSERT INTO `test_record` VALUES ('251', 'a0:0b:ba:ba:12:84', '2013-08-29 10:55:10', '101', '24', '121', '101', '19', '116', 'test locate');
INSERT INTO `test_record` VALUES ('252', 'a0:0b:ba:ba:12:84', '2013-08-29 10:58:08', '101', '24', '121', '101', '24', '124', 'test locate');
INSERT INTO `test_record` VALUES ('253', 'a0:0b:ba:ba:12:84', '2013-08-29 10:58:34', '101', '24', '121', '101', '24', '121', 'test locate');
INSERT INTO `test_record` VALUES ('254', 'a0:0b:ba:ba:12:84', '2013-08-29 10:59:06', '101', '24', '121', '101', '12', '124', 'test locate');
INSERT INTO `test_record` VALUES ('255', 'a0:0b:ba:ba:12:84', '2013-08-29 10:59:41', '101', '24', '121', '101', '19', '116', 'test locate');
INSERT INTO `test_record` VALUES ('256', 'a0:0b:ba:ba:12:84', '2013-08-29 11:00:52', '101', '27', '125', '101', '34', '129', 'test locate');
INSERT INTO `test_record` VALUES ('257', 'a0:0b:ba:ba:12:84', '2013-08-29 11:01:15', '101', '27', '125', '101', '30', '122', 'test locate');
INSERT INTO `test_record` VALUES ('258', 'a0:0b:ba:ba:12:84', '2013-08-29 11:01:50', '101', '27', '125', '101', '27', '125', 'test locate');
INSERT INTO `test_record` VALUES ('259', 'a0:0b:ba:ba:12:84', '2013-08-29 11:02:13', '101', '27', '125', '101', '25', '121', 'test locate');
INSERT INTO `test_record` VALUES ('260', 'a0:0b:ba:ba:12:84', '2013-08-29 11:05:07', '101', '36', '127', '101', '34', '128', 'test locate');
INSERT INTO `test_record` VALUES ('261', 'a0:0b:ba:ba:12:84', '2013-08-29 11:10:58', '101', '36', '127', '101', '33', '126', 'test locate');
INSERT INTO `test_record` VALUES ('262', 'a0:0b:ba:ba:12:84', '2013-08-29 11:11:35', '101', '36', '127', '101', '34', '128', 'test locate');
INSERT INTO `test_record` VALUES ('263', 'a0:0b:ba:ba:12:84', '2013-08-29 11:12:09', '101', '36', '127', '101', '37', '126', 'test locate');
INSERT INTO `test_record` VALUES ('264', 'a0:0b:ba:ba:12:84', '2013-08-29 11:13:30', '101', '43', '127', '101', '46', '120', 'test locate');
INSERT INTO `test_record` VALUES ('265', 'a0:0b:ba:ba:12:84', '2013-08-29 11:13:37', '101', '43', '127', '101', '45', '127', 'test locate');
INSERT INTO `test_record` VALUES ('266', 'a0:0b:ba:ba:12:84', '2013-08-29 11:13:59', '101', '43', '127', '101', '41', '127', 'test locate');
INSERT INTO `test_record` VALUES ('267', 'a0:0b:ba:ba:12:84', '2013-08-29 11:14:40', '101', '43', '127', '101', '44', '126', 'test locate');
INSERT INTO `test_record` VALUES ('268', 'a0:0b:ba:ba:12:84', '2013-08-29 11:16:47', '101', '51', '127', '101', '51', '127', 'test locate 1st');
INSERT INTO `test_record` VALUES ('269', 'a0:0b:ba:ba:12:84', '2013-08-29 11:16:48', '101', '51', '127', '101', '51', '127', 'test locate');
INSERT INTO `test_record` VALUES ('270', 'a0:0b:ba:ba:12:84', '2013-08-29 11:17:14', '101', '51', '127', '101', '46', '121', 'test locate');
INSERT INTO `test_record` VALUES ('271', 'a0:0b:ba:ba:12:84', '2013-08-29 11:18:13', '101', '51', '127', '101', '46', '128', 'test locate');
INSERT INTO `test_record` VALUES ('272', 'a0:0b:ba:ba:12:84', '2013-08-29 11:18:33', '101', '51', '127', '101', '47', '126', 'test locate');
INSERT INTO `test_record` VALUES ('273', 'a0:0b:ba:ba:12:84', '2013-08-29 11:20:10', '101', '51', '119', '101', '51', '119', 'test locate 1st');
INSERT INTO `test_record` VALUES ('274', 'a0:0b:ba:ba:12:84', '2013-08-29 11:22:50', '101', '41', '112', '101', '44', '113', 'test locate');
INSERT INTO `test_record` VALUES ('275', 'a0:0b:ba:ba:12:84', '2013-08-29 11:23:25', '101', '41', '112', '101', '44', '116', 'test locate');
INSERT INTO `test_record` VALUES ('276', 'a0:0b:ba:ba:12:84', '2013-08-29 11:31:43', '101', '42', '112', '101', '46', '121', 'test locate');
INSERT INTO `test_record` VALUES ('277', 'a0:0b:ba:ba:12:84', '2013-08-29 11:36:14', '101', '42', '112', '101', '43', '113', 'test locate');
INSERT INTO `test_record` VALUES ('278', 'a0:0b:ba:ba:12:84', '2013-08-29 11:36:29', '101', '42', '112', '101', '44', '114', 'test locate');
INSERT INTO `test_record` VALUES ('279', 'a0:0b:ba:ba:12:84', '2013-08-29 11:36:47', '101', '42', '112', '101', '40', '112', 'test locate');
INSERT INTO `test_record` VALUES ('280', 'a0:0b:ba:ba:12:84', '2013-08-29 11:37:20', '101', '42', '112', '101', '44', '114', 'test locate');
INSERT INTO `test_record` VALUES ('281', 'a0:0b:ba:ba:12:84', '2013-08-29 11:43:56', '101', '36', '112', '101', '44', '116', 'test locate');
INSERT INTO `test_record` VALUES ('282', 'a0:0b:ba:ba:12:84', '2013-08-29 11:44:05', '101', '36', '112', '101', '39', '112', 'test locate');
INSERT INTO `test_record` VALUES ('283', 'a0:0b:ba:ba:12:84', '2013-08-29 11:44:17', '101', '36', '112', '101', '33', '112', 'test locate');
INSERT INTO `test_record` VALUES ('284', 'a0:0b:ba:ba:12:84', '2013-08-29 11:44:25', '101', '36', '112', '101', '38', '115', 'test locate');
INSERT INTO `test_record` VALUES ('285', 'a0:0b:ba:ba:12:84', '2013-08-29 11:45:29', '101', '30', '115', '101', '24', '118', 'test locate');
INSERT INTO `test_record` VALUES ('286', 'a0:0b:ba:ba:12:84', '2013-08-29 11:45:44', '101', '30', '115', '101', '29', '115', 'test locate');
INSERT INTO `test_record` VALUES ('287', 'a0:0b:ba:ba:12:84', '2013-08-29 11:45:53', '101', '30', '115', '101', '27', '117', 'test locate');
INSERT INTO `test_record` VALUES ('288', 'a0:0b:ba:ba:12:84', '2013-08-29 11:46:06', '101', '30', '115', '101', '29', '115', 'test locate');
INSERT INTO `test_record` VALUES ('289', 'a0:0b:ba:ba:12:84', '2013-08-29 11:51:21', '101', '119', '113', '101', '117', '111', 'test locate');
INSERT INTO `test_record` VALUES ('290', 'a0:0b:ba:ba:12:84', '2013-08-29 11:51:31', '101', '119', '113', '101', '116', '116', 'test locate');
INSERT INTO `test_record` VALUES ('291', 'a0:0b:ba:ba:12:84', '2013-08-29 11:51:40', '101', '119', '113', '101', '116', '116', 'test locate');
INSERT INTO `test_record` VALUES ('292', 'a0:0b:ba:ba:12:84', '2013-08-29 11:51:46', '101', '119', '113', '101', '116', '116', 'test locate');
INSERT INTO `test_record` VALUES ('293', 'a0:0b:ba:ba:12:84', '2013-08-29 11:52:42', '101', '115', '109', '101', '113', '108', 'test locate');
INSERT INTO `test_record` VALUES ('294', 'a0:0b:ba:ba:12:84', '2013-08-29 11:53:00', '101', '115', '109', '101', '115', '110', 'test locate');
INSERT INTO `test_record` VALUES ('295', 'a0:0b:ba:ba:12:84', '2013-08-29 11:53:18', '101', '115', '109', '101', '112', '111', 'test locate');
INSERT INTO `test_record` VALUES ('296', 'a0:0b:ba:ba:12:84', '2013-08-29 11:53:28', '101', '115', '109', '101', '112', '113', 'test locate');
INSERT INTO `test_record` VALUES ('297', 'a0:0b:ba:ba:12:84', '2013-08-29 11:54:06', '101', '112', '110', '101', '113', '108', 'test locate');
INSERT INTO `test_record` VALUES ('298', 'a0:0b:ba:ba:12:84', '2013-08-29 11:54:14', '101', '112', '110', '101', '108', '110', 'test locate');
INSERT INTO `test_record` VALUES ('299', 'a0:0b:ba:ba:12:84', '2013-08-29 11:54:21', '101', '112', '110', '101', '118', '111', 'test locate');
INSERT INTO `test_record` VALUES ('300', 'a0:0b:ba:ba:12:84', '2013-08-29 11:55:44', '101', '106', '99', '101', '104', '106', 'test locate');
INSERT INTO `test_record` VALUES ('301', 'a0:0b:ba:ba:12:84', '2013-08-29 11:55:58', '101', '106', '99', '101', '104', '106', 'test locate');
INSERT INTO `test_record` VALUES ('302', 'a0:0b:ba:ba:12:84', '2013-08-29 11:56:23', '101', '106', '99', '101', '104', '106', 'test locate');
INSERT INTO `test_record` VALUES ('303', 'a0:0b:ba:ba:12:84', '2013-08-29 12:08:31', '101', '105', '102', '101', '105', '102', 'test locate 1st');
INSERT INTO `test_record` VALUES ('304', 'a0:0b:ba:ba:12:84', '2013-08-29 12:08:59', '101', '105', '102', '101', '102', '103', 'test locate');
INSERT INTO `test_record` VALUES ('305', 'a0:0b:ba:ba:12:84', '2013-08-29 12:09:08', '101', '105', '102', '101', '108', '110', 'test locate');
INSERT INTO `test_record` VALUES ('306', 'a0:0b:ba:ba:12:84', '2013-08-29 12:13:04', '101', '104', '107', '101', '104', '106', 'test locate');
INSERT INTO `test_record` VALUES ('307', 'a0:0b:ba:ba:12:84', '2013-08-29 12:13:04', '101', '104', '107', '101', '101', '105', 'test locate');
INSERT INTO `test_record` VALUES ('308', 'a0:0b:ba:ba:12:84', '2013-08-29 12:13:06', '101', '104', '107', '101', '109', '111', 'test locate');
INSERT INTO `test_record` VALUES ('309', 'a0:0b:ba:ba:12:84', '2013-08-29 12:13:15', '101', '104', '107', '101', '109', '111', 'test locate');
INSERT INTO `test_record` VALUES ('310', 'a0:0b:ba:ba:12:84', '2013-08-29 12:13:21', '101', '104', '107', '101', '102', '104', 'test locate');
INSERT INTO `test_record` VALUES ('311', 'a0:0b:ba:ba:12:84', '2013-08-29 12:13:28', '101', '104', '107', '101', '109', '102', 'test locate');
INSERT INTO `test_record` VALUES ('312', 'a0:0b:ba:ba:12:84', '2013-08-29 12:14:08', '101', '108', '111', '101', '112', '115', 'test locate');
INSERT INTO `test_record` VALUES ('313', 'a0:0b:ba:ba:12:84', '2013-08-29 12:14:16', '101', '108', '111', '101', '109', '112', 'test locate');
INSERT INTO `test_record` VALUES ('314', 'a0:0b:ba:ba:12:84', '2013-08-29 12:15:02', '101', '108', '111', '101', '108', '109', 'test locate');
INSERT INTO `test_record` VALUES ('315', 'a0:0b:ba:ba:12:84', '2013-08-29 12:15:33', '101', '108', '111', '101', '109', '111', 'test locate');
INSERT INTO `test_record` VALUES ('316', 'a0:0b:ba:ba:12:84', '2013-08-29 12:15:39', '101', '108', '111', '101', '108', '110', 'test locate');
INSERT INTO `test_record` VALUES ('317', 'a0:0b:ba:ba:12:84', '2013-08-29 12:16:53', '101', '114', '117', '101', '116', '119', 'test locate');
INSERT INTO `test_record` VALUES ('318', 'a0:0b:ba:ba:12:84', '2013-08-29 12:17:07', '101', '114', '117', '101', '116', '119', 'test locate');
INSERT INTO `test_record` VALUES ('319', 'a0:0b:ba:ba:12:84', '2013-08-29 12:17:20', '101', '114', '117', '101', '113', '115', 'test locate');
INSERT INTO `test_record` VALUES ('320', 'a0:0b:ba:ba:12:84', '2013-08-29 12:17:29', '101', '114', '117', '101', '113', '115', 'test locate');
INSERT INTO `test_record` VALUES ('321', 'a0:0b:ba:ba:12:84', '2013-08-29 12:21:07', '101', '124', '47', '101', '123', '47', 'test locate');
INSERT INTO `test_record` VALUES ('322', 'a0:0b:ba:ba:12:84', '2013-08-29 12:21:30', '101', '124', '47', '101', '120', '47', 'test locate');
INSERT INTO `test_record` VALUES ('323', 'a0:0b:ba:ba:12:84', '2013-08-29 12:21:51', '101', '124', '47', '101', '120', '47', 'test locate');
INSERT INTO `test_record` VALUES ('324', 'a0:0b:ba:ba:12:84', '2013-08-29 12:21:59', '101', '124', '47', '101', '120', '47', 'test locate');
INSERT INTO `test_record` VALUES ('325', 'a0:0b:ba:ba:12:84', '2013-08-29 12:23:10', '101', '124', '43', '101', '124', '43', 'test locate 1st');
INSERT INTO `test_record` VALUES ('326', 'a0:0b:ba:ba:12:84', '2013-08-29 12:23:21', '101', '124', '43', '101', '120', '41', 'test locate');
INSERT INTO `test_record` VALUES ('327', 'a0:0b:ba:ba:12:84', '2013-08-29 12:23:35', '101', '124', '43', '101', '121', '46', 'test locate');
INSERT INTO `test_record` VALUES ('328', 'a0:0b:ba:ba:12:84', '2013-08-29 12:23:41', '101', '124', '43', '101', '121', '42', 'test locate');
INSERT INTO `test_record` VALUES ('329', 'a0:0b:ba:ba:12:84', '2013-08-29 12:24:25', '101', '124', '40', '101', '116', '42', 'test locate');
INSERT INTO `test_record` VALUES ('330', 'a0:0b:ba:ba:12:84', '2013-08-29 12:24:39', '101', '124', '40', '101', '126', '44', 'test locate');
INSERT INTO `test_record` VALUES ('331', 'a0:0b:ba:ba:12:84', '2013-08-29 12:24:46', '101', '124', '40', '101', '125', '43', 'test locate');
INSERT INTO `test_record` VALUES ('332', 'a0:0b:ba:ba:12:84', '2013-08-29 12:24:57', '101', '124', '40', '101', '125', '43', 'test locate');
INSERT INTO `test_record` VALUES ('333', 'a0:0b:ba:ba:12:84', '2013-08-29 12:25:58', '101', '133', '41', '101', '132', '43', 'test locate');
INSERT INTO `test_record` VALUES ('334', 'a0:0b:ba:ba:12:84', '2013-08-29 12:26:07', '101', '133', '41', '101', '129', '42', 'test locate');
INSERT INTO `test_record` VALUES ('335', 'a0:0b:ba:ba:12:84', '2013-08-29 12:26:16', '101', '133', '41', '101', '132', '44', 'test locate');
INSERT INTO `test_record` VALUES ('336', 'a0:0b:ba:ba:12:84', '2013-08-29 12:26:23', '101', '133', '41', '101', '132', '44', 'test locate');
INSERT INTO `test_record` VALUES ('337', 'a0:0b:ba:ba:12:84', '2013-08-29 12:27:40', '101', '133', '37', '101', '133', '37', 'test locate 1st');
INSERT INTO `test_record` VALUES ('338', 'a0:0b:ba:ba:12:84', '2013-08-29 12:27:53', '101', '133', '37', '101', '135', '35', 'test locate');
INSERT INTO `test_record` VALUES ('339', 'a0:0b:ba:ba:12:84', '2013-08-29 12:28:05', '101', '133', '37', '101', '132', '43', 'test locate');
INSERT INTO `test_record` VALUES ('340', 'a0:0b:ba:ba:12:84', '2013-08-29 12:28:15', '101', '133', '37', '101', '135', '35', 'test locate');
INSERT INTO `test_record` VALUES ('341', 'a0:0b:ba:ba:12:84', '2013-08-29 12:29:26', '101', '124', '29', '101', '124', '28', 'test locate');
INSERT INTO `test_record` VALUES ('342', 'a0:0b:ba:ba:12:84', '2013-08-29 12:29:39', '101', '124', '29', '101', '116', '42', 'test locate');
INSERT INTO `test_record` VALUES ('343', 'a0:0b:ba:ba:12:84', '2013-08-29 12:29:46', '101', '124', '29', '101', '119', '30', 'test locate');
INSERT INTO `test_record` VALUES ('344', 'a0:0b:ba:ba:12:84', '2013-08-29 12:30:09', '101', '124', '29', '101', '122', '31', 'test locate');
INSERT INTO `test_record` VALUES ('345', 'a0:0b:ba:ba:12:84', '2013-08-29 12:31:28', '101', '118', '35', '101', '118', '35', 'test locate 1st');
INSERT INTO `test_record` VALUES ('346', 'a0:0b:ba:ba:12:84', '2013-08-29 12:31:42', '101', '118', '35', '101', '116', '42', 'test locate');
INSERT INTO `test_record` VALUES ('347', 'a0:0b:ba:ba:12:84', '2013-08-29 12:31:53', '101', '118', '35', '101', '116', '34', 'test locate');
INSERT INTO `test_record` VALUES ('348', '10:bf:48:ec:7c:e3', '2013-08-29 13:07:43', '101', '97', '99', '101', '97', '99', 'test locate');
INSERT INTO `test_record` VALUES ('349', '10:bf:48:ec:7c:e3', '2013-08-29 13:08:03', '101', '97', '99', '101', '97', '99', 'test locate');
INSERT INTO `test_record` VALUES ('350', '10:bf:48:ec:7c:e3', '2013-08-29 13:08:14', '101', '97', '99', '101', '98', '102', 'test locate');
INSERT INTO `test_record` VALUES ('351', '10:bf:48:ec:7c:e3', '2013-08-29 13:08:23', '101', '97', '99', '101', '99', '101', 'test locate');
INSERT INTO `test_record` VALUES ('352', '10:bf:48:ec:7c:e3', '2013-08-29 13:09:51', '101', '104', '104', '101', '109', '111', 'test locate 1st');
INSERT INTO `test_record` VALUES ('353', '10:bf:48:ec:7c:e3', '2013-08-29 13:10:06', '101', '104', '104', '101', '108', '110', 'test locate');
INSERT INTO `test_record` VALUES ('354', '10:bf:48:ec:7c:e3', '2013-08-29 13:10:18', '101', '104', '104', '101', '104', '108', 'test locate');
INSERT INTO `test_record` VALUES ('355', '10:bf:48:ec:7c:e3', '2013-08-29 13:10:39', '101', '104', '104', '101', '104', '106', 'test locate');
INSERT INTO `test_record` VALUES ('356', '10:bf:48:ec:7c:e3', '2013-08-29 13:10:53', '101', '104', '104', '101', '109', '104', 'test locate');
INSERT INTO `test_record` VALUES ('357', '10:bf:48:ec:7c:e3', '2013-08-29 13:11:39', '101', '109', '112', '101', '109', '113', 'test locate');
INSERT INTO `test_record` VALUES ('358', '10:bf:48:ec:7c:e3', '2013-08-29 13:11:51', '101', '109', '112', '101', '108', '112', 'test locate');
INSERT INTO `test_record` VALUES ('359', '10:bf:48:ec:7c:e3', '2013-08-29 13:12:08', '101', '109', '112', '101', '109', '112', 'test locate');
INSERT INTO `test_record` VALUES ('360', '10:bf:48:ec:7c:e3', '2013-08-29 13:12:21', '101', '109', '112', '101', '111', '114', 'test locate');
INSERT INTO `test_record` VALUES ('361', '10:bf:48:ec:7c:e3', '2013-08-29 13:24:00', '101', '119', '117', '101', '120', '114', 'test locate');
INSERT INTO `test_record` VALUES ('362', '10:bf:48:ec:7c:e3', '2013-08-29 13:24:06', '101', '119', '113', '101', '118', '112', 'test locate');
INSERT INTO `test_record` VALUES ('363', '10:bf:48:ec:7c:e3', '2013-08-29 13:24:13', '101', '119', '117', '101', '119', '117', 'test locate 1st');
INSERT INTO `test_record` VALUES ('364', '10:bf:48:ec:7c:e3', '2013-08-29 13:24:14', '101', '119', '113', '101', '121', '114', 'test locate');
INSERT INTO `test_record` VALUES ('365', '10:bf:48:ec:7c:e3', '2013-08-29 13:25:45', '101', '119', '113', '101', '115', '118', 'test locate');
INSERT INTO `test_record` VALUES ('366', '10:bf:48:ec:7c:e3', '2013-08-29 13:26:05', '101', '119', '113', '101', '119', '114', 'test locate');
INSERT INTO `test_record` VALUES ('367', '10:bf:48:ec:7c:e3', '2013-08-29 13:26:14', '101', '119', '113', '101', '120', '114', 'test locate');
INSERT INTO `test_record` VALUES ('368', '10:bf:48:ec:7c:e3', '2013-08-29 13:26:25', '101', '119', '113', '101', '118', '112', 'test locate');
INSERT INTO `test_record` VALUES ('369', '10:bf:48:ec:7c:e3', '2013-08-29 13:28:59', '101', '113', '107', '101', '112', '107', 'test locate');
INSERT INTO `test_record` VALUES ('370', '10:bf:48:ec:7c:e3', '2013-08-29 13:31:52', '101', '113', '107', '101', '113', '108', 'test locate');
INSERT INTO `test_record` VALUES ('371', '10:bf:48:ec:7c:e3', '2013-08-29 13:32:10', '101', '113', '107', '101', '108', '109', 'test locate');
INSERT INTO `test_record` VALUES ('372', '10:bf:48:ec:7c:e3', '2013-08-29 13:32:20', '101', '113', '107', '101', '112', '111', 'test locate');
INSERT INTO `test_record` VALUES ('373', '10:bf:48:ec:7c:e3', '2013-08-29 13:32:47', '101', '109', '103', '101', '111', '113', 'test locate');
INSERT INTO `test_record` VALUES ('374', '10:bf:48:ec:7c:e3', '2013-08-29 13:32:58', '101', '109', '103', '101', '100', '103', 'test locate');
INSERT INTO `test_record` VALUES ('375', '10:bf:48:ec:7c:e3', '2013-08-29 13:33:05', '101', '109', '103', '101', '102', '104', 'test locate');
INSERT INTO `test_record` VALUES ('376', '10:bf:48:ec:7c:e3', '2013-08-29 13:33:28', '101', '109', '103', '101', '113', '108', 'test locate');
INSERT INTO `test_record` VALUES ('377', '10:bf:48:ec:7c:e3', '2013-08-29 13:33:58', '101', '109', '103', '101', '104', '106', 'test locate');
INSERT INTO `test_record` VALUES ('378', '10:bf:48:ec:7c:e3', '2013-08-29 13:34:40', '101', '103', '97', '101', '103', '98', 'test locate');
INSERT INTO `test_record` VALUES ('379', '10:bf:48:ec:7c:e3', '2013-08-29 13:35:39', '101', '103', '97', '101', '103', '98', 'test locate');
INSERT INTO `test_record` VALUES ('380', '10:bf:48:ec:7c:e3', '2013-08-29 13:35:49', '101', '103', '97', '101', '104', '98', 'test locate');
INSERT INTO `test_record` VALUES ('381', '10:bf:48:ec:7c:e3', '2013-08-29 13:36:21', '101', '101', '94', '101', '101', '94', 'test locate');
INSERT INTO `test_record` VALUES ('382', '10:bf:48:ec:7c:e3', '2013-08-29 13:36:35', '101', '101', '94', '101', '101', '97', 'test locate');
INSERT INTO `test_record` VALUES ('383', '10:bf:48:ec:7c:e3', '2013-08-29 13:36:54', '101', '101', '94', '101', '106', '99', 'test locate');
INSERT INTO `test_record` VALUES ('384', '10:bf:48:ec:7c:e3', '2013-08-29 13:37:18', '101', '101', '94', '101', '96', '98', 'test locate');
INSERT INTO `test_record` VALUES ('385', '10:bf:48:ec:7c:e3', '2013-08-29 13:38:03', '101', '97', '99', '101', '98', '100', 'test locate');
INSERT INTO `test_record` VALUES ('386', '10:bf:48:ec:7c:e3', '2013-08-29 13:38:11', '101', '97', '99', '101', '96', '100', 'test locate');
INSERT INTO `test_record` VALUES ('387', '10:bf:48:ec:7c:e3', '2013-08-29 13:38:19', '101', '97', '99', '101', '97', '99', 'test locate');
INSERT INTO `test_record` VALUES ('388', '10:bf:48:ec:7c:e3', '2013-08-29 13:38:44', '101', '97', '99', '101', '97', '99', 'test locate');
INSERT INTO `test_record` VALUES ('389', '10:bf:48:ec:7c:e3', '2013-08-29 13:39:25', '101', '101', '103', '101', '105', '106', 'test locate');
INSERT INTO `test_record` VALUES ('390', '10:bf:48:ec:7c:e3', '2013-08-29 13:39:55', '101', '101', '103', '101', '106', '101', 'test locate');
INSERT INTO `test_record` VALUES ('391', '10:bf:48:ec:7c:e3', '2013-08-29 13:40:22', '101', '101', '103', '101', '99', '101', 'test locate');
INSERT INTO `test_record` VALUES ('392', '10:bf:48:ec:7c:e3', '2013-08-29 13:40:48', '101', '101', '103', '101', '103', '96', 'test locate');
INSERT INTO `test_record` VALUES ('393', '10:bf:48:ec:7c:e3', '2013-08-29 13:50:13', '101', '106', '109', '101', '108', '110', 'test locate');
INSERT INTO `test_record` VALUES ('394', '10:bf:48:ec:7c:e3', '2013-08-29 13:50:39', '101', '106', '109', '101', '108', '110', 'test locate');
INSERT INTO `test_record` VALUES ('395', '10:bf:48:ec:7c:e3', '2013-08-29 13:50:46', '101', '106', '109', '101', '102', '104', 'test locate');
INSERT INTO `test_record` VALUES ('396', '10:bf:48:ec:7c:e3', '2013-08-29 13:50:51', '101', '106', '109', '101', '102', '104', 'test locate');
INSERT INTO `test_record` VALUES ('397', '10:bf:48:ec:7c:e3', '2013-08-29 13:51:31', '101', '106', '109', '101', '106', '108', 'test locate');
INSERT INTO `test_record` VALUES ('398', '10:bf:48:ec:7c:e3', '2013-08-29 13:52:26', '101', '114', '117', '101', '115', '117', 'test locate');
INSERT INTO `test_record` VALUES ('399', '10:bf:48:ec:7c:e3', '2013-08-29 13:52:53', '101', '114', '117', '101', '115', '117', 'test locate');
INSERT INTO `test_record` VALUES ('400', '10:bf:48:ec:7c:e3', '2013-08-29 13:52:59', '101', '114', '117', '101', '104', '108', 'test locate');
INSERT INTO `test_record` VALUES ('401', '10:bf:48:ec:7c:e3', '2013-08-29 13:53:06', '101', '114', '117', '101', '116', '119', 'test locate');
INSERT INTO `test_record` VALUES ('402', '10:bf:48:ec:7c:e3', '2013-08-29 13:53:36', '101', '112', '111', '101', '112', '110', 'test locate');
INSERT INTO `test_record` VALUES ('403', '10:bf:48:ec:7c:e3', '2013-08-29 13:53:41', '101', '112', '111', '101', '112', '110', 'test locate');
INSERT INTO `test_record` VALUES ('404', '10:bf:48:ec:7c:e3', '2013-08-29 13:54:20', '101', '112', '111', '101', '108', '111', 'test locate');
INSERT INTO `test_record` VALUES ('405', '10:bf:48:ec:7c:e3', '2013-08-29 13:54:27', '101', '112', '111', '101', '112', '110', 'test locate');
INSERT INTO `test_record` VALUES ('406', '10:bf:48:ec:7c:e3', '2013-08-29 13:54:59', '101', '105', '103', '101', '107', '101', 'test locate');
INSERT INTO `test_record` VALUES ('407', '10:bf:48:ec:7c:e3', '2013-08-29 13:55:05', '101', '105', '103', '101', '109', '104', 'test locate');
INSERT INTO `test_record` VALUES ('408', '10:bf:48:ec:7c:e3', '2013-08-29 13:55:12', '101', '105', '103', '101', '106', '107', 'test locate');
INSERT INTO `test_record` VALUES ('409', '10:bf:48:ec:7c:e3', '2013-08-29 13:55:19', '101', '105', '103', '101', '102', '104', 'test locate');
INSERT INTO `test_record` VALUES ('410', '10:bf:48:ec:7c:e3', '2013-08-29 13:59:33', '101', '122', '44', '101', '125', '45', 'test locate');
INSERT INTO `test_record` VALUES ('411', '10:bf:48:ec:7c:e3', '2013-08-29 14:00:15', '101', '122', '44', '101', '125', '45', 'test locate');
INSERT INTO `test_record` VALUES ('412', '10:bf:48:ec:7c:e3', '2013-08-29 14:00:27', '101', '122', '44', '101', '119', '46', 'test locate');
INSERT INTO `test_record` VALUES ('413', '10:bf:48:ec:7c:e3', '2013-08-29 14:00:50', '101', '122', '44', '101', '132', '45', 'test locate');
INSERT INTO `test_record` VALUES ('414', '10:bf:48:ec:7c:e3', '2013-08-29 14:03:44', '101', '125', '42', '101', '124', '35', 'test locate');
INSERT INTO `test_record` VALUES ('415', '10:bf:48:ec:7c:e3', '2013-08-29 14:03:46', '101', '125', '42', '101', '125', '42', 'test locate 1st');
INSERT INTO `test_record` VALUES ('416', '10:bf:48:ec:7c:e3', '2013-08-29 14:03:51', '101', '125', '42', '101', '125', '37', 'test locate');
INSERT INTO `test_record` VALUES ('417', '10:bf:48:ec:7c:e3', '2013-08-29 14:05:02', '101', '125', '42', '101', '119', '34', 'test locate');
INSERT INTO `test_record` VALUES ('418', '10:bf:48:ec:7c:e3', '2013-08-29 14:05:10', '101', '125', '42', '101', '123', '41', 'test locate');
INSERT INTO `test_record` VALUES ('419', '10:bf:48:ec:7c:e3', '2013-08-29 14:05:19', '101', '125', '42', '101', '126', '38', 'test locate');
INSERT INTO `test_record` VALUES ('420', '10:bf:48:ec:7c:e3', '2013-08-29 14:05:31', '101', '125', '42', '101', '124', '33', 'test locate');
INSERT INTO `test_record` VALUES ('421', '10:bf:48:ec:7c:e3', '2013-08-29 14:06:44', '101', '118', '32', '101', '121', '31', 'test locate');
INSERT INTO `test_record` VALUES ('422', '10:bf:48:ec:7c:e3', '2013-08-29 14:07:05', '101', '118', '32', '101', '116', '42', 'test locate');
INSERT INTO `test_record` VALUES ('423', '10:bf:48:ec:7c:e3', '2013-08-29 14:07:13', '101', '118', '32', '101', '118', '35', 'test locate');
INSERT INTO `test_record` VALUES ('424', '10:bf:48:ec:7c:e3', '2013-08-29 14:07:39', '101', '118', '32', '101', '118', '35', 'test locate');
INSERT INTO `test_record` VALUES ('425', '10:bf:48:ec:7c:e3', '2013-08-29 14:08:21', '101', '120', '30', '101', '122', '31', 'test locate');
INSERT INTO `test_record` VALUES ('426', '10:bf:48:ec:7c:e3', '2013-08-29 14:09:41', '101', '120', '30', '101', '123', '32', 'test locate');
INSERT INTO `test_record` VALUES ('427', '10:bf:48:ec:7c:e3', '2013-08-29 14:09:57', '101', '120', '30', '101', '125', '41', 'test locate');
INSERT INTO `test_record` VALUES ('428', '10:bf:48:ec:7c:e3', '2013-08-29 14:10:54', '101', '128', '29', '101', '134', '29', 'test locate');
INSERT INTO `test_record` VALUES ('429', '10:bf:48:ec:7c:e3', '2013-08-29 14:11:16', '101', '128', '29', '101', '124', '33', 'test locate');
INSERT INTO `test_record` VALUES ('430', '10:bf:48:ec:7c:e3', '2013-08-29 14:11:27', '101', '128', '29', '101', '132', '44', 'test locate');
INSERT INTO `test_record` VALUES ('431', '10:bf:48:ec:7c:e3', '2013-08-29 14:11:36', '101', '128', '29', '101', '118', '38', 'test locate');
INSERT INTO `test_record` VALUES ('432', '10:bf:48:ec:7c:e3', '2013-08-29 14:12:11', '101', '132', '29', '101', '134', '34', 'test locate');
INSERT INTO `test_record` VALUES ('433', '10:bf:48:ec:7c:e3', '2013-08-29 14:12:32', '101', '132', '29', '101', '132', '44', 'test locate');
INSERT INTO `test_record` VALUES ('434', '10:bf:48:ec:7c:e3', '2013-08-29 14:12:39', '101', '132', '29', '101', '129', '30', 'test locate');
INSERT INTO `test_record` VALUES ('435', '10:bf:48:ec:7c:e3', '2013-08-29 14:12:45', '101', '132', '29', '101', '129', '30', 'test locate');
INSERT INTO `test_record` VALUES ('436', '10:bf:48:ec:7c:e3', '2013-08-29 14:13:10', '101', '134', '34', '101', '135', '35', 'test locate');
INSERT INTO `test_record` VALUES ('437', '10:bf:48:ec:7c:e3', '2013-08-29 14:13:24', '101', '134', '34', '101', '135', '35', 'test locate');
INSERT INTO `test_record` VALUES ('438', '10:bf:48:ec:7c:e3', '2013-08-29 14:13:31', '101', '134', '34', '101', '135', '35', 'test locate');
INSERT INTO `test_record` VALUES ('439', '10:bf:48:ec:7c:e3', '2013-08-29 14:13:42', '101', '134', '34', '101', '135', '35', 'test locate');
INSERT INTO `test_record` VALUES ('440', '10:bf:48:ec:7c:e3', '2013-08-29 14:14:32', '101', '134', '39', '101', '134', '39', 'test locate 1st');
INSERT INTO `test_record` VALUES ('441', '10:bf:48:ec:7c:e3', '2013-08-29 14:14:41', '101', '134', '39', '101', '132', '45', 'test locate');
INSERT INTO `test_record` VALUES ('442', '10:bf:48:ec:7c:e3', '2013-08-29 14:14:50', '101', '134', '39', '101', '133', '42', 'test locate');
INSERT INTO `test_record` VALUES ('443', '10:bf:48:ec:7c:e3', '2013-08-29 14:14:59', '101', '134', '39', '101', '134', '42', 'test locate');
INSERT INTO `test_record` VALUES ('444', '10:bf:48:ec:7c:e3', '2013-08-29 14:17:39', '101', '129', '46', '101', '129', '46', 'test locate 1st');
INSERT INTO `test_record` VALUES ('445', '10:bf:48:ec:7c:e3', '2013-08-29 14:17:45', '101', '129', '46', '101', '130', '44', 'test locate');
INSERT INTO `test_record` VALUES ('446', '10:bf:48:ec:7c:e3', '2013-08-29 14:18:40', '101', '129', '46', '101', '130', '44', 'test locate');
INSERT INTO `test_record` VALUES ('447', '10:bf:48:ec:7c:e3', '2013-08-29 14:18:55', '101', '129', '46', '101', '132', '44', 'test locate');
INSERT INTO `test_record` VALUES ('448', '10:bf:48:ec:7c:e3', '2013-08-29 14:19:54', '101', '125', '55', '101', '125', '55', 'test locate 1st');
INSERT INTO `test_record` VALUES ('449', '10:bf:48:ec:7c:e3', '2013-08-29 14:21:56', '101', '127', '41', '101', '125', '43', 'test locate');
INSERT INTO `test_record` VALUES ('450', '10:bf:48:ec:7c:e3', '2013-08-29 14:31:26', '101', '127', '42', '101', '118', '42', 'test locate');
INSERT INTO `test_record` VALUES ('451', '10:bf:48:ec:7c:e3', '2013-08-29 14:31:32', '101', '127', '42', '101', '127', '42', 'test locate 1st');
INSERT INTO `test_record` VALUES ('452', '10:bf:48:ec:7c:e3', '2013-08-29 14:40:37', '101', '122', '38', '101', '126', '44', 'test locate');
INSERT INTO `test_record` VALUES ('453', '10:bf:48:ec:7c:e3', '2013-08-29 14:40:45', '101', '122', '38', '101', '122', '42', 'test locate');
INSERT INTO `test_record` VALUES ('454', '10:bf:48:ec:7c:e3', '2013-08-29 14:40:52', '101', '122', '38', '101', '126', '38', 'test locate');
INSERT INTO `test_record` VALUES ('455', '10:bf:48:ec:7c:e3', '2013-08-29 14:41:00', '101', '122', '38', '101', '121', '39', 'test locate');
INSERT INTO `test_record` VALUES ('456', '10:bf:48:ec:7c:e3', '2013-08-29 14:41:24', '101', '120', '36', '101', '129', '46', 'test locate');
INSERT INTO `test_record` VALUES ('457', '10:bf:48:ec:7c:e3', '2013-08-29 14:41:31', '101', '120', '36', '101', '119', '46', 'test locate');
INSERT INTO `test_record` VALUES ('458', '10:bf:48:ec:7c:e3', '2013-08-29 14:41:46', '101', '120', '36', '101', '125', '41', 'test locate');
INSERT INTO `test_record` VALUES ('459', '10:bf:48:ec:7c:e3', '2013-08-29 14:41:53', '101', '120', '36', '101', '119', '44', 'test locate');
INSERT INTO `test_record` VALUES ('460', '10:bf:48:ec:7c:e3', '2013-08-29 14:43:17', '101', '130', '31', '101', '130', '31', 'test locate 1st');
INSERT INTO `test_record` VALUES ('461', '10:bf:48:ec:7c:e3', '2013-08-29 14:44:10', '101', '124', '43', '101', '129', '46', 'test locate');
INSERT INTO `test_record` VALUES ('462', '10:bf:48:ec:7c:e3', '2013-08-29 14:44:18', '101', '124', '43', '101', '119', '46', 'test locate');
INSERT INTO `test_record` VALUES ('463', '10:bf:48:ec:7c:e3', '2013-08-29 14:44:25', '101', '124', '43', '101', '118', '40', 'test locate');
INSERT INTO `test_record` VALUES ('464', '10:bf:48:ec:7c:e3', '2013-08-29 14:44:31', '101', '124', '43', '101', '125', '41', 'test locate');
INSERT INTO `test_record` VALUES ('465', '10:bf:48:ec:7c:e3', '2013-08-29 14:51:10', '101', '49', '127', '101', '49', '127', 'test locate 1st');
INSERT INTO `test_record` VALUES ('466', '10:bf:48:ec:7c:e3', '2013-08-29 14:51:19', '101', '49', '127', '101', '51', '127', 'test locate');
INSERT INTO `test_record` VALUES ('467', '10:bf:48:ec:7c:e3', '2013-08-29 14:51:33', '101', '49', '127', '101', '51', '127', 'test locate');
INSERT INTO `test_record` VALUES ('468', '10:bf:48:ec:7c:e3', '2013-08-29 14:51:47', '101', '49', '127', '101', '49', '126', 'test locate');
INSERT INTO `test_record` VALUES ('469', '10:bf:48:ec:7c:e3', '2013-08-29 14:52:24', '101', '44', '127', '101', '44', '126', 'test locate');
INSERT INTO `test_record` VALUES ('470', '10:bf:48:ec:7c:e3', '2013-08-29 14:52:31', '101', '44', '127', '101', '46', '123', 'test locate');
INSERT INTO `test_record` VALUES ('471', '10:bf:48:ec:7c:e3', '2013-08-29 14:52:37', '101', '44', '127', '101', '41', '127', 'test locate');
INSERT INTO `test_record` VALUES ('472', '10:bf:48:ec:7c:e3', '2013-08-29 14:52:58', '101', '44', '127', '101', '51', '127', 'test locate');
INSERT INTO `test_record` VALUES ('473', '10:bf:48:ec:7c:e3', '2013-08-29 14:53:30', '101', '37', '127', '101', '36', '128', 'test locate');
INSERT INTO `test_record` VALUES ('474', '10:bf:48:ec:7c:e3', '2013-08-29 14:53:38', '101', '37', '127', '101', '38', '114', 'test locate');
INSERT INTO `test_record` VALUES ('475', '10:bf:48:ec:7c:e3', '2013-08-29 14:53:46', '101', '37', '127', '101', '40', '127', 'test locate');
INSERT INTO `test_record` VALUES ('476', '10:bf:48:ec:7c:e3', '2013-08-29 14:54:00', '101', '37', '127', '101', '36', '128', 'test locate');
INSERT INTO `test_record` VALUES ('477', '10:bf:48:ec:7c:e3', '2013-08-29 14:54:21', '101', '31', '127', '101', '29', '127', 'test locate');
INSERT INTO `test_record` VALUES ('478', '10:bf:48:ec:7c:e3', '2013-08-29 14:54:29', '101', '31', '127', '101', '29', '126', 'test locate');
INSERT INTO `test_record` VALUES ('479', '10:bf:48:ec:7c:e3', '2013-08-29 14:54:46', '101', '31', '127', '101', '41', '128', 'test locate');
INSERT INTO `test_record` VALUES ('480', '10:bf:48:ec:7c:e3', '2013-08-29 14:55:00', '101', '31', '127', '101', '29', '125', 'test locate');
INSERT INTO `test_record` VALUES ('481', '10:bf:48:ec:7c:e3', '2013-08-29 14:55:36', '101', '28', '123', '101', '26', '121', 'test locate');
INSERT INTO `test_record` VALUES ('482', '10:bf:48:ec:7c:e3', '2013-08-29 14:55:44', '101', '28', '123', '101', '12', '124', 'test locate');
INSERT INTO `test_record` VALUES ('483', '10:bf:48:ec:7c:e3', '2013-08-29 14:56:11', '101', '28', '123', '101', '29', '125', 'test locate');
INSERT INTO `test_record` VALUES ('484', '10:bf:48:ec:7c:e3', '2013-08-29 14:56:58', '101', '28', '123', '101', '23', '120', 'test locate');
INSERT INTO `test_record` VALUES ('485', '10:bf:48:ec:7c:e3', '2013-08-29 14:57:54', '101', '28', '119', '101', '31', '121', 'test locate');
INSERT INTO `test_record` VALUES ('486', '10:bf:48:ec:7c:e3', '2013-08-29 14:57:59', '101', '28', '119', '101', '28', '117', 'test locate');
INSERT INTO `test_record` VALUES ('487', '10:bf:48:ec:7c:e3', '2013-08-29 14:58:05', '101', '28', '119', '101', '29', '117', 'test locate');
INSERT INTO `test_record` VALUES ('488', '10:bf:48:ec:7c:e3', '2013-08-29 14:58:20', '101', '28', '119', '101', '27', '112', 'test locate');
INSERT INTO `test_record` VALUES ('489', '10:bf:48:ec:7c:e3', '2013-08-29 14:58:55', '101', '23', '119', '101', '17', '117', 'test locate');
INSERT INTO `test_record` VALUES ('490', '10:bf:48:ec:7c:e3', '2013-08-29 14:59:17', '101', '23', '119', '101', '18', '120', 'test locate');
INSERT INTO `test_record` VALUES ('491', '10:bf:48:ec:7c:e3', '2013-08-29 14:59:32', '101', '23', '119', '101', '24', '118', 'test locate');
INSERT INTO `test_record` VALUES ('492', '10:bf:48:ec:7c:e3', '2013-08-29 14:59:44', '101', '23', '119', '101', '16', '122', 'test locate');
INSERT INTO `test_record` VALUES ('493', '10:bf:48:ec:7c:e3', '2013-08-29 15:00:26', '101', '17', '119', '101', '23', '117', 'test locate');
INSERT INTO `test_record` VALUES ('494', '10:bf:48:ec:7c:e3', '2013-08-29 15:00:48', '101', '17', '119', '101', '19', '120', 'test locate');
INSERT INTO `test_record` VALUES ('495', '10:bf:48:ec:7c:e3', '2013-08-29 15:00:59', '101', '17', '119', '101', '17', '118', 'test locate');
INSERT INTO `test_record` VALUES ('496', '10:bf:48:ec:7c:e3', '2013-08-29 15:01:11', '101', '17', '119', '101', '19', '120', 'test locate');
INSERT INTO `test_record` VALUES ('497', '10:bf:48:ec:7c:e3', '2013-08-29 15:02:34', '101', '31', '113', '101', '35', '110', 'test locate');
INSERT INTO `test_record` VALUES ('498', '10:bf:48:ec:7c:e3', '2013-08-29 15:03:05', '101', '31', '113', '101', '33', '126', 'test locate');
INSERT INTO `test_record` VALUES ('499', '10:bf:48:ec:7c:e3', '2013-08-29 15:03:16', '101', '31', '113', '101', '29', '112', 'test locate');
INSERT INTO `test_record` VALUES ('500', '10:bf:48:ec:7c:e3', '2013-08-29 15:03:25', '101', '31', '113', '101', '30', '114', 'test locate');
INSERT INTO `test_record` VALUES ('501', '10:bf:48:ec:7c:e3', '2013-08-29 15:04:37', '101', '42', '112', '101', '44', '112', 'test locate');
INSERT INTO `test_record` VALUES ('502', '10:bf:48:ec:7c:e3', '2013-08-29 15:04:45', '101', '42', '112', '101', '40', '115', 'test locate');
INSERT INTO `test_record` VALUES ('503', '10:bf:48:ec:7c:e3', '2013-08-29 15:04:54', '101', '42', '112', '101', '40', '115', 'test locate');
INSERT INTO `test_record` VALUES ('504', '10:bf:48:ec:7c:e3', '2013-08-29 15:05:35', '101', '42', '112', '101', '38', '114', 'test locate');
INSERT INTO `test_record` VALUES ('505', '10:bf:48:ec:7c:e3', '2013-08-29 15:06:18', '101', '48', '117', '101', '47', '115', 'test locate');
INSERT INTO `test_record` VALUES ('506', '10:bf:48:ec:7c:e3', '2013-08-29 15:06:23', '101', '48', '117', '101', '47', '116', 'test locate');
INSERT INTO `test_record` VALUES ('507', '10:bf:48:ec:7c:e3', '2013-08-29 15:06:29', '101', '48', '117', '101', '48', '119', 'test locate');
INSERT INTO `test_record` VALUES ('508', '10:bf:48:ec:7c:e3', '2013-08-29 15:06:45', '101', '48', '117', '101', '46', '120', 'test locate');
INSERT INTO `test_record` VALUES ('509', '10:bf:48:ec:7c:e3', '2013-08-29 15:07:29', '101', '48', '123', '101', '51', '127', 'test locate');
INSERT INTO `test_record` VALUES ('510', '10:bf:48:ec:7c:e3', '2013-08-29 15:07:45', '101', '48', '123', '101', '51', '127', 'test locate');
INSERT INTO `test_record` VALUES ('511', '10:bf:48:ec:7c:e3', '2013-08-29 15:07:52', '101', '48', '123', '101', '51', '127', 'test locate');
INSERT INTO `test_record` VALUES ('512', '10:bf:48:ec:7c:e3', '2013-08-29 15:07:58', '101', '48', '123', '101', '49', '121', 'test locate');
INSERT INTO `test_record` VALUES ('513', 'a0:0b:ba:ba:12:84', '2013-08-29 15:09:54', '101', '30', '126', '101', '29', '125', 'test locate');
INSERT INTO `test_record` VALUES ('514', 'a0:0b:ba:ba:12:84', '2013-08-29 15:10:10', '101', '30', '126', '101', '29', '125', 'test locate');
INSERT INTO `test_record` VALUES ('515', 'a0:0b:ba:ba:12:84', '2013-08-29 15:10:18', '101', '30', '126', '101', '29', '125', 'test locate');
INSERT INTO `test_record` VALUES ('516', 'a0:0b:ba:ba:12:84', '2013-08-29 15:10:24', '101', '30', '126', '101', '29', '126', 'test locate');
INSERT INTO `test_record` VALUES ('517', 'a0:0b:ba:ba:12:84', '2013-08-29 15:11:13', '101', '37', '127', '101', '16', '125', 'test locate');
INSERT INTO `test_record` VALUES ('518', 'a0:0b:ba:ba:12:84', '2013-08-29 15:11:30', '101', '37', '127', '101', '19', '116', 'test locate');
INSERT INTO `test_record` VALUES ('519', 'a0:0b:ba:ba:12:84', '2013-08-29 15:11:49', '101', '18', '124', '101', '24', '116', 'test locate');
INSERT INTO `test_record` VALUES ('520', 'a0:0b:ba:ba:12:84', '2013-08-29 15:12:00', '101', '18', '124', '101', '19', '116', 'test locate');
INSERT INTO `test_record` VALUES ('521', 'a0:0b:ba:ba:12:84', '2013-08-29 15:12:07', '101', '18', '124', '101', '19', '116', 'test locate');
INSERT INTO `test_record` VALUES ('522', 'a0:0b:ba:ba:12:84', '2013-08-29 15:12:13', '101', '18', '124', '101', '19', '116', 'test locate');
INSERT INTO `test_record` VALUES ('523', 'a0:0b:ba:ba:12:84', '2013-08-29 15:12:26', '101', '18', '121', '101', '13', '122', 'test locate');
INSERT INTO `test_record` VALUES ('524', 'a0:0b:ba:ba:12:84', '2013-08-29 15:12:33', '101', '18', '121', '101', '19', '116', 'test locate');
INSERT INTO `test_record` VALUES ('525', 'a0:0b:ba:ba:12:84', '2013-08-29 15:12:58', '101', '18', '121', '101', '19', '116', 'test locate');
INSERT INTO `test_record` VALUES ('526', 'a0:0b:ba:ba:12:84', '2013-08-29 15:13:01', '101', '18', '121', '101', '16', '117', 'test locate');
INSERT INTO `test_record` VALUES ('527', 'a0:0b:ba:ba:12:84', '2013-08-29 15:13:20', '101', '18', '117', '101', '15', '123', 'test locate');
INSERT INTO `test_record` VALUES ('528', 'a0:0b:ba:ba:12:84', '2013-08-29 15:13:27', '101', '18', '117', '101', '16', '120', 'test locate');
INSERT INTO `test_record` VALUES ('529', 'a0:0b:ba:ba:12:84', '2013-08-29 15:13:33', '101', '18', '117', '101', '18', '125', 'test locate');
INSERT INTO `test_record` VALUES ('530', 'a0:0b:ba:ba:12:84', '2013-08-29 15:13:38', '101', '18', '117', '101', '16', '116', 'test locate');
INSERT INTO `test_record` VALUES ('531', 'a0:0b:ba:ba:12:84', '2013-08-29 15:14:14', '101', '27', '120', '101', '23', '125', 'test locate');
INSERT INTO `test_record` VALUES ('532', 'a0:0b:ba:ba:12:84', '2013-08-29 15:14:21', '101', '27', '120', '101', '23', '125', 'test locate');
INSERT INTO `test_record` VALUES ('533', 'a0:0b:ba:ba:12:84', '2013-08-29 15:14:26', '101', '27', '120', '101', '27', '112', 'test locate');
INSERT INTO `test_record` VALUES ('534', 'a0:0b:ba:ba:12:84', '2013-08-29 15:14:31', '101', '27', '120', '101', '25', '116', 'test locate');
INSERT INTO `test_record` VALUES ('535', 'a0:0b:ba:ba:12:84', '2013-08-29 15:15:20', '101', '38', '111', '101', '41', '115', 'test locate');
INSERT INTO `test_record` VALUES ('536', 'a0:0b:ba:ba:12:84', '2013-08-29 15:15:35', '101', '38', '111', '101', '40', '115', 'test locate');
INSERT INTO `test_record` VALUES ('537', 'a0:0b:ba:ba:12:84', '2013-08-29 15:15:44', '101', '38', '111', '101', '40', '109', 'test locate');
INSERT INTO `test_record` VALUES ('538', 'a0:0b:ba:ba:12:84', '2013-08-29 15:15:52', '101', '38', '111', '101', '40', '109', 'test locate');
INSERT INTO `test_record` VALUES ('539', 'a0:0b:ba:ba:12:84', '2013-08-29 15:16:23', '101', '47', '117', '101', '49', '115', 'test locate');
INSERT INTO `test_record` VALUES ('540', 'a0:0b:ba:ba:12:84', '2013-08-29 15:16:33', '101', '47', '117', '101', '49', '118', 'test locate');
INSERT INTO `test_record` VALUES ('541', 'a0:0b:ba:ba:12:84', '2013-08-29 15:16:40', '101', '47', '117', '101', '49', '119', 'test locate');
INSERT INTO `test_record` VALUES ('542', 'a0:0b:ba:ba:12:84', '2013-08-29 15:16:49', '101', '47', '117', '101', '44', '113', 'test locate');
INSERT INTO `test_record` VALUES ('543', '04:46:65:7D:F0:C9', '2013-08-30 14:40:59', '15', '9', '12', '15', '11', '9', 'test locate 1st');
INSERT INTO `test_record` VALUES ('544', '04:46:65:7D:F0:C9', '2013-08-30 14:41:33', '15', '9', '12', '15', '3', '9', 'test locate 1st');
INSERT INTO `test_record` VALUES ('545', '04:46:65:7D:F0:C9', '2013-08-30 14:50:23', '15', '9', '12', '15', '8', '11', 'test locate 1st');
INSERT INTO `test_record` VALUES ('546', '04:46:65:7D:F0:C9', '2013-08-30 15:00:45', '15', '10', '6', '15', '10', '6', 'test locate 1st');
INSERT INTO `test_record` VALUES ('547', 'ac:f7:f3:5b:21:96', '2013-09-01 18:29:32', '101', '114', '118', '101', '115', '117', 'test locate');
INSERT INTO `test_record` VALUES ('548', 'ac:f7:f3:5b:21:96', '2013-09-01 18:29:37', '101', '114', '118', '101', '115', '117', 'test locate');
INSERT INTO `test_record` VALUES ('549', 'ac:f7:f3:5b:21:96', '2013-09-01 18:29:58', '101', '113', '115', '101', '111', '114', 'test locate');
INSERT INTO `test_record` VALUES ('550', 'ac:f7:f3:5b:21:96', '2013-09-01 18:30:21', '101', '110', '112', '101', '111', '113', 'test locate');
INSERT INTO `test_record` VALUES ('551', '68:df:dd:8b:79:ed', '2014-03-04 10:49:34', '2', '22', '50', '2', '22', '50', 'test collect 1st');
INSERT INTO `test_record` VALUES ('552', '68:df:dd:8b:79:ed', '2014-03-04 10:49:34', '2', '22', '50', '2', '22', '50', 'test collect 1st');
INSERT INTO `test_record` VALUES ('553', '68:df:dd:8b:79:ed', '2014-03-04 10:49:34', '2', '22', '50', '2', '22', '50', 'test collect 1st');
INSERT INTO `test_record` VALUES ('554', '68:df:dd:8b:79:ed', '2014-03-04 10:57:00', '2', '20', '45', '2', '22', '50', 'test locate 1st');
INSERT INTO `test_record` VALUES ('555', '68:df:dd:8b:79:ed', '2014-03-04 10:57:00', '2', '20', '45', '2', '20', '45', 'test locate 1st');
INSERT INTO `test_record` VALUES ('556', '68:df:dd:8b:79:ed', '2014-03-04 10:57:00', '2', '20', '45', '2', '20', '45', 'test locate 1st');

-- ----------------------------
-- Table structure for traces
-- ----------------------------
DROP TABLE IF EXISTS `traces`;
CREATE TABLE `traces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_signal` varchar(255) DEFAULT NULL,
  `device_mac` varchar(255) DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of traces
-- ----------------------------

-- ----------------------------
-- Table structure for triangle_area
-- ----------------------------
DROP TABLE IF EXISTS `triangle_area`;
CREATE TABLE `triangle_area` (
  `ID` int(11) NOT NULL,
  `A_ColID` int(11) DEFAULT NULL COMMENT 'Col ID for Vertex A',
  `A_RowID` int(11) DEFAULT NULL COMMENT 'Row ID for vertex A',
  `B_ColID` int(11) DEFAULT NULL COMMENT 'Col ID for vertex B',
  `B_RowID` int(11) DEFAULT NULL COMMENT 'Row ID for vertex B',
  `C_ColID` int(11) DEFAULT NULL COMMENT 'Col ID for vertex C',
  `C_RowID` int(11) DEFAULT NULL COMMENT 'Row ID for vertex C',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of triangle_area
-- ----------------------------

-- ----------------------------
-- Table structure for tuner
-- ----------------------------
DROP TABLE IF EXISTS `tuner`;
CREATE TABLE `tuner` (
  `Name` varchar(100) NOT NULL,
  `DBM_LINEAR_AVERAGE` varchar(5) DEFAULT NULL,
  `LOGGER_FILE` varchar(100) DEFAULT NULL,
  `Database_Server` varchar(45) DEFAULT NULL,
  `pilot_power_threshold` float DEFAULT NULL,
  `mse_threshold` varchar(45) DEFAULT NULL,
  `mse_ref_threshold` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Name`),
  UNIQUE KEY `Name_UNIQUE` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Save all configurations';

-- ----------------------------
-- Records of tuner
-- ----------------------------
INSERT INTO `tuner` VALUES ('CURRENT', 'true', '\\\\ev2c4138b15c2b\\A_Paddy\\wifiipsserver\\wifiipsserver.log', 'ev2c4138b15c2b', '15', '1.0', '30.0');
INSERT INTO `tuner` VALUES ('HISTORY1374032773202', 'true', '\\\\\\\\ev2c4138b15c2b\\\\A_Paddy\\\\wifiipsserver\\\\wifiipsserver.log', 'ev2c4138b15c2b', '15', '1.0', '30.0');
INSERT INTO `tuner` VALUES ('HISTORY1374032794887', 'true', '\\\\\\\\ev2c4138b15c2b\\\\A_Paddy\\\\wifiipsserver\\\\wifiipsserver.log', 'ev2c4138b15c2b', '15', '1.0', '20.0');
INSERT INTO `tuner` VALUES ('HISTORY1374033615535', 'true', '\\\\\\\\ev2c4138b15c2b\\\\A_Paddy\\\\wifiipsserver\\\\wifiipsserver.log', 'ev2c4138b15c2b', '15', '1.0', '30.0');
INSERT INTO `tuner` VALUES ('HISTORY1374034206987', 'true', '\\\\ev2c4138b15c2b\\A_Paddy\\wifiipsserver\\wifiipsserver.log', 'ev2c4138b15c2b', '15', '1.0', '30.0');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `address_id` smallint(5) unsigned DEFAULT NULL,
  `picture` blob,
  `email` varchar(50) NOT NULL,
  `enabled` tinyint(1) DEFAULT '1',
  `account_expired` tinyint(1) DEFAULT '0',
  `credentials_expired` tinyint(1) DEFAULT '0',
  `locked` tinyint(1) DEFAULT '0',
  `username` varchar(45) NOT NULL,
  `password` varchar(20) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `ID_UNIQUE` (`user_id`),
  KEY `fk_user_address_idx` (`address_id`),
  CONSTRAINT `fk_user_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'Paddy', 'Liu', '606', null, 'paddy.liu@ericsson.com', '1', '0', '0', '0', 'paddy', 'paddy', null, '2013-09-11 00:00:00', '2013-09-23 00:26:10');
INSERT INTO `users` VALUES ('2', 'Geoffrey', 'Chen', '606', null, 'geoffrey.chen@ericsson.com', '1', '0', '0', '0', 'geo', 'geo', null, '2013-09-11 00:00:00', '2013-09-23 00:26:10');
INSERT INTO `users` VALUES ('3', 'Haley', 'Shi', '607', null, 'haley.shi@ericsson.com', '1', '0', '0', '0', 'haley', 'haley', null, '2013-09-11 00:00:00', '2013-09-23 00:26:10');
INSERT INTO `users` VALUES ('4', 'Larry', 'Huang', '607', null, 'larry.huang@ericsson.com', '1', '0', '0', '0', 'larry', 'larry', null, '2013-09-11 00:00:00', '2013-09-23 00:26:10');
INSERT INTO `users` VALUES ('5', 'Elvis', 'Li', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis', 'elvis', null, '2013-09-11 00:00:00', '2013-09-23 00:26:10');
INSERT INTO `users` VALUES ('6', 'Elvis', 'Liu', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis1', 'elvis', null, '2013-09-11 00:00:00', '2013-09-25 17:24:56');
INSERT INTO `users` VALUES ('7', 'Elvis', 'Wang', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis2', 'elvis', null, '2013-09-11 00:00:00', '2013-09-25 17:24:56');
INSERT INTO `users` VALUES ('8', 'Elvis', 'Chen', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis3', 'elvis', null, '2013-09-11 00:00:00', '2013-09-25 17:24:56');
INSERT INTO `users` VALUES ('9', 'Elvis', 'Zhang', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis4', 'elvis', null, '2013-09-11 00:00:00', '2013-09-25 17:24:56');
INSERT INTO `users` VALUES ('10', 'Elvis', 'Fu', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis5', 'elvis', null, '2013-09-11 00:00:00', '2013-09-25 17:24:56');
INSERT INTO `users` VALUES ('11', 'Elvis', 'Zha', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis6', 'elvis', null, '2013-09-11 00:00:00', '2013-09-25 17:24:56');
INSERT INTO `users` VALUES ('12', 'Elvis', 'Zhu', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis7', 'elvis', null, '2013-09-11 00:00:00', '2013-09-25 17:24:56');
INSERT INTO `users` VALUES ('13', 'Elvis', 'Xia', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis8', 'elvis', null, '2013-09-11 00:00:00', '2013-09-25 17:24:56');
INSERT INTO `users` VALUES ('14', 'Elvis', 'Lei', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis9', 'elvis', null, '2013-09-11 00:00:00', '2013-09-25 17:24:56');
INSERT INTO `users` VALUES ('15', 'Elvis', 'Tong', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis10', 'elvis', null, '2013-09-11 00:00:00', '2013-09-25 17:24:56');
INSERT INTO `users` VALUES ('16', 'Elvis', 'Wu', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis11', 'elvis', null, '2013-09-11 00:00:00', '2013-09-25 17:24:56');
INSERT INTO `users` VALUES ('17', 'Elvis', 'Bai', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis12', 'elvis', null, '2013-09-11 00:00:00', '2013-09-25 17:52:27');
INSERT INTO `users` VALUES ('18', 'Elvis', 'Xie', '608', null, 'elvis.li@ericsson.com', '1', '0', '0', '0', 'elvis13', 'elvis', null, '2013-09-11 00:00:00', '2013-09-25 18:21:06');

-- ----------------------------
-- Table structure for user_relationship
-- ----------------------------
DROP TABLE IF EXISTS `user_relationship`;
CREATE TABLE `user_relationship` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) DEFAULT NULL,
  `friendName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_relationship
-- ----------------------------

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `user_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(9) DEFAULT NULL,
  `role_id` tinyint(4) DEFAULT NULL,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_role_id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `fk_role_id_idx` (`role_id`),
  CONSTRAINT `fk_user_role_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_role_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('1', '1', '1', '2013-09-23 00:27:58');
INSERT INTO `user_role` VALUES ('2', '2', '2', '2013-09-23 00:27:58');
INSERT INTO `user_role` VALUES ('3', '3', '1', '2013-10-16 07:36:12');
INSERT INTO `user_role` VALUES ('4', '4', '2', '2013-09-23 00:27:58');
INSERT INTO `user_role` VALUES ('5', '5', '2', '2013-09-23 00:27:58');
INSERT INTO `user_role` VALUES ('6', '1', '2', '2013-09-23 17:48:56');
INSERT INTO `user_role` VALUES ('7', '3', '2', '2013-10-16 07:39:53');

-- ----------------------------
-- Table structure for version
-- ----------------------------
DROP TABLE IF EXISTS `version`;
CREATE TABLE `version` (
  `tableName` varchar(255) DEFAULT NULL,
  `version` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of version
-- ----------------------------
INSERT INTO `version` VALUES ('busline', '0');
INSERT INTO `version` VALUES ('festival', '0');
INSERT INTO `version` VALUES ('playhouse', '1');
INSERT INTO `version` VALUES ('poi', '1');
INSERT INTO `version` VALUES ('movie', '0');
INSERT INTO `version` VALUES ('restaurant', '0');
INSERT INTO `version` VALUES ('map', '0');
INSERT INTO `version` VALUES ('navi_node', '0');
INSERT INTO `version` VALUES ('naiv_path', '0');
