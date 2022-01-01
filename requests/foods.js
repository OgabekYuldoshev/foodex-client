export default (axios, store, toast) => ({
  getFoods(id) {
    axios
      .get(`/foods/${id}`)
      .then((res) => {
        store.commit("foods/foods", res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  },
  getFoodsByType(id, type) {
    axios
      .get(`/foods/${id}/${type}`)
      .then((res) => {
        store.commit("foods/foods", res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  },
  getFoodTypes() {
    axios
      .get(`/foods`)
      .then((res) => {
        store.commit("foods/foodTypes", res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  },
});
