import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import Homepage from "./Components/Homepage/Homepage";
import ProductPage from "./Components/ProductPage/ProductPage";
import { useEffect } from "react";

import "./App.css";
import ClothingPage from "./Components/ClothingPage/ClothingPage";
import MobilePage from "./Components/MobilePage/Mobile";
import AccessoryPage from "./Components/AccessoryPage/AccessoryPage";
import BagPage from "./Components/BagPage/BagPage";
import EssentialPage from "./Components/EssentialsPage/EssentialsPage";
import ProductDetail from "./Components/ProductDetails/ProductDetail";
import OrderPage from "./Components/OrderPage/OrderPage";
import { SellerHeader } from "./Components/SellerHeader/SellerHeader";
import SellerLogin from "./Components/SellerLogin/SellerLogin";
import SellerProfile from "./Components/SellerProfile/SellerProfile";
import MyProfile from "./Components/MyProfile/MyProfile";
import { SearchResult } from "./Components/SearchResult/SearchResult";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<MainPage />}></Route>
          <Route exact path="/seller-page/*" element={<Seller />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

function Seller() {
  return(
    <div className="seller__landing_page">
      <SellerHeader/>
      <SellerInner/>
    </div>
    
  )
}

function SellerInner() {
  return(
    <Routes>
      <Route path="/" element={<SellerLogin />}></Route>
      <Route path="/profile" element={<SellerProfile />}></Route>
    </Routes>
  );
}

function MainPage() {
  return (
    <>
      <Header></Header>
      <Inner></Inner>
    </>
  );
}

function Inner() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route exact path="/" element={<Homepage />}></Route>
      <Route path="/all-category" element={<ProductPage />}></Route>
      <Route path="/clothing" element={<ClothingPage />}></Route>
      <Route path="/mobile" element={<MobilePage />}></Route>
      <Route path="/accessories" element={<AccessoryPage />}></Route>
      <Route path="/bags" element={<BagPage />}></Route>
      <Route path="/daily-essentials" element={<EssentialPage />}></Route>
      <Route path="/product-detail/*" element={<ProductDetail />}></Route>
      <Route path="/shopping-cart" element={<OrderPage />}></Route>
      <Route path="/myprofile" element={<MyProfile />}></Route>
      <Route path="/search-result" element={<SearchResult />}></Route>
    </Routes>
  );
}

export default App;
