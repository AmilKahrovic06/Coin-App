import React, { useEffect, useState } from "react";
import axios from "axios";

import { Table, Image } from "antd";
import "./Exchanges.css";
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    fetchExchanges();
  }, []);

  const fetchExchanges = async () => {
    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/exchanges",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        limit: "200",
        offset: "0",
        orderBy: "24hVolume",
        orderDirection: "desc",
      },
      headers: {
        "X-RapidAPI-Key": "61dba790cdmshb8f57517ebe5149p14c61djsnea99f8dd1a20",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const fetchedExchanges = response.data.data.exchanges;
      setExchanges(fetchedExchanges);
    } catch (error) {
      console.error(error);
    }
  };

  // Define the columns for the table
  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Logo",
      dataIndex: "iconUrl",
      key: "iconUrl",
      render: (url) => <Image src={url} alt="Exchange Logo" width={50} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "24h Volume",
      dataIndex: "24hVolume",
      key: "24hVolume",
    },

    {
      title: "Coinranking URL",
      dataIndex: "coinrankingUrl",
      key: "coinrankingUrl",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ),
    },
  ];

  return (
    <div>
      <h2>Top Exchanges</h2>
      <Table dataSource={exchanges} columns={columns} />
    </div>
  );
};

export default Exchanges;
