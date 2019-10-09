-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Servidor: localhost:8889
-- Tiempo de generación: 09-10-2019 a las 02:48:41
-- Versión del servidor: 5.5.42
-- Versión de PHP: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de datos: `wellshared`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `authorities`
--

CREATE TABLE `authorities` (
  `id` bigint(20) NOT NULL,
  `authority` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `center`
--

CREATE TABLE `center` (
  `id` bigint(20) NOT NULL,
  `activities` tinyint(4) DEFAULT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `description2` varchar(255) DEFAULT NULL,
  `individual` tinyint(4) DEFAULT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `lon` varchar(255) DEFAULT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `location_id` bigint(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `center`
--

INSERT INTO `center` (`id`, `activities`, `adress`, `description`, `description2`, `individual`, `lat`, `lon`, `main_image`, `name`, `phone`, `price`, `url`, `location_id`) VALUES
(1, 0, 'Carrer de l''Escorial, 11', 'Manuterapia ofrece todos los servicios necesarios para poder realizar sesiones privadas de fisioterapia.  \r\n', '', 1, '41.406275', '2.162129', 'escorial.jpg', 'ManuTeràpia', '', '10', 'https://www.googleapis.com/calendar/v3/calendars/kt0fut7onpg05qf2js1aqbn19c%40group.calendar.google.com/events?maxResults=60&singleEvents=true&fields=description%2Citems(colorId%2Ccreated%2Cdescription%2Cend%2Cid%2Csource%2Cstart%2Cstatus%2Csummary)%2Csummary&key=', 1),
(2, 0, 'Carrer del Penedès, 9', 'Fisioespai ofrece todos los servicios necesarios para poder realizar sesiones privadas de fisioterapia.  ', '', 1, '41.400976', '2.158224', 'penedes1.jpg', 'Fisioespai', '', '15', 'https://www.googleapis.com/calendar/v3/calendars/h4k171khhbnracdnq53riaqovo%40group.calendar.google.com/events?maxResults=60&orderBy=startTime&singleEvents=true&fields=description%2Citems(colorId%2Ccreated%2Cdescription%2Cend%2Cid%2Csource%2Cstart%2Cstatus%2Csummary)%2Csummary&key=', 1),
(3, 0, 'Carrer de Sant Quintí, 33-35 Entresuelo', 'Mora Quer ofrece todos los servicios necesarios para poder realizar sesiones privadas de fisioterapia.  ', '', 1, '41.412831', '2.178435', 'quinti1.png', 'Mora Quer', '', '20', 'https://www.googleapis.com/calendar/v3/calendars/ivk9rkmkg7thnn2h5tqht0814c%40group.calendar.google.com/events?maxResults=60&orderBy=startTime&singleEvents=true&fields=description%2Citems(colorId%2Ccreated%2Cdescription%2Cend%2Cid%2Csource%2Cstart%2Cstatus%2Csummary)%2Csummary&key=', 4),
(4, 0, 'Carrer de la Diputació, 456', 'Fisiomoviment ofrece todos los servicios necesarios para poder realizar sesiones privadas de fisioterapia.', '', 1, '41.406201', '2.181630', 'diputacio1.jpg', 'Fisiomoviment', '626 93 40 89', '15', 'https://www.googleapis.com/calendar/v3/calendars/rj9uq51vt6vaq6ma3tbr4tmb60%40group.calendar.google.com/events?maxResults=60&singleEvents=true&fields=description%2Citems(colorId%2Ccreated%2Cdescription%2Cend%2Cid%2Csource%2Cstart%2Cstatus%2Csummary)%2Csummary&key=', 2),
(5, 1, 'Carrer de Berlín, 22', 'Wellfit ofrece todos los servicios necesarios para poder realizar diferentes actividades de fisioterapia.', '', 0, '41.382700', '2.138222', 'berlin.jpg', 'Wellfit', '', '25', 'https://www.googleapis.com/calendar/v3/calendars/84bd740fcfq7f0j91jd34516js%40group.calendar.google.com/events?maxResults=80&orderBy=startTime&singleEvents=true&fields=description%2Citems(colorId%2Ccreated%2Cdescription%2Cend%2Cid%2Csource%2Cstart%2Cstatus%2Csummary)%2Csummary&key=', 3),
(6, 1, 'Ronda de Sant Pere, 58', 'Espai Ronda ofrece todos los servicios necesarios para poder realizar diferentes actividades de fisioterapia.', '', 0, '41.390686', '2.177827', 'ronda.jpg', 'Espai Ronda', '', '25', 'https://www.googleapis.com/calendar/v3/calendars/f3r5n1rouun8lfiu5rcr4kioc8%40group.calendar.google.com/events?maxResults=60&orderBy=startTime&singleEvents=true&fields=description%2Citems(colorId%2Ccreated%2Cdescription%2Cend%2Cid%2Csource%2Cstart%2Cstatus%2Csummary)%2Csummary&key=', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `center_service`
--

CREATE TABLE `center_service` (
  `center_id` bigint(20) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `center_service`
--

INSERT INTO `center_service` (`center_id`, `service_id`) VALUES
(2, 1),
(2, 4),
(2, 3),
(3, 1),
(3, 3),
(3, 4),
(4, 1),
(4, 3),
(4, 4),
(5, 1),
(5, 3),
(5, 10),
(6, 1),
(6, 3),
(6, 10),
(1, 1),
(1, 3),
(1, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `image`
--

CREATE TABLE `image` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `center_id` bigint(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `image`
--

INSERT INTO `image` (`id`, `name`, `url`, `center_id`) VALUES
(1, 'Escorial', 'escorial.jpg', 1),
(2, 'Penedes 1', 'penedes1.jpg', 2),
(3, 'Penedes 2', 'penedes2.jpg', 2),
(4, 'quinti 1', 'quinti1.png', 3),
(5, 'quinti 2', 'quinti2.png', 3),
(6, 'Berlin', 'berlin.jpg', 5),
(7, 'Ronda', 'ronda.jpg', 6),
(8, 'Diputacio 1', 'diputacio1.jpg', 4),
(9, 'Diputacio 2', 'diputacio2.jpg', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `location`
--

CREATE TABLE `location` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `location`
--

INSERT INTO `location` (`id`, `description`, `name`) VALUES
(1, 'Barrio de gracia', 'Gràcia'),
(2, 'Barrio del eixample de Barcelona', 'Eixample'),
(3, 'Barrio de Sants', 'Sants-Montjuic'),
(4, 'Horta-Guinardó', 'Horta-Guinardó');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service`
--

CREATE TABLE `service` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `service`
--

INSERT INTO `service` (`id`, `description`, `name`, `url`) VALUES
(1, 'Aire Acondicionado', 'Aire Acondicionado', 'aire.png'),
(2, 'Ascensor', 'Ascensor', 'ascensor.png'),
(3, 'Calefacción', 'Calefacción', 'calefaccion.png'),
(4, 'Camilla', 'Camilla', 'camilla.png'),
(5, 'Crema', 'Crema', 'crema.png'),
(6, 'Gimnasio', 'Gimnasio', 'gimnasio.png'),
(7, 'm2', 'm2', 'm2.png'),
(8, 'Mesa', 'Mesa', 'mesa.png'),
(9, 'Papel', 'Papel', 'papel.png'),
(10, 'Ventilador', 'Ventilador', 'Ventilador.png'),
(11, 'Silla', 'Silla', 'Silla.png'),
(12, 'Vestuario', 'Vestuario', 'Vestuario.png'),
(13, 'WC', 'WC', 'WC.png'),
(14, 'Aire Acondicionado', 'Aire Acondicionado', 'aire.png'),
(15, 'Wifi', 'Wifi', 'Wifi.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `enabled` tinyint(4) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `authorities`
--
ALTER TABLE `authorities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKhcqd6xr5j0otd5q58nnalyseb` (`username`);

--
-- Indices de la tabla `center`
--
ALTER TABLE `center`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjk541a57n48rofpimnh2tpxnu` (`location_id`);

--
-- Indices de la tabla `center_service`
--
ALTER TABLE `center_service`
  ADD KEY `FKceswni5ss5n9pw5v3b5y44kdf` (`service_id`),
  ADD KEY `FKnoqsu0j3mrrkbdqryjjt0jitb` (`center_id`);

--
-- Indices de la tabla `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6h5alp7e04i8b62l0v3dk3p8b` (`center_id`);

--
-- Indices de la tabla `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `authorities`
--
ALTER TABLE `authorities`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `center`
--
ALTER TABLE `center`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `image`
--
ALTER TABLE `image`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `location`
--
ALTER TABLE `location`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `service`
--
ALTER TABLE `service`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `authorities`
--
ALTER TABLE `authorities`
  ADD CONSTRAINT `FKhcqd6xr5j0otd5q58nnalyseb` FOREIGN KEY (`username`) REFERENCES `user` (`username`);

--
-- Filtros para la tabla `center`
--
ALTER TABLE `center`
  ADD CONSTRAINT `FKjk541a57n48rofpimnh2tpxnu` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

--
-- Filtros para la tabla `center_service`
--
ALTER TABLE `center_service`
  ADD CONSTRAINT `FKceswni5ss5n9pw5v3b5y44kdf` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  ADD CONSTRAINT `FKnoqsu0j3mrrkbdqryjjt0jitb` FOREIGN KEY (`center_id`) REFERENCES `center` (`id`);

--
-- Filtros para la tabla `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `FK6h5alp7e04i8b62l0v3dk3p8b` FOREIGN KEY (`center_id`) REFERENCES `center` (`id`);
