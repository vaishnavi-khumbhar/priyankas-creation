import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import TrackOrder from "./pages/TrackOrder";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* shop */}
        <Route path="/products" element={<Products />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* order flow */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:orderNo" element={<OrderSuccess />} />
        <Route path="/track-order/:orderNo" element={<TrackOrder />} />

        {/* account */}
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        {/* info */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}