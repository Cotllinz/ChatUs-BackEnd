-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.11-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for chatus_database
CREATE DATABASE IF NOT EXISTS `chatus_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `chatus_database`;

-- Dumping structure for table chatus_database.chat_data
CREATE TABLE IF NOT EXISTS `chat_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(20) DEFAULT NULL,
  `idChat_sender` int(20) DEFAULT NULL,
  `idChat_recaiver` int(20) DEFAULT NULL,
  `chat_text` text DEFAULT NULL,
  `status_read` enum('Read','Not Read') NOT NULL DEFAULT 'Not Read',
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table chatus_database.chat_data: ~0 rows (approximately)
/*!40000 ALTER TABLE `chat_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_data` ENABLE KEYS */;

-- Dumping structure for table chatus_database.friend_list
CREATE TABLE IF NOT EXISTS `friend_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_idRequest` int(11) DEFAULT NULL,
  `user_idResponse` int(11) DEFAULT NULL,
  `friend_status` enum('Accept','Waiting') NOT NULL DEFAULT 'Waiting',
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table chatus_database.friend_list: ~0 rows (approximately)
/*!40000 ALTER TABLE `friend_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend_list` ENABLE KEYS */;

-- Dumping structure for table chatus_database.room_list
CREATE TABLE IF NOT EXISTS `room_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(20) DEFAULT NULL,
  `id_sender` int(11) DEFAULT NULL,
  `id_receiver` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table chatus_database.room_list: ~0 rows (approximately)
/*!40000 ALTER TABLE `room_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `room_list` ENABLE KEYS */;

-- Dumping structure for table chatus_database.user_account
CREATE TABLE IF NOT EXISTS `user_account` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `fullname` varchar(150) NOT NULL DEFAULT '',
  `user_email` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `phone_number` varchar(50) NOT NULL DEFAULT '',
  `bio` varchar(150) NOT NULL DEFAULT '',
  `image_user` varchar(150) DEFAULT NULL,
  `lat` varchar(150) NOT NULL DEFAULT '',
  `long` varchar(150) NOT NULL DEFAULT '',
  `login_date` datetime DEFAULT NULL,
  `token_confirmemail` varchar(100) NOT NULL DEFAULT '',
  `token_forgotpassword` varchar(100) NOT NULL DEFAULT '',
  `status_user` enum('Active','Not Active') NOT NULL DEFAULT 'Not Active',
  `create_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table chatus_database.user_account: ~6 rows (approximately)
/*!40000 ALTER TABLE `user_account` DISABLE KEYS */;
INSERT INTO `user_account` (`id_user`, `username`, `fullname`, `user_email`, `password`, `phone_number`, `bio`, `image_user`, `lat`, `long`, `login_date`, `token_confirmemail`, `token_forgotpassword`, `status_user`, `create_at`, `update_at`) VALUES
	(1, 'Galeh', 'Rudy Galeh', 'co.tlinz121@gmail.com', '$2b$10$4dqH.xApoIaHnmckBGPHI.IeMMrNAKYwjE8bKRQi6hqg7yd27wTqK', '082350775250', 'Founder Chat.Us', '2021-01-26T03-11-24.422Zindex.jpg', '-1.1988807', '116.88636590000002', '0000-00-00 00:00:00', '0d882b32c05a89e5736e06da81f133', '', 'Active', '2021-01-20 19:27:59', '2021-02-20 13:23:06'),
	(2, 'Fullan', 'Coba FullName', 'asdq131@gmail.com', '$2b$10$z6XxaQYFtnern9SnSKqgS.cUiLqctZwNKXEgxZNShqbEYWqMDqqtC', '08334512345', 'Web Developer', '2021-01-24T14-53-36.270ZD.png', '-1.296720591427085', '116.85797086875', '2021-02-19 12:41:05', '9de6c0dfd5e069d6ea9bd5fa6ba562', '', 'Active', '2021-01-20 20:14:57', '2021-01-24 22:28:09'),
	(3, 'Rosiana Dewi', 'Rosiana', 'rosiana@gmail.com', '$2b$10$z6XxaQYFtnern9SnSKqgS.cUiLqctZwNKXEgxZNShqbEYWqMDqqtC', '083423423413', 'Artist', '2021-01-24T17-45-21.453Zrosiana.jpeg', '6.315298538330085', '23.203125', '2021-02-22 02:26:41', '88b31c6e35e165dcfaee1c4691af69', '', 'Active', '2021-01-21 15:39:48', '2021-01-24 18:18:00'),
	(4, 'Andrawan', 'Andrawan Berawan', 'asdsawq2@gmail.com', '$2b$10$z6XxaQYFtnern9SnSKqgS.cUiLqctZwNKXEgxZNShqbEYWqMDqqtC', '', 'Founder The Jack', '2021-01-25T22-47-06.195ZCIfLNuvW8AAb9z8.jpg', '-1.1987579', '116.88632810000001', '2021-02-19 11:49:53', '9b725141f12198d5b4f90e38febe81', '', 'Active', '2021-01-21 15:42:49', '2021-01-26 00:45:42'),
	(6, 'Rudy Demo', 'Rudy Demo Dulu', 'rdy.galih@gmail.com', '$2b$10$.mzfcrhCQPEIk3vGdol2X.Huio1sPaL9NfSztBQh.pqTSQV/i/luK', '082355324563', 'Founder Chat us', '2021-01-26T05-43-49.638ZBiodataImage.jpeg', '-24.20688962239801', '134.99999999999994', '2021-01-26 05:53:12', '069074b3f984f9bed789fd5c307a1a', '', 'Active', '2021-01-26 05:40:04', '2021-01-26 05:52:59'),
	(7, 'Jimpek', 'Jubastu', 'akanechannn12sw@gmail.com', '$2b$10$jMYTv.W32DDFzC8a9jkN7uZKAiOVJCnxVwk1MmmTsGKri8VyqxJva', '', 'Mantap', '2021-02-22T03-00-20.788Zimages.jpg', '-1.1988439', '116.886354', '2021-02-22 02:25:53', 'a9f3f40c42f2633e857f047b7bf814', '', 'Active', '2021-02-21 07:22:56', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `user_account` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
