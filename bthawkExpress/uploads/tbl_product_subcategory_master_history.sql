-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 18, 2021 at 11:06 AM
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
-- Table structure for table `tbl_product_subcategory_master_history`
--

CREATE TABLE `tbl_product_subcategory_master_history` (
  `history_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `subcategory_name` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL,
  `insert_date` date NOT NULL,
  `insert_time` time NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_product_subcategory_master_history`
--

INSERT INTO `tbl_product_subcategory_master_history` (`history_id`, `subcategory_id`, `category_id`, `subcategory_name`, `status`, `insert_date`, `insert_time`) VALUES
(1, 1, 1, 'LAPU Balance', 'Active', '2019-06-18', '15:37:00'),
(2, 2, 3, 'Jio Balanace', 'Active', '2019-08-14', '16:43:58'),
(3, 5, 4, 'zeeshu', 'Active', '2019-08-14', '16:55:49'),
(4, 1, 2, 'LAPU Balance 1', 'Active', '2019-08-20', '17:41:32'),
(5, 2, 3, 'Jio Balanace', 'Active', '2019-08-21', '13:06:44'),
(6, 2, 3, 'Jio Balanace', 'Active', '2019-08-21', '13:07:01'),
(7, 2, 3, 'Jio Balanace', 'Active', '2019-08-21', '13:29:15'),
(8, 2, 3, 'Jio Balanace', 'Active', '2019-08-28', '11:31:34'),
(9, 14, 9, 'testing', 'Active', '2019-10-21', '15:29:49'),
(10, 13, 9, 'RICE', 'Active', '2019-10-21', '15:30:31'),
(11, 13, 9, 'Mustered oil', 'Active', '2019-10-21', '15:47:44'),
(12, 14, 9, 'testing demo', 'Active', '2019-10-21', '16:12:02'),
(13, 15, 9, 'Wheat', 'Active', '2019-10-21', '16:22:59'),
(14, 12, 8, 'rise', 'Active', '2019-10-22', '15:45:00'),
(15, 5, 4, 'zeeshu', 'Active', '2019-10-24', '10:40:47'),
(16, 6, 4, 'z sir', 'Active', '2019-10-24', '10:41:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_product_subcategory_master_history`
--
ALTER TABLE `tbl_product_subcategory_master_history`
  ADD PRIMARY KEY (`history_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_product_subcategory_master_history`
--
ALTER TABLE `tbl_product_subcategory_master_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
