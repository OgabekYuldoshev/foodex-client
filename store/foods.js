export const state = () => ({
  foods: [],
  types: [],
});

export const mutations = {
  foods(state, data) {
    state.foods = data;
  },
  foodTypes(state, data) {
    state.types = data;
  },
};
