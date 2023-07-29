import "./App.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Header from "./components/pages/header";
import Footer from "./components/Footer/footer";
import Profile from "./components/pages/account_page";
import Exchanges from "./components/pages/Exchanges/Exchanges";
import Coins from "./components/coins_page";
import AboutUsPage from "./components/pages/About Us/about_us";
import Favorites from "./components/Favorites";
import { FavoriteCoinsProvider } from "./contexts/FavoriteCoinsContext";
import { CoinContextProvider } from "./contexts/CoinContext";
import CoinDetails from "./Coin/Coin";
function App() {
  return (
    <div>
      <FavoriteCoinsProvider>
        <CoinContextProvider>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/coin/:uuid" element={<CoinDetails />} />
            <Route path="favorites_page" element={<Favorites />} />
            <Route path="coins_page" element={<Coins />} />
            <Route path="account_page" element={<Profile />} />
            <Route path="exchanges_page" element={<Exchanges />} />
            <Route path="about_us" element={<AboutUsPage />} />
          </Routes>
        </CoinContextProvider>
        <Footer />
      </FavoriteCoinsProvider>
    </div>
  );
}

export default App;
