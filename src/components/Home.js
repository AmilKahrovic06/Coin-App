import React, { useEffect, useState } from "react";
import axios from "axios";
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
  CalculatorIcon,
  ModalContent,
  CloseButton,
  Modal,
  CalculatorInput,
  Result,
  Notification,
} from "./Home.styled";
import heartEmpty from "./images/heart-empty.png";
import heartFull from "./images/heart-full.png";
import calculator from "./images/calculator.png";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { useFavoriteCoins } from "../contexts/FavoriteCoinsContext";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationLeftPosition, setNotificationLeftPosition] =
    useState("-200px");
  const [calculatorInputValue, setCalculatorInputValue] = useState(0);
  const [calculatorResult, setCalculatorResult] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const { favoriteCoins, toggleFavorite } = useFavoriteCoins();

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
        limit: "1000",
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
      setCoins(fetchedCoins);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
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
  }, [calculatorInputValue, selectedCoin]);

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

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display 10 coins initially when no search term is provided
  const displayedCoins = searchTerm
    ? filteredCoins
    : filteredCoins.slice(0, 10);

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
        {displayedCoins.map((coin) => (
          <Row key={coin.uuid}>
            <Cell>{coin.rank}.</Cell>
            <Cell>
              <CoinLogo src={coin.iconUrl} alt={`${coin.name} logo`} />
            </Cell>
            <Cell>{coin.name}</Cell>
            <Cell>{coin.price}</Cell>
            <Cell>{coin["24hVolume"]}</Cell>
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

export default Home;
