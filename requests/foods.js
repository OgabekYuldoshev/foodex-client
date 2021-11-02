export default (axios, store, toast) => ({
  getFoods(type) {
    axios
      .get(`/foods/617aaecd6e312f0e4baf6cbd`)
      .then((res) => {
        store.commit("foods/foods", res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  },
  });
  