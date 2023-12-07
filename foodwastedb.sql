-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2023 at 01:10 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `Inventory_ID` int(11) NOT NULL,
  `Name_inventory` varchar(25) NOT NULL,
  `Kg_inventory` decimal(8,2) NOT NULL,
  `Pcs_inventory` int(11) NOT NULL,
  `Is_expired` tinyint(1) NOT NULL DEFAULT 0,
  `Is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `Typed_ID` int(11) NOT NULL,
  `Price` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `Type_ID` int(11) NOT NULL,
  `Is_perishable` tinyint(1) NOT NULL DEFAULT 0,
  `Type_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `waste`
--

CREATE TABLE `waste` (
  `Waste_ID` int(11) NOT NULL,
  `Kg_waste` decimal(8,2) NOT NULL,
  `Pcs_waste` int(11) NOT NULL,
  `Date_waste` date NOT NULL DEFAULT current_timestamp(),
  `Inventory_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  ADD KEY `Typed_ID` (`Typed_ID`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`Type_ID`);

--
-- Indexes for table `waste`
--
ALTER TABLE `waste`
  ADD PRIMARY KEY (`Waste_ID`),
  ADD KEY `Inventory_ID` (`Inventory_ID`);

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
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`Typed_ID`) REFERENCES `type` (`Type_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `waste`
--
ALTER TABLE `waste`
  ADD CONSTRAINT `waste_ibfk_1` FOREIGN KEY (`Inventory_ID`) REFERENCES `inventory` (`Inventory_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
