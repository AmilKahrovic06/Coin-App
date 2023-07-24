import "./App.css";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Header from "./components/pages/header";
function App() {
  return (
    <div>
      <Header />
      {/* <Routes>
        <Route index element={<Homepage />} />
        <Route path="coins" element={<Coinspage />} />
        <Route path="exchanges" element={<Exchanges />} />
        <Route path="coins/:uuid" element={<Coin />} />
        <Route path="favourite" element={<Favourite />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="profile" element={<Profile />} />
      </Routes> */}
      <Home/>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
