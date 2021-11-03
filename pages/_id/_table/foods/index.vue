<template>
  <v-row>
    <FoodCard
      v-for="food in $store.state.foods.foods"
      :food="food"
      :key="food._id"
    />
  </v-row>
</template>

<script>
export default {
  name: "Foods",
  data() {
    return {};
  },
  async created() {
    this.$fetch();
    if (this.$route.query.q == undefined) {
      await this.$api.foods.getFoods(this.$route.params.id);
    }
  },
  async fetch() {
    await this.$api.foods.getFoodTypes();
  },
};
</script>
