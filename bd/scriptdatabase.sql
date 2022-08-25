CREATE DATABASE `desafioicts` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
CREATE TABLE `tb_compras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `preco` varchar(45) NOT NULL,
  `datacriacao` date NOT NULL,
  `dataatualizacao` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tb_produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `preco` double NOT NULL,
  `datacriacao` date NOT NULL,
  `dataatualizacao` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4; 
