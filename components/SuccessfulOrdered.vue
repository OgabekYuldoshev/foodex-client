<template>
  <v-row justify="center">
    <v-dialog v-model="show" light persistent max-width="500">
      <v-card>
        <v-card-title
          class="text-center d-flex flex-column align-center justify-center"
        >
          <v-icon class="mx-auto" color="green" size="80"
            >mdi-check-decagram</v-icon
          >
          <h3>
            Your Order Number
            <span class="green--text"
              >#{{
                $store.state.orders.ordered &&
                $store.state.orders.ordered.number
              }}</span
            >
          </h3>
        </v-card-title>
        <v-card-text class="text-center">
          Note, Download this order number to your phone, and show it when you
          receive your order!
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" outlined @click="download('png')">
            Download Image
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" outlined @click="download('pdf')">
            Download Pdf
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  computed: {
    show() {
      if (this.$store.state.orders.ordered !== null) return true;
      return false;
    },
  },
  methods: {
    download(type) {
      window.open(
        `${this.$constants.downloadOrder}/${type}/${this.$store.state.orders.ordered._id}`
      );
      this.$store.commit("orders/ordered", null);
    },
  },
};
</script>
