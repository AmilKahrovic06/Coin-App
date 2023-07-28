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
import { Sparklines, SparklinesLine } from "react-sparklines";

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
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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
    setPage(1); // Reset the page to 1 when a new search term is entered
  };

  const toggleFavorite = (uuid) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(uuid)) {
        // Remove from favorites
        const updatedFavorites = prevFavorites.filter(
          (favUuid) => favUuid !== uuid
        );
        showNotification("Removed from favorites");
        return updatedFavorites;
      } else {
        // Add to favorites
        const updatedFavorites = [...prevFavorites, uuid];
        showNotification("Added to favorites");
        return updatedFavorites;
      }
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

  // Function to filter coins based on search term
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the index of the first and last coins to display based on the current page and items per page
  const lastIndex = page * perPage;
  const firstIndex = lastIndex - perPage;
  const displayedCoins = filteredCoins.slice(firstIndex, lastIndex);

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
                src={favorites.includes(coin.uuid) ? heartFull : heartEmpty}
                alt="Favorite"
                onClick={() => toggleFavorite(coin.uuid)}
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
