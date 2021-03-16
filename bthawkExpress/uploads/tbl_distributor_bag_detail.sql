-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 19, 2021 at 11:38 AM
-- Server version: 10.3.27-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appbazar_testbthawk`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_distributor_bag_detail`
--

CREATE TABLE `tbl_distributor_bag_detail` (
  `bag_id` int(11) NOT NULL,
  `distributor_id` int(11) NOT NULL,
  `bag_qty` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Active',
  `insert_datetime` datetime NOT NULL,
  `update_datetime` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_distributor_bag_detail`
--

INSERT INTO `tbl_distributor_bag_detail` (`bag_id`, `distributor_id`, `bag_qty`, `status`, `insert_datetime`, `update_datetime`) VALUES
(1, 12, 25, '1', '2019-12-20 17:29:39', '2020-11-09 18:58:09'),
(2, 12, 5, 'Active', '2019-12-20 17:30:25', '2020-11-11 11:49:47'),
(3, 12, 10, 'Active', '2019-12-20 17:30:33', '2020-06-05 12:36:56'),
(4, 12, 15, 'Active', '2019-12-20 17:30:40', '2020-11-07 14:55:28'),
(5, 12, 20, 'Deactive', '2019-12-20 17:30:47', '2020-01-05 18:39:31'),
(6, 12, 100, 'Active', '2019-12-28 13:31:04', '0000-00-00 00:00:00'),
(7, 12, 30, 'Active', '2020-01-16 15:44:46', '0000-00-00 00:00:00'),
(8, 1338, 5, 'Active', '2020-01-18 15:51:09', '2021-02-18 14:32:06'),
(9, 1338, 10, 'Active', '2020-01-18 15:51:16', '2021-02-18 15:02:01'),
(10, 1338, 15, 'Active', '2020-01-18 15:51:24', '2021-02-18 14:50:54'),
(11, 1, 5, 'Active', '2020-01-22 16:55:19', '0000-00-00 00:00:00'),
(12, 1, 10, 'Active', '2020-01-22 16:55:35', '0000-00-00 00:00:00'),
(13, 1, 20, 'Active', '2020-01-22 16:55:43', '0000-00-00 00:00:00'),
(14, 1, 50, 'Active', '2020-01-22 16:55:51', '2020-11-07 15:03:53'),
(15, 1341, 5, 'Active', '2020-01-24 10:04:26', '0000-00-00 00:00:00'),
(16, 1345, 10, 'Active', '2020-01-31 15:25:00', '0000-00-00 00:00:00'),
(17, 1, 1, 'Active', '2020-11-06 18:06:41', '2020-11-10 12:28:24'),
(18, 1338, 1, 'Active', '2020-11-06 18:09:56', '2021-02-18 14:32:00'),
(25, 1, 2, 'Active', '2020-11-10 12:17:30', '2020-11-10 12:30:07'),
(24, 12, 19, 'Active', '2020-11-10 12:17:15', '0000-00-00 00:00:00'),
(23, 12, 13, 'Inactive', '2020-11-09 14:12:53', '2020-11-09 14:20:01'),
(26, 1, 3, 'Active', '2020-11-10 12:28:52', '2020-11-10 12:32:15'),
(27, 12, 7, 'Active', '2020-11-11 11:49:57', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_distributor_bag_detail`
--
ALTER TABLE `tbl_distributor_bag_detail`
  ADD PRIMARY KEY (`bag_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_distributor_bag_detail`
--
ALTER TABLE `tbl_distributor_bag_detail`
  MODIFY `bag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
