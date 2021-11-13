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
                    @click="$store.commit('user/addToCart', item)"
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
      <p v-if="!$store.state.user.items.length" class="text-center mt-5">
        Your card is empty
      </p>
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
      <h3 class="mb-4" v-show="$store.state.user.items.length != 0">
        Total:
        {{
          $constants.normalizer(
            $store.state.user.items.reduce((t, c) => {
              return t + c.food.price * c.qty;
            }, 0)
          )
        }}
        sum
      </h3>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :disabled="$store.state.user.items.length == 0"
            color="green"
            large
            width="100%"
            dark
            v-bind="attrs"
            v-on="on"
          >
            order
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5"> Your Order </v-card-title>

          <v-card-text>
            <v-select
              v-model="selectedType"
              :items="type"
              item-text="name"
              item-value="id"
              required
              label="Choose Payment Type"
            ></v-select>
            <div v-if="selectedType == 2">
              <div style="gap: 5px" class="d-flex align-center">
                <v-text-field
                  label="Ex: 998 xx xxx xx xx"
                  :rules="numberRules"
                  v-model="number"
                ></v-text-field>
                <v-btn :disabled="btnDisabled" @click="getCode()"
                  >Get Code</v-btn
                >
              </div>
              <v-text-field
                type="number"
                persistent-hint
                outline
                :disabled="codeDisabled"
                label="Enter Code"
                :rules="codeRules"
                v-model="code"
              ></v-text-field>
              <div v-if="btnDisabled">
                Verification code will send in {{ timer }} seconds
              </div>
            </div>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="clearAndClose()"> Cancel </v-btn>
            <v-btn
              :disabled="selectedType != null"
              color="green"
              @click="submitOrder()"
            >
              Order
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      dialog: false,
      selectedType: null,
      number: 998,
      code: null,
      codeDisabled: true,
      btnDisabled: false,
      timer: null,
      type: [
        { id: 1, name: "Online" },
        { id: 2, name: "On Hande" },
      ],
      numberRules: [
        (value) => !!value || "Required.",
        (value) =>
          (value && value.length == 12) ||
          "Number length must be 12 characters",
      ],
      codeRules: [
        (value) => !!value || "Required.",
        (value) =>
          (value && value.length == 6) || "Code length must be 6 characters",
      ],
    };
  },
  methods: {
    submitOrder() {
      let data = {
        number: this.number,
        code: this.code,
        table: this.$route.params.table,
        deller: this.$route.params.id,
        cart: this.$store.state.user.items,
      };
      if (this.selectedType == 2) {
        this.$api.orders.makeOrderByHande(data);
      } else if (this.selectedType == 1) {
        this.$api.orders.makeOrderByOnline(data);
      }
      this.selectedType = null;
      this.dialog = false;
    },
    getCode() {
      if (this.number.length === 12) {
        this.timer = 60;
        this.$api.orders.getCode(this.number);
        this.codeDisabled = false;
        this.btnDisabled = true;
        this.timerF();
      } else {
        this.$toast.error("Number length must be 12 characters");
      }
    },
    timerF() {
      if (this.timer > 0) {
        setTimeout(() => {
          this.timer -= 1;
          this.timerF();
        }, 1000);
      } else {
        this.btnDisabled = false;
      }
    },
    clearAndClose() {
      this.dialog = false;
      this.number = 998;
      this.selectedType = null;
    },
  },
};
</script>
