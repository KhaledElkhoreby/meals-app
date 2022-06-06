import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showOrder, setShowOrder] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const cartCtx = useContext(CartContext);

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item, amount) => {
    cartCtx.addItem(item, amount);
  };

  const orderHandler = () => {
    showOrder ? setShowOrder(false) : setShowOrder(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    setIsSubmited(false);
    await fetch(
      "https://meals-app-b7c8b-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmiting(false);
    setIsSubmited(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item, 1)}
        />
      ))}
    </ul>
  );

  const cartContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      {showOrder && (
        <Checkout onCancel={orderHandler} onSubmit={submitOrderHandler} />
      )}
      <div className={classes.actions}>
        <button onClick={props.onCloseCart} className={classes["button--alt"]}>
          Close
        </button>
        {hasItems && !showOrder && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </>
  );

  const submitingLoading = <p>Submiting...</p>;
  const submitedContent = (
    <div className={classes.actions}>
      <p>Submited Successfuly</p>
      <button onClick={props.onCloseCart} className={classes.button}>
        Close
      </button>
    </div>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isSubmiting && !isSubmited && cartContent}
      {isSubmiting && submitingLoading}
      {isSubmited && submitedContent}
    </Modal>
  );
};

export default Cart;
