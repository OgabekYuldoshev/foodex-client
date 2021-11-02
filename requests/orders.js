export default (axios, store, toast) => ({
  makeOrder(table, cart) {
    if (cart) {
      let data = [];
      cart.map((item) => {
        data.push({ foodID: item.food._id, qty: item.qty });
      });
      let total = cart.reduce((t, c) => {
        return t + c.food.price * c.qty;
      }, 0);
      axios
        .post(`/order`, { table: table, foods: data, total: total })
        .then((res) => {
          toast.success("Success");
          localStorage.removeItem('cart')
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      toast.error("Your Cart is Empty");
    }
  },
});
