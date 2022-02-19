import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [isHighlighted, setIsHighlighted] = useState();
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.items.reduce((previousValue, item) => {
    return previousValue + item.amount;
  }, 0);

  const classesStyle = `${classes.button} ${isHighlighted ? classes.bump : ""}`;
  const items = cartCtx.items;
  useEffect(() => {
    if (items.length === 0) return;
    setIsHighlighted(true);
    return setTimeout(() => setIsHighlighted(false), 300);
  }, [items]);
  return (
    <button className={classesStyle} onClick={props.onOpenCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalAmount}</span>
    </button>
  );
};

export default HeaderCartButton;
