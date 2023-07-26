import "./App.css";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Header from "./components/pages/header";
import Footer from "./components/Footer/footer";
import Exchanges from "./components/pages/Exchanges/Exchanges";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchanges_page" element={<Exchanges />} />
        {/* Other routes go here */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
