export default (axios, store, toast) => ({
  getFoods(type) {
    axios
      .get(`/foods/fastfood`)
      .then((res) => {
        store.commit("foods/foods", res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  },
  });
  