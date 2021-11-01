export const state = () => ({
    foods: [],
  });
  
  export const mutations = {
    foods(state, data) {
      state.foods = data;
    },
  };
  