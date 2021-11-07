<template>
  <qrcode-stream
    id="camera"
    @decode="onDecode"
    :track="paintOutline"
    @init="onInit"
  >
    <v-btn @click="routeGo" :disabled="!result.length" id="button" color="blue">
      Go To Menu
    </v-btn>
  </qrcode-stream>
</template>

<script>
export default {
  layout: "main",

  data() {
    return {
      result: "",
    };
  },

  methods: {
    onDecode(result) {
      this.result = result;
    },
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
    routeGo() {
      window.location.href = this.result;
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.$toast.error("ERROR: you need to grant camera access permission");
        } else if (error.name === "NotFoundError") {
          this.$toast.error("ERROR: no camera on this device");
        } else if (error.name === "NotSupportedError") {
          this.$toast.error("ERROR: secure context required (HTTPS, localhost)");
        } else if (error.name === "NotReadableError") {
          this.$toast.error("ERROR: is the camera already in use?");
        } else if (error.name === "OverconstrainedError") {
          this.$toast.error("ERROR: installed cameras are not suitable");
        } else if (error.name === "StreamApiNotSupportedError") {
          this.$toast.error("ERROR: Stream API is not supported in this browser");
        } else if (error.name === "InsecureContextError") {
          this.$toast.error(            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.");
        } else {
          this.$toast.error(`ERROR: Camera error (${error.name})`);
        }
      }
    },
  },
};
</script>

<style scoped>
#camera {
  width: 100%;
  height: 100vh;
  position: relative;
}
#button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
