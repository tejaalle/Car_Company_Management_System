create database cloud_assignment6_05; 
use cloud_assignment6_05;

CREATE TABLE `table_part_orders_x_05` (
  `partId05` int(11) NOT NULL,
  `jobName05` varchar(10) NOT NULL,
  `userId05` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  PRIMARY KEY (`userId05`,`partId05`,`jobName05`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
