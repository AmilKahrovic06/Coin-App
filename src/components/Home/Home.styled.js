import styled from "styled-components";

export const Heading = styled.h1`
  text-align: center;
  font-size: 32px;
  margin-bottom: 40px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 60px;
  border-radius: 15px;
  text-align: center;
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f3f7;
`;

export const Table = styled.div`
  display: grid;
  gap: 1px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0px;
  align-items: center;
  border: none;
  border-radius: 5px;

  > div:nth-child(even) {
    background-color: #cbcbf8;
    padding: 20px;
    border-radius: 15px;
  }

  > div:not(:nth-child(even)) {
    background-color: white;
    padding: 20px;
    border-radius: 15px;
  }
`;

export const CellHeader = styled.div`
  font-weight: bold;
`;

export const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeartIcon = styled.img`
  width: 20px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`;

export const CoinLogo = styled.img`
  width: 40px;
  height: 40px;
`;

export const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  left: -200px;
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  transition: left 0.3s ease-in-out;
  z-index: 999;

  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`;
