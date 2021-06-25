-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 25, 2021 alle 09:44
-- Versione del server: 10.4.19-MariaDB
-- Versione PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uberazzi`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `immagine`
--

CREATE TABLE `immagine` (
  `IDImmagine` int(11) NOT NULL,
  `IDVeicolo` int(11) NOT NULL,
  `Filename` varchar(1000) NOT NULL,
  `Path` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `notificheritardo`
--

CREATE TABLE `notificheritardo` (
  `IDNotifica` int(11) NOT NULL,
  `IDPrenotazione` int(11) NOT NULL,
  `Note` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `pagamento`
--

CREATE TABLE `pagamento` (
  `IDPagamento` int(11) NOT NULL,
  `IDPrenotazione` int(11) NOT NULL,
  `DataOra` date NOT NULL,
  `Importo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `parcheggio`
--

CREATE TABLE `parcheggio` (
  `IDParcheggio` int(11) NOT NULL,
  `Note` varchar(1000) NOT NULL,
  `Indirizzo` varchar(1000) NOT NULL,
  `CAP` int(5) NOT NULL,
  `NumeroPosti` int(10) NOT NULL,
  `PostiOccupati` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `permessi`
--

CREATE TABLE `permessi` (
  `IDPermesso` int(11) NOT NULL,
  `DettaglioPermesso` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazione`
--

CREATE TABLE `prenotazione` (
  `IDPrenotazione` int(11) NOT NULL,
  `IDUtente` int(11) NOT NULL,
  `Partenza` varchar(1000) NOT NULL,
  `Arrivo` varchar(1000) NOT NULL,
  `DataOra` date NOT NULL,
  `IDAutista` int(11) DEFAULT NULL,
  `IDVeicolo` int(11) NOT NULL,
  `Autista` tinyint(1) NOT NULL DEFAULT 0,
  `Consegnato` tinyint(1) NOT NULL DEFAULT 0,
  `Stato` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `tipoveicolo`
--

CREATE TABLE `tipoveicolo` (
  `IDTipoVeicolo` int(11) NOT NULL,
  `DettaglioTipologia` varchar(1000) NOT NULL,
  `TipoMezzo` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `IDUtente` int(11) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Cognome` varchar(100) NOT NULL,
  `DataDiNascita` date NOT NULL,
  `CodiceFiscale` varchar(16) NOT NULL,
  `Indirizzo` varchar(200) NOT NULL,
  `CAP` int(5) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Password` mediumtext NOT NULL,
  `NumeroPatente` varchar(10) NOT NULL,
  `TipoPatente` varchar(7) NOT NULL,
  `Permessi` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `veicolo`
--

CREATE TABLE `veicolo` (
  `IDVeicolo` int(11) NOT NULL,
  `TipoVeicolo` int(11) NOT NULL,
  `Condizioni` varchar(1000) NOT NULL,
  `Prenotabile` tinyint(1) NOT NULL,
  `NumeroPosti` int(2) NOT NULL,
  `Targa` int(11) NOT NULL,
  `Prezzo` varchar(10) NOT NULL,
  `IDParcheggio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `immagine`
--
ALTER TABLE `immagine`
  ADD PRIMARY KEY (`IDImmagine`),
  ADD KEY `ImmagineVeicolo` (`IDVeicolo`);

--
-- Indici per le tabelle `notificheritardo`
--
ALTER TABLE `notificheritardo`
  ADD PRIMARY KEY (`IDNotifica`),
  ADD KEY `notificaRitardoPrenotazione` (`IDPrenotazione`);

--
-- Indici per le tabelle `pagamento`
--
ALTER TABLE `pagamento`
  ADD PRIMARY KEY (`IDPagamento`),
  ADD KEY `IDPrenotazione` (`IDPrenotazione`);

--
-- Indici per le tabelle `parcheggio`
--
ALTER TABLE `parcheggio`
  ADD PRIMARY KEY (`IDParcheggio`);

--
-- Indici per le tabelle `permessi`
--
ALTER TABLE `permessi`
  ADD PRIMARY KEY (`IDPermesso`);

--
-- Indici per le tabelle `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD PRIMARY KEY (`IDPrenotazione`),
  ADD KEY `IDUtente` (`IDUtente`),
  ADD KEY `IDAutista` (`IDAutista`),
  ADD KEY `IDVeicolo` (`IDVeicolo`);

--
-- Indici per le tabelle `tipoveicolo`
--
ALTER TABLE `tipoveicolo`
  ADD PRIMARY KEY (`IDTipoVeicolo`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`IDUtente`),
  ADD KEY `Permessi` (`Permessi`);

--
-- Indici per le tabelle `veicolo`
--
ALTER TABLE `veicolo`
  ADD PRIMARY KEY (`IDVeicolo`),
  ADD KEY `TipoVeicolo` (`TipoVeicolo`),
  ADD KEY `Posteggio` (`IDParcheggio`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `immagine`
--
ALTER TABLE `immagine`
  MODIFY `IDImmagine` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `notificheritardo`
--
ALTER TABLE `notificheritardo`
  MODIFY `IDNotifica` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `pagamento`
--
ALTER TABLE `pagamento`
  MODIFY `IDPagamento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `parcheggio`
--
ALTER TABLE `parcheggio`
  MODIFY `IDParcheggio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `permessi`
--
ALTER TABLE `permessi`
  MODIFY `IDPermesso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `prenotazione`
--
ALTER TABLE `prenotazione`
  MODIFY `IDPrenotazione` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `utente`
--
ALTER TABLE `utente`
  MODIFY `IDUtente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `veicolo`
--
ALTER TABLE `veicolo`
  MODIFY `IDVeicolo` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `immagine`
--
ALTER TABLE `immagine`
  ADD CONSTRAINT `ImmagineVeicolo` FOREIGN KEY (`IDVeicolo`) REFERENCES `veicolo` (`IDVeicolo`);

--
-- Limiti per la tabella `notificheritardo`
--
ALTER TABLE `notificheritardo`
  ADD CONSTRAINT `notificaRitardoPrenotazione` FOREIGN KEY (`IDPrenotazione`) REFERENCES `prenotazione` (`IDPrenotazione`);

--
-- Limiti per la tabella `pagamento`
--
ALTER TABLE `pagamento`
  ADD CONSTRAINT `IDPrenotazione` FOREIGN KEY (`IDPrenotazione`) REFERENCES `prenotazione` (`IDPrenotazione`);

--
-- Limiti per la tabella `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD CONSTRAINT `IDAutista` FOREIGN KEY (`IDAutista`) REFERENCES `utente` (`IDUtente`),
  ADD CONSTRAINT `IDUtente` FOREIGN KEY (`IDUtente`) REFERENCES `utente` (`IDUtente`),
  ADD CONSTRAINT `IDVeicolo` FOREIGN KEY (`IDVeicolo`) REFERENCES `veicolo` (`IDVeicolo`);

--
-- Limiti per la tabella `utente`
--
ALTER TABLE `utente`
  ADD CONSTRAINT `Permessi` FOREIGN KEY (`Permessi`) REFERENCES `permessi` (`IDPermesso`);

--
-- Limiti per la tabella `veicolo`
--
ALTER TABLE `veicolo`
  ADD CONSTRAINT `Posteggio` FOREIGN KEY (`IDParcheggio`) REFERENCES `parcheggio` (`IDParcheggio`),
  ADD CONSTRAINT `TipoVeicolo` FOREIGN KEY (`TipoVeicolo`) REFERENCES `tipoveicolo` (`IDTipoVeicolo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
