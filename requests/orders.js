export default (axios, store, toast) => ({
  makeOrder({number, code, table, deller, cart}) {
    if (cart) {
      let data = [];
      cart.map((item) => {
        data.push({ foodID: item.food._id, qty: item.qty });
      });
      let total = cart.reduce((t, c) => {
        return t + c.food.price * c.qty;
      }, 0);
      if(store.state.user.smsID && code){
        axios
        .post(`/order?smsID=${store.state.user.smsID}&code=${code}`, {
          table: table,
          deller: deller,
          number : number,
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
        toast.error("You need to verificate your phone number!")
      }
    } else {
      toast.error("Your Cart is Empty");
    }
  },
  getCode(number) {
    axios
      .post(`/getCode`, {
        number: number,
      })
      .then((res) => {
        store.commit("user/smsID", res.data.serviceSid);
        toast.success("Successfully sent your code!");
      })
      .catch((error) => {
        toast.error(error);
      });
  },
});
