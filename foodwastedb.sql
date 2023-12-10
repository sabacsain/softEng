-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2023 at 05:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
  `Kg_inventory` decimal(8,2) NOT NULL,
  `Pcs_inventory` int(11) NOT NULL,
  `Is_expired` tinyint(1) NOT NULL DEFAULT 0,
  `Is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `Type_ID` int(11) NOT NULL,
  `Price` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `Type_ID` int(11) NOT NULL,
  `Is_perishable` tinyint(1) NOT NULL DEFAULT 0,
  `Type_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD PRIMARY KEY (`Type_ID`);

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
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `User_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1005;

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
-- Constraints for table `waste`
--
ALTER TABLE `waste`
  ADD CONSTRAINT `waste_ibfk_1` FOREIGN KEY (`Inventory_ID`) REFERENCES `inventory` (`Inventory_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `waste_ibfk_2` FOREIGN KEY (`User_id`) REFERENCES `user` (`User_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
