import { CartItem, IngredientItem} from "../pizza.service";
import {Observable, Subscriber} from "rxjs";

const updateCartItems = (cartItems: CartItem[], item: CartItem, idx: number) => {
  if (item.count === 0) {
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1),
    ];
  }

  if (idx === -1) {
    return [
      ...cartItems,
      item,
    ];
  }

  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1),
  ];
};

const updateCartItem = (itemFromMenu:IngredientItem, itemFromCart: CartItem, quantity: number): CartItem => {
  if (itemFromCart) {
    return {
      ...itemFromCart,
      count: itemFromCart.count + quantity,
      time: itemFromCart.time + quantity * itemFromMenu.timeCook,
    };
  }
  return {
    id: itemFromMenu.idingredients,
    name: itemFromMenu.name,
    count: 1,
    time: itemFromMenu.timeCook,
  };
};

const updateTotalCookingTime = (ingredient: IngredientItem, totalCookingTime: number, quantity: number) =>
  totalCookingTime + quantity * ingredient.timeCook;

export const updateOrder = (menuListItem: IngredientItem[], cartItems: CartItem[], totalCookingTime: number, itemId: number, quantity: number): Object => {
  const itemFromMenu = menuListItem.find((e) => e.idingredients === itemId);

  const itemIndexFromCart = cartItems.findIndex((e) => e.id === itemId);
  const itemFromCart = cartItems[itemIndexFromCart];
  const newItem = updateCartItem(itemFromMenu, itemFromCart, quantity);

  cartItems = updateCartItems(cartItems ,newItem, itemIndexFromCart);
  totalCookingTime = updateTotalCookingTime(itemFromMenu, totalCookingTime, quantity)

  return {
    cartItems,
    totalCookingTime
  }
};
