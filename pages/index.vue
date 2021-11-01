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
  async created() {
    await this.$api.foods.getFoods();
  },
  async fetch() {
    await this.$api.foods.getFoods();
  },
};
</script>
