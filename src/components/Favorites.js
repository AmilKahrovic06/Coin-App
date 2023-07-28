import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Table,
  Row,
  CellHeader,
  Cell,
  CoinLogo,
  HeartIcon,
  CalculatorIcon,
  ModalContent,
  CloseButton,
  Modal,
  CalculatorInput,
  Result,
  Notification,
} from "./Home.styled";
import { useFavoriteCoins } from "../contexts/FavoriteCoinsContext";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";
import heartFull from "./images/heart-full.png";
import calculator from "./images/calculator.png";
const Favorites = () => {
  const { favoriteCoins, toggleFavorite } = useFavoriteCoins();
  const [allCoins, setAllCoins] = useState([]);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [calculatorInputValue, setCalculatorInputValue] = useState(0);
  const [calculatorResult, setCalculatorResult] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationLeftPosition, setNotificationLeftPosition] =
    useState("-200px");

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
      setAllCoins(fetchedCoins);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavoriteCoin = (uuid) => {
    toggleFavorite(uuid);
    showNotification(
      favoriteCoins.includes(uuid)
        ? `You removed ${getCoinName(uuid)} from favorites`
        : `You removed ${getCoinName(uuid)} from favorites`
    );
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
    const selectedCoinData = allCoins.find(
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

  const getCoinName = (uuid) => {
    const coin = allCoins.find((coin) => coin.uuid === uuid);
    return coin ? coin.name : "";
  };

  const filteredCoins = allCoins.filter((coin) =>
    favoriteCoins.includes(coin.uuid)
  );

  return (
    <Container>
      <Heading>My Favorite Cryptos</Heading>
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
        {filteredCoins.map((coin) => (
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
                src={heartFull}
                alt="Favorite"
                onClick={() => toggleFavoriteCoin(coin.uuid)}
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

export default Favorites;
