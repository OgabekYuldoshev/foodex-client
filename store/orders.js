export const state = () => ({
  orders: [],
});

export const mutations = {
  orders(state, data) {
    state.orders = data;
  },
};
