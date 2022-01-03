export const state = () => ({
  orders: [],
  ordered: null
});

export const mutations = {
  orders(state, data) {
    state.orders = data;
  },
  ordered(state, data) {
    state.ordered = data;
  },
};
