<template>
  <v-col cols="6" sm="3">
    <v-card>
      <v-img height="150" :src="$constants.url + food.photo"></v-img>
      <v-card-text>
        <div class="d-flex">
          <h2>{{ food.name }}</h2>
          <v-spacer></v-spacer>
          <p>{{ $constants.normalizer(food.price) }} sum</p>
        </div>
        <v-rating
          :value="4"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          fab
          x-small
          v-show="!$constants.inCard(food)"
          @click="addToCart(food, 1)"
          color="green"
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <div v-show="$constants.inCard(food)">
          <v-btn
            fab
            x-small
            @click="$store.commit('user/removeFromCart', food)"
            color="red"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <span class="mx-3">{{
            $constants.inCard(food) && $constants.inCard(food).qty
          }}</span>
          <v-btn fab x-small @click="addToCart(food, 1)" color="green">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "FoodCard",
  props: {
    food: Object,
  },
  data() {
    return {
      name: this.food.name,
      price: this.food.price,
      dialog: false,
    };
  },
  methods: {
    addToCart(food, qty) {
      this.$store.commit("user/addToCart", { food, qty });
    },
  },
};
</script>
