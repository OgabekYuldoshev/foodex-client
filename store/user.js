export const state = () => ({
  items: [],
  smsID:''
});

export const mutations = {
  addToCart(state, item) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      state.items.push(item);
      localStorage.setItem("cart", JSON.stringify(state.items));
    } else {
      state.items = cart;
      var found = state.items.find((f) => f.food._id == item.food._id);
      if (found) {
        found.qty++;
      } else {
        state.items.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  },

  removeFromCart(state, food){
    const found = state.items.find(f=>{return f.food._id == food._id})
    if(found.qty > 1){
      found.qty--
    } else{
      const index = state.items.findIndex(f=> f.food._id == food._id)
      state.items.splice(index, 1)
    }
    localStorage.setItem("cart", JSON.stringify(state.items));
  },

  clearLocalStorage(state) {
    localStorage.removeItem('cart')
    state.items = [];
  },

  checkLocalStorage(state) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      state.items = cart;
    }
  },

  smsID(state, data){
    state.smsID = data
  }
};
