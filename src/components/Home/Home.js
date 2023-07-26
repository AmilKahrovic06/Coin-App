import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Heading,
  Input,
  Container,
  Table,
  Row,
  CellHeader,
  Cell,
  HeartIcon,
  CoinLogo,
  Notification,
  CalculatorIcon,
  Modal,
  ModalContent,
  CloseButton,
} from "./Home.styled";
import heartEmpty from "./images/heart-empty.png";
import heartFull from "./images/heart-full.png";
import calculator from "./images/calculator.png";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);
  const [notificationLeftPosition, setNotificationLeftPosition] =
    useState("-200px");
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [calculatorInputValue, setCalculatorInputValue] = useState(0);
  const [calculatorResult, setCalculatorResult] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("");

  useEffect(() => {
    fetchCoins();
  }, []);

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
      }));

      setCoins(formattedCoins);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites];
      if (updatedFavorites.includes(index)) {
        updatedFavorites.splice(updatedFavorites.indexOf(index), 1);
      } else {
        updatedFavorites.push(index);
        const coinName = coins.find((coin) => coin.index === index)?.name;
        showNotification(`You added ${coinName} in your favorites!`);
      }
      return updatedFavorites;
    });
  };

  const showNotification = (message) => {
    setNotification(message);
    setNotificationLeftPosition("20px");

    setTimeout(() => {
      setNotificationLeftPosition("-2000px");
    }, 3000);
  };

  const openCalculatorModal = (coinName) => {
    setSelectedCoin(coinName);
    setShowCalculatorModal(true);
  };

  const closeCalculatorModal = () => {
    setShowCalculatorModal(false);
  };

  const calculateResult = () => {
    const selectedCoinData = coins.find((coin) => coin.name === selectedCoin);
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
  }, [calculatorInputValue, selectedCoin, calculateResult]);

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
          <CellHeader>Favorite</CellHeader>
          <CellHeader>Calculator</CellHeader>
        </Row>
        {coins
          .filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 10)
          .map((coin) => (
            <Row key={coin.index}>
              <Cell className="Cell">{coin.index}.</Cell>
              <Cell>
                <CoinLogo src={coin.coinIconUrl} alt={`${coin.name} logo`} />
              </Cell>
              <Cell>{coin.name}</Cell>
              <Cell>{coin.price}</Cell>
              <Cell>{coin.volume}</Cell>
              <Cell>{coin.marketCap}</Cell>
              <Cell>
                <HeartIcon
                  src={favorites.includes(coin.index) ? heartFull : heartEmpty}
                  alt="Favorite"
                  onClick={() => toggleFavorite(coin.index)}
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
            <Input
              type="number"
              value={calculatorInputValue}
              onChange={(e) => setCalculatorInputValue(e.target.value)}
            />
            <p>Result: ${calculatorResult}</p>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Home;
