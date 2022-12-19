-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19/12/2022 às 03:32
-- Versão do servidor: 10.4.27-MariaDB
-- Versão do PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `academia`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_imc`
--

CREATE TABLE `tb_imc` (
  `cod` int(11) NOT NULL,
  `peso` float NOT NULL,
  `altura` float NOT NULL,
  `imc` float NOT NULL,
  `cod_usuario` int(11) NOT NULL,
  `categoria` varchar(1) NOT NULL,
  `data_cadastro` datetime NOT NULL DEFAULT current_timestamp(),
  `imc_atual` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_imc`
--

INSERT INTO `tb_imc` (`cod`, `peso`, `altura`, `imc`, `cod_usuario`, `categoria`, `data_cadastro`, `imc_atual`) VALUES
(9, 96, 1.82, 28.98, 31, 'P', '2022-12-18 11:05:05', 0),
(13, 92, 1.82, 27.77, 31, 'P', '2022-12-18 17:25:32', 0),
(15, 92, 1.82, 27.77, 31, 'P', '2022-12-18 17:26:48', 0),
(16, 91, 1.82, 27.47, 31, 'P', '2022-12-18 17:31:26', 0),
(17, 73, 1.92, 19.8, 31, 'P', '2022-12-18 17:53:03', 0),
(18, 73, 1.82, 22.03, 31, 'P', '2022-12-18 17:55:11', 0),
(19, 79, 1.82, 23.84, 31, 'P', '2022-12-18 17:56:26', 0),
(20, 92, 1.82, 27.77, 31, 'P', '2022-12-18 17:56:47', 0),
(21, 92, 1.82, 27.77, 31, 'P', '2022-12-18 17:56:59', 0),
(22, 92, 1.82, 27.74, 31, 'P', '2022-12-18 17:59:17', 0),
(23, 92, 1.92, 24.95, 31, 'P', '2022-12-18 18:02:40', 1),
(24, 75, 1.82, 22.64, 32, 'A', '2022-12-18 21:55:02', 0),
(25, 74, 1.82, 22.34, 32, 'A', '2022-12-18 21:55:50', 1),
(26, 56, 1.5, 24.89, 33, 'P', '2022-12-18 22:17:35', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_login`
--

CREATE TABLE `tb_login` (
  `usuario` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_treino`
--

CREATE TABLE `tb_treino` (
  `cod` int(11) NOT NULL,
  `aparelho` varchar(255) NOT NULL,
  `repeticoes` int(11) NOT NULL,
  `cod_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_treino`
--

INSERT INTO `tb_treino` (`cod`, `aparelho`, `repeticoes`, `cod_usuario`) VALUES
(1, 'teste', 12, 31);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `cod` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `endereco` varchar(120) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `categoria` varchar(1) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `data_cadastro` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_usuario`
--

INSERT INTO `tb_usuario` (`cod`, `nome`, `senha`, `endereco`, `telefone`, `categoria`, `usuario`, `data_cadastro`) VALUES
(31, 'willian', '123', 'rua guaranis 10010', '(44) 3674-1105', 'P', 'teste', '2022-12-18 11:05:05'),
(32, 'Leo', '123', 'rua guaranis 555', '(44) 3674-1108', 'A', 'teste2', '2022-12-18 21:55:02'),
(33, 'teste2', '123', 'rua do teste', '(44) 4444-4444', 'P', 'teste3', '2022-12-18 22:17:35');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tb_imc`
--
ALTER TABLE `tb_imc`
  ADD PRIMARY KEY (`cod`);

--
-- Índices de tabela `tb_treino`
--
ALTER TABLE `tb_treino`
  ADD PRIMARY KEY (`cod`);

--
-- Índices de tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`cod`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_imc`
--
ALTER TABLE `tb_imc`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de tabela `tb_treino`
--
ALTER TABLE `tb_treino`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
