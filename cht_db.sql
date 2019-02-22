-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 22-Fev-2019 às 04:00
-- Versão do servidor: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cht_db`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `msg`
--

CREATE TABLE IF NOT EXISTS `msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idFrom` int(11) NOT NULL DEFAULT '0',
  `idTo` int(11) NOT NULL DEFAULT '0',
  `msg` text COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=12 ;

--
-- Extraindo dados da tabela `msg`
--

INSERT INTO `msg` (`id`, `idFrom`, `idTo`, `msg`, `status`) VALUES
(1, 1, 2, 'ola', 0),
(2, 1, 2, 'teste', 0),
(3, 1, 2, 'opa, toni, tudo bom?', 0),
(4, 2, 1, 'tudo certinho', 0),
(5, 1, 2, 'dnajfsjdsjdadsafd', 0),
(6, 1, 2, 'som...', 0),
(7, 1, 3, 'hih', 0),
(8, 1, 2, 'oi', 0),
(9, 2, 1, 'eae blz', 0),
(10, 2, 1, 'sadasd', 0),
(11, 2, 1, 'sadaasd', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `status`) VALUES
(1, 'Alexandre', 'alexandre.j.simon@gmail.com', '$2a$10$rJ.xjy9c2QTRYoBTqV35..XD7dWz01B1dmoRFomYSm0v/I4FrOWVG', 1),
(2, 'Alexandre2', 'alexandre@ciawebsites.com.br', '$2a$10$ZxToK1x1YggWBwh14989UOEzzakspHDUc6VmcZe8fTR0boTYywubm', 0),
(3, 'Toni', 'tonicampos@ciawebsites.com.br', '$2a$10$ZxToK1x1YggWBwh14989UOEzzakspHDUc6VmcZe8fTR0boTYywubm', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
