import React, { useEffect, useState } from "react";
import axios from "axios";
import { THead, Tbody, Row, Table, CoinLogo, TalbeContainer, Container, ProfilePage, Description, CryptoImg, CheckedCoin, Amount, BtnAdd, BtnCryptoWallet } from "./accountstayled";


const Profile = () => {
    const [coins, setCoins] = useState ([])
    const [showTable, setShowTable] = useState(false)
    const [selectedCoins, setSelectedCoins] = useState([]);

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
                limit: "50",
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
                checked: false,
            }));
        
            setCoins(formattedCoins);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckboxChange = (index) => {
        setCoins((prevCoins) =>
        prevCoins.map((coin) =>
          coin.index === index ? { ...coin, checked: !coin.checked } : coin
        )
      );
    };

    const show = () => {
        setShowTable(true)
    }
    const hideTable = () => {
       setShowTable(false)
    }

    const handleAdd = () => {
        const selectedCoinsWithAmount = coins
        .filter((coin) => coin.checked)
        .map((coin) => ({ ...coin, amount: 0 }));
        setSelectedCoins(selectedCoinsWithAmount);
        hideTable()
      };

    const setAmountForCoin = (coinIndex, amount) => {
        setSelectedCoins((prevSelectedCoins) =>
          prevSelectedCoins.map((coin) =>
            coin.index === coinIndex ? { ...coin, amount } : coin
        )
      );
    }
    return(
        <Container>
            {showTable ? (
                
                <TalbeContainer>
                    { showTable && <button onClick={hideTable}>x</button> }
                    
                    
                <Table>
                    <Row>
                        <THead>Rank</THead>
                        <THead>Name</THead>
                        <THead>Price</THead>
                        <THead>Market Cap</THead>
                        <THead>Check</THead>
                        <THead>Amount</THead>
                    </Row>
                    
                {coins
                    .slice(0, 20)
                    .map((coin) => (
                        <Row key={coin.index}>
                            <li style={{listStyle:"none"}}></li>
                            <Tbody>{coin.index}.</Tbody>
                            <Tbody>
                                <CoinLogo src={coin.coinIconUrl} alt={`${coin.name} logo`} />{coin.name} 
                            </Tbody>
                            <Tbody>{coin.price}</Tbody>
                            <Tbody>{coin.marketCap}</Tbody>
                            <Tbody>
                            <input
                                style={{width: "20px", height: "20px"}}
                                type="checkbox"
                                checked={coin.checked}
                                onChange={() => handleCheckboxChange(coin.index)}
                            />
                            </Tbody>
                            <Tbody>
                                <Amount
                                    type="number"
                                    value={coin.amount}
                                    onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value)) {
                                        setAmountForCoin(coin.index, value);
                                    }
                                    }}
                                />
                            </Tbody>
                    </Row>
                    ))
                }
                { showTable && <BtnAdd onClick={handleAdd}>ADD</BtnAdd>} 
                </Table>
                
            </TalbeContainer>
            ):( 
                <ProfilePage>
                    <Description>
                        <h1>But Bitcoin & Crypto</h1>
                        <p>Sign up today and <span style={{color:"red"}}>buy 50+</span> cryptotocurrencies in minutes Get started with as little as <span style={{color:"red"}}>$10</span></p>

                        {selectedCoins.map((coin) => (
                                <CheckedCoin key={coin.index} >{coin.name}</CheckedCoin> 
                        ))}

                        <BtnCryptoWallet onClick={show}>CRYPTO WALLET</BtnCryptoWallet>
                    </Description>
                    <CryptoImg src="https://crypta.one/static/template2/images/shape/4.png"/>
                </ProfilePage>
             )} 
             
        </Container>
    )
};

export default Profile;
