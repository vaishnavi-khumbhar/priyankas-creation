import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-cream">
      <Navbar />

      {/* flex-1 makes this fill any leftover space, so the Footer
          always sits right at the bottom of the viewport instead of
          leaving empty space below it when a page (e.g. a category
          with only 2–4 products) is shorter than the screen. */}
      <main className="flex-1">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Products */}
          <Route path="/products" element={<Products />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Information */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      

      <WhatsAppWidget />
      <Footer />
    </div>
  );
}