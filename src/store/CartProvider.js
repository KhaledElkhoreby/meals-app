import { useReducer } from "react";
import CartContext from "./cart-context";

const CART_ACTIONS = {
  addItem: "ADD_ITEM",
  removeItem: "REMOVE_ITEM",
  clearCart: "CLEAR_CART",
};
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let updatedItems = [...state.items];
  let updatedTotalAmount = state.totalAmount;
  switch (action.type) {
    case CART_ACTIONS.addItem:
      const exitingIndex = state.items.findIndex(
        (i) => i.id === action.item.id
      );
      // debugger;
      if (exitingIndex > -1) {
        const updateItem = state.items[exitingIndex];
        updateItem.amount += action.amount || action.item.amount;

        updatedItems = [...state.items];
        updatedItems[exitingIndex] = updateItem;
        updatedTotalAmount =
          state.totalAmount +
          action.item.price * (action.amount || action.item.amount);
      } else {
        updatedItems = state.items.concat(action.item);
        updatedTotalAmount =
          state.totalAmount + action.item.price * action.item.amount;
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };

    case CART_ACTIONS.removeItem:
      const deletedItemIndex = state.items.findIndex((i) => i.id === action.id);

      const deletedItem = state.items[deletedItemIndex];

      if (deletedItem.amount === 1) {
        updatedItems.splice(deletedItemIndex, 1);
      } else {
        deletedItem.amount -= 1;
        updatedItems[deletedItemIndex] = deletedItem;
      }
      updatedTotalAmount = state.totalAmount - deletedItem.price;
      updatedTotalAmount = updatedTotalAmount < 0 ? 0 : updatedTotalAmount;
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    case CART_ACTIONS.clearCart:
      return defaultCartState;

    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item, amount) => {
    cartDispatch({ type: CART_ACTIONS.addItem, item: item, amount: amount });
  };
  const removeItemFromCartHandler = (id) => {
    cartDispatch({ type: CART_ACTIONS.removeItem, id: id });
  };

  const clearCartHandler = () => {
    cartDispatch({ type: CART_ACTIONS.clearCart });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
