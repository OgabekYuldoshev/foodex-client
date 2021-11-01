<template>
  <div
    style="height: 100vh"
    class="w-full py-8 px-2 d-flex flex-column align-space-between"
  >
    <div>
      <h2 class="text-center mb-5">Your Cart <v-icon>mdi-cart</v-icon></h2>
      <v-simple-table max-height="500" fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Price</th>
              <th class="text-left">Quantity</th>
              <th class="text-left">All price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in $store.state.user.items" :key="item.food._id">
              <td>{{ item.food.name }}</td>
              <td>{{ $constants.normalizer(item.food.price) }} sum</td>
              <td>x{{ item.qty }}</td>
              <td>
                <div class="d-flex">
                  <v-btn
                    small
                    icon
                    @click="$store.commit('user/removeFromCart', item.food)"
                    color="red"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <v-btn
                    small
                    icon
                    @click="
                      $store.commit('user/addToCart', item)
                    "
                    color="green"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="d-flex justify-end">
        <v-btn
          @click="$store.commit('user/clearLocalStorage')"
          color="red"
          icon
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>
    <v-spacer />
    <div>
      <v-btn
        :disabled="$store.state.user.items.length == 0"
        color="green"
        large
        width="100%"
      >
        order
      </v-btn>
    </div>
  </div>
</template>
