-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2024 at 08:57 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodwastedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `expired`
--

CREATE TABLE `expired` (
  `Exp_ID` int(11) NOT NULL,
  `Price` decimal(8,2) NOT NULL,
  `Inventory_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `User_id` int(11) NOT NULL,
  `Inventory_ID` int(11) NOT NULL,
  `Name_inventory` varchar(25) NOT NULL,
  `Kg_inventory` decimal(8,2) NOT NULL DEFAULT 0.00,
  `Pcs_inventory` int(11) NOT NULL DEFAULT 0,
  `Is_expired` tinyint(1) NOT NULL DEFAULT 0,
  `Is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `Type_ID` int(11) NOT NULL,
  `Price` decimal(8,2) NOT NULL,
  `Expiration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`User_id`, `Inventory_ID`, `Name_inventory`, `Kg_inventory`, `Pcs_inventory`, `Is_expired`, `Is_deleted`, `Type_ID`, `Price`, `Expiration_date`) VALUES
(1000, 1, 'sitaw', 25.50, 0, 0, 0, 3, 54.00, '2023-12-28'),
(1000, 2, 'kalabasa', 0.00, 2, 0, 0, 3, 102.00, '2023-12-21'),
(1000, 5, 'manga', 0.00, 2, 0, 0, 2, 25.00, '2024-01-03');

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `User_id` int(11) NOT NULL,
  `Type_ID` int(11) NOT NULL,
  `Is_perishable` tinyint(1) NOT NULL DEFAULT 0,
  `Type_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`User_id`, `Type_ID`, `Is_perishable`, `Type_name`) VALUES
(1001, 1, 0, 'Vegetable'),
(1000, 2, 1, 'Fruits'),
(1000, 3, 1, 'Vegetable');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `User_id` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`User_id`, `Username`, `Password`) VALUES
(1000, 'admin', 'admin'),
(1001, 'admin2', 'admin2'),
(1002, 'fsdf', 'sdfsdf'),
(1003, 'sdf', 'dsfsd'),
(1004, 'adminsasas', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `waste`
--

CREATE TABLE `waste` (
  `User_id` int(11) NOT NULL,
  `Waste_ID` int(11) NOT NULL,
  `Kg_waste` decimal(8,2) NOT NULL,
  `Pcs_waste` int(11) NOT NULL,
  `Date_waste` date NOT NULL DEFAULT current_timestamp(),
  `Inventory_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `waste`
--

INSERT INTO `waste` (`User_id`, `Waste_ID`, `Kg_waste`, `Pcs_waste`, `Date_waste`, `Inventory_ID`) VALUES
(1000, 2, 25.50, 0, '2023-12-16', 1),
(1000, 3, 0.00, 0, '2023-12-16', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `expired`
--
ALTER TABLE `expired`
  ADD PRIMARY KEY (`Exp_ID`),
  ADD KEY `Inventory_ID` (`Inventory_ID`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`Inventory_ID`),
  ADD KEY `Typed_ID` (`Type_ID`),
  ADD KEY `user_id` (`User_id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`Type_ID`),
  ADD KEY `User_id` (`User_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`User_id`);

--
-- Indexes for table `waste`
--
ALTER TABLE `waste`
  ADD PRIMARY KEY (`Waste_ID`),
  ADD KEY `Inventory_ID` (`Inventory_ID`),
  ADD KEY `user_id` (`User_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `expired`
--
ALTER TABLE `expired`
  MODIFY `Exp_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `Inventory_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `Type_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `User_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1005;

--
-- AUTO_INCREMENT for table `waste`
--
ALTER TABLE `waste`
  MODIFY `Waste_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `expired`
--
ALTER TABLE `expired`
  ADD CONSTRAINT `expired_ibfk_1` FOREIGN KEY (`Inventory_ID`) REFERENCES `inventory` (`Inventory_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`Type_ID`) REFERENCES `type` (`Type_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`User_id`) REFERENCES `user` (`User_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `type`
--
ALTER TABLE `type`
  ADD CONSTRAINT `type_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `user` (`User_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `waste`
--
ALTER TABLE `waste`
  ADD CONSTRAINT `waste_ibfk_1` FOREIGN KEY (`Inventory_ID`) REFERENCES `inventory` (`Inventory_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `waste_ibfk_2` FOREIGN KEY (`User_id`) REFERENCES `user` (`User_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
