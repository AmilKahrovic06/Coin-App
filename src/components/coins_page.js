import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Heading,
  Input,
  Table,
  Row,
  CellHeader,
  Cell,
  HeartIcon,
  CoinLogo,
  Notification,
  CalculatorIcon,
  ModalContent,
  CloseButton,
  Modal,
  CalculatorInput,
  Result,
} from "./Home.styled";
import heartEmpty from "./images/heart-empty.png";
import heartFull from "./images/heart-full.png";
import calculator from "./images/calculator.png";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { useFavoriteCoins } from "../contexts/FavoriteCoinsContext";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(null);
  const [notificationLeftPosition, setNotificationLeftPosition] =
    useState("-200px");
  const [calculatorInputValue, setCalculatorInputValue] = useState(0);
  const [calculatorResult, setCalculatorResult] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [filteredCoins, setFilteredCoins] = useState([]); // Dodajemo filteredCoins state
  const coinsPerPage = 10;
  const pagesToShow = 10;
  const { favoriteCoins, toggleFavorite } = useFavoriteCoins();

  useEffect(() => {
    fetchCoins();
  }, []);

  const paginationStyles = {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  };

  const paginationButtonStyles = {
    padding: "0.5rem 1rem",
    margin: "0.2rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#f7f7f7",
    cursor: "pointer",
  };

  const fetchCoins = async () => {
    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        "tiers[0]": "1",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: "200",
        offset: "0",
      },
      headers: {
        "X-RapidAPI-Key": "61dba790cdmshb8f57517ebe5149p14c61djsnea99f8dd1a20",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const fetchedCoins = response.data.data.coins;

      const formattedCoins = fetchedCoins.map((coin, index) => ({
        index: index + 1,
        name: coin.name,
        price: coin.price,
        volume: coin["24hVolume"],
        marketCap: coin.marketCap,
        coinIconUrl: coin.iconUrl || "",
        sparkline: coin.sparkline || [],
        uuid: coin.uuid,
      }));

      setCoins(formattedCoins);
      setFilteredCoins(formattedCoins); // Inicijalno postavljamo filteredCoins na sve kripto valute
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const totalNumPages = Math.ceil(filteredCoins.length / coinsPerPage);

    if (currentPage > totalNumPages && totalNumPages > 0) {
      setCurrentPage(totalNumPages);
    }
  }, [filteredCoins, currentPage]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredResults = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(filteredResults);
    setCurrentPage(1); // Resetujemo trenutnu stranicu na prvu kada menjamo pojam pretrage
  };

  const toggleFavoriteCoin = (uuid, name) => {
    if (favoriteCoins.includes(uuid)) {
      toggleFavorite(uuid);
      showNotification(`You removed ${name} from favorites!`);
    } else {
      toggleFavorite(uuid);
      showNotification(`You added ${name} to favorites!`);
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setNotificationLeftPosition("20px");

    setTimeout(() => {
      setNotificationLeftPosition("-2000px");
    }, 3000);
  };

  const renderSparklineGraph = (coin) => {
    return (
      <Sparklines
        data={coin.sparkline.map((el) => parseFloat(el))}
        width={80}
        height={30}
      >
        <SparklinesLine className="sparkline" color="blue" />
      </Sparklines>
    );
  };

  const openCalculatorModal = (coinName) => {
    setSelectedCoin(coinName);
    setShowCalculatorModal(true);
  };

  const closeCalculatorModal = () => {
    setShowCalculatorModal(false);
  };

  const calculateResult = () => {
    const selectedCoinData = filteredCoins.find(
      (coin) => coin.name === selectedCoin
    );
    if (selectedCoinData) {
      const price = parseFloat(
        selectedCoinData.price.replace(/[^0-9.-]+/g, "")
      );
      const result = calculatorInputValue * price;
      setCalculatorResult(result);
    }
  };

  useEffect(() => {
    calculateResult();
  }, [calculatorInputValue, selectedCoin]);

  const indexOfLastCoin = currentPage * coinsPerPage;

  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (
    let i = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    i <=
    Math.min(
      currentPage + Math.floor(pagesToShow / 2),
      Math.ceil(filteredCoins.length / coinsPerPage)
    );
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Heading>Top Cryptos</Heading>
      <Input
        type="text"
        placeholder="Search cryptos here..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table>
        <Row>
          <CellHeader>Rank</CellHeader>
          <CellHeader>Logo</CellHeader>
          <CellHeader>Name</CellHeader>
          <CellHeader>Price</CellHeader>
          <CellHeader>24h Volume</CellHeader>
          <CellHeader>Market Cap</CellHeader>
          <CellHeader>Sparkline</CellHeader>
          <CellHeader>Favorite</CellHeader>
          <CellHeader>Calculator</CellHeader>
        </Row>
        {currentCoins.map((coin) => (
          <Row key={coin.uuid}>
            <Cell>{coin.index}.</Cell>
            <Cell>
              <Link to={`/coin/${coin.uuid}`}>
                <CoinLogo src={coin.coinIconUrl} alt={`${coin.name} logo`} />
              </Link>
            </Cell>
            <Cell>{coin.name}</Cell>
            <Cell>{coin.price}</Cell>
            <Cell>{coin.volume}</Cell>
            <Cell>{coin.marketCap}</Cell>
            <Cell>{renderSparklineGraph(coin)}</Cell>
            <Cell>
              <HeartIcon
                src={favoriteCoins.includes(coin.uuid) ? heartFull : heartEmpty}
                alt="Favorite"
                onClick={() => toggleFavoriteCoin(coin.uuid, coin.name)}
              />
            </Cell>
            <Cell>
              <CalculatorIcon
                onClick={() => openCalculatorModal(coin.name)}
                src={calculator}
                alt="Calculator"
              />
            </Cell>
          </Row>
        ))}
      </Table>
      <div style={paginationStyles}>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            disabled={pageNumber === currentPage}
            style={paginationButtonStyles}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      {notification && (
        <Notification style={{ left: notificationLeftPosition }}>
          <img
            src={heartFull}
            alt="Full Heart"
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
          />
          {notification}
        </Notification>
      )}
      {showCalculatorModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeCalculatorModal}>Close</CloseButton>
            <h2>Calculator</h2>
            <p>Enter a value for {selectedCoin}:</p>
            <CalculatorInput
              type="number"
              value={calculatorInputValue}
              onChange={(e) => setCalculatorInputValue(e.target.value)}
            />
            <Result>Result: ${calculatorResult}</Result>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Coins;
