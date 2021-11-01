import Orders from "../requests/orders";
import Foods from "../requests/foods";

export default (context, inject) => {
  const factories = {
    orders: Orders(context.$axios, context.store, context.$toast),
    foods: Foods(context.$axios, context.store, context.$toast),
  };

  inject("api", factories);
};
