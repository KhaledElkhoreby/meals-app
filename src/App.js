import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [showCart, setShowCart] = useState(false);
  const onOpenCartHandler = () => {
    setShowCart(true);
  };
  const onCloseCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart && <Cart onCloseCart={onCloseCartHandler} />}
      <Header onOpenCart={onOpenCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
