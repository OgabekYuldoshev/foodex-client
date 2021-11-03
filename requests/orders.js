export default (axios, store, toast) => ({
  makeOrder(table, deller, cart) {
    if (cart) {
      let data = [];
      cart.map((item) => {
        data.push({ foodID: item.food._id, qty: item.qty });
      });
      let total = cart.reduce((t, c) => {
        return t + c.food.price * c.qty;
      }, 0);
      axios
        .post(`/order`, {
          table: table,
          deller: deller,
          foods: data,
          total: total,
        })
        .then((res) => {
          store.commit("user/clearLocalStorage");
          toast.success("Success");
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      toast.error("Your Cart is Empty");
    }
  },
});
