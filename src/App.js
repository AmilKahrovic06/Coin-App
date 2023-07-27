import "./App.css";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Header from "./components/pages/header";
import Footer from "./components/Footer/footer";
import Profile from "./components/pages/account_page";
import Exchanges from "./components/pages/Exchanges/Exchanges";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        {/* <Route path="coins_page" element={<CoinsPage />} />
        <Route path="exchanges_page" element={<Exchanges />} />
        <Route path="favorite_page" element={<Favorite />} />
        <Route path="about_us" element={<AboutUsPage />} /> */}
        <Route path="account_page" element={<Profile />} />
        <Route path="/exchanges_page" element={<Exchanges />} />
        {/* Other routes go here */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;