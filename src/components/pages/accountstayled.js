import { styled } from "styled-components";

export const Container = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 overflow-x: hidden;
`

export const TalbeContainer = styled.div`
 width: 76%;
 height: 97vh;
 overflow-y: scroll;
 overflow-x: hidden;
 background-color: white;
 position: fixed;
 margin-top: 33%;
 box-shadow: 0 0 200px 250px rgba(0, 0, 0, 0.7);
 border: 2px solid #3d3d79 ;
`

export const Table = styled.table`
 display: flex;
 align-items: center;
 flex-direction: column;
 border-collapse: collapse;
 margin-left: -3px;
`;

export const THead = styled.thead`
 display: flex;
 justify-content: center;
 align-items: center;
 text-align: center;
 border-bottom: 1px solid #dddddd;
 width: 160px;
 height: 100px;
 text-align: center;
 font-weight: bold;
 margin-top: -36px;
`;


export const Tbody = styled.tbody`
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 border-bottom: 1px solid #dddddd;
 text-align: center;
 width: 150px;
 padding: 0px 5px;
 height: 100px;
`;

export const Row = styled.tr`
 display: flex;
`;

export const CoinLogo = styled.img`
 width: 40px;
 height: 40px;
`;

export const ProfilePage = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
`

export const Description = styled.div`
 color: #3d3d79;
 margin-right: -100px;
 text-align: center;
 font-size: x-large;
`

export const CryptoImg = styled.img`
 width: 1000px;
 height: 523px;
 margin-right: -140px;
`

export const CheckedCoin = styled.li`
 list-style: none;
 font-size: 17px;
 color: red;
`

export const Amount = styled.input`
 width: 80px;
 height: 35px;
 background-color: #3d3d79;
 color: white;
 border: none;
 border-radius: 0 10px 0 10px;
 padding: 5px 10px;
 outline: none;
` 

export const BtnAdd = styled.button`
 width: 90px;
 height: 35px;
 background-color: #3d3d79;
 border: none;
 border-radius:0 5px 0 5px ;
 color: white;
 margin: 30px 0;
 cursor: pointer;
 font-weight: bold;
 

 &:hover{
    background-color: white;
    border: 2px solid #3d3d79;
    color: #3d3d79;
 }
`

export const  BtnCryptoWallet = styled.button`
 width: 200px;
 height: 50px;
 border: none;
 background-color: #f2f3f7;
 border: 2px solid #3d3d79;
 border-radius:0 10px 0 10px ;
 color: #3d3d79;
 margin-top: 30px;
 font-size: large;
 cursor: pointer;

 &:hover{
    color: #3d3d79;
    background-color: #3d3d79;
    border: white;
    color: white;
 }
`

export const BtnX = styled.button`
 background-color: white;
 color: #3d3d79;
 border: none;
 display: flex;
 justify-content: center;
 align-items: center;
 padding: 20px;
 font-size: x-large;
 font-weight: bold;
 cursor: pointer;
`