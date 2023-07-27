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
  overflow-x: hidden;
`;

export const Table = styled.div`
  display: grid;
  gap: 0px;
  margin-bottom: 100px;
`;

export const Row = styled.div`
  display: flex;
  gap: 1px;
  border: none;
  border-radius: 5px;

  > div:nth-child(even) {
    background-color: #cbcbf88c;
    padding: 10px;
    border-radius: 15px;
  }

  > div:not(:nth-child(even)) {
    background-color: white;
    padding: 10px;
    border-radius: 15px;
  }
`;

export const CellHeader = styled.div`
  font-weight: bold;
  width: 127px;
`;

export const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 127px;
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

export const CalculatorIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CloseButton = styled.button`
  align-self: flex-end;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CalculatorInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

export const Result = styled.p`
  margin-top: 10px;
`;
export const CalcButton = styled.button`
  border: none;
  background-color: none;
`;
