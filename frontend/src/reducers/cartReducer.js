import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  REMOVE_ALL_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product && i.SubCategory === item.SubCategory && i.ProductSize === item.ProductSize
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      const item1 = action.payload;
      const isItemExist1 = state.cartItems.find(
        (i) => i.product === item1.product && i.SubCategory === item1.SubCategory && i.ProductSize === item1.ProductSize
      );
      
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => (i.product != isItemExist1.product  || i.SubCategory != isItemExist1.SubCategory  || i.ProductSize != isItemExist1.ProductSize )),
      };
    

    case REMOVE_ALL_CART_ITEM:
      return {
        ...state,
        cartItems: [],
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
