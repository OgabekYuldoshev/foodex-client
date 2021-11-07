<template>
  <div id="qr">
    <div class="p-5">
      <v-btn icon @click="$router.push('/')">
        <v-icon size="30">mdi-arrow-u-left-top</v-icon>
      </v-btn>
    </div>
    <div class="d-flex flex-column align-center mt-10">
      <qrcode-stream
        :style="`border: 2px solid ${!result ? 'red' : 'green'};`"
        id="camera"
        :camera="camera"
        :track="paintOutline"
        @decode="onDecode"
        @init="onInit"
      >
        <div v-if="validationSuccess" class="validation-success">
          QR Code is validated !, you need to go to menu!
        </div>

        <div v-if="validationFailure" class="validation-failure">
          QR Code is not validated !, Please try again ?
        </div>
      </qrcode-stream>
      <!-- <qrcode-stream
        :style="`border: 2px solid ${!result.length ? 'red' : 'green'};`"
        id="camera"
        @decode="onDecode"
        :track="paintOutline"
        @init="onInit"
      ></qrcode-stream> -->
      <v-btn
        v-if="!tryAgain"
        @click="routeGo"
        :disabled="!result"
        class="mt-5"
        color="blue"
      >
        Go To Menu
      </v-btn>
      <v-btn v-else @click="turnCameraOn" class="mt-5" color="red">
        Try Again
      </v-btn>
      <span style="color: red" class="text-center mt-5">{{ error }}</span>
    </div>
  </div>
</template>

<script>
export default {
  layout: "main",

  data() {
    return {
      result: null,
      error: "",
      camera: "auto",
      tryAgain: false,
      isValid: undefined,
    };
  },
  mounted() {
    this.camera = "auto";
  },
  computed: {
    validationSuccess() {
      return this.isValid === true;
    },

    validationFailure() {
      return this.isValid === false;
    },
  },

  methods: {
    async onDecode(content) {
      let urlArr = content.split("/")[2];
      if (window.location.hostname == urlArr) {
        this.turnCameraOff();
        this.isValid = true;
        this.result = content;
        this.$toast.success("Your QR Code is Validated!");
      } else {
        this.tryAgain = true;
        this.isValid = false;
        this.turnCameraOff();
        this.errorShow("QR code not validate, Please try again :(", "error");
      }
    },
    errorShow(text, type) {
      this.error = text;
      switch (type) {
        case "error":
          setTimeout(() => {
            this.error = "";
          }, 3000);
          break;
        case "camera":
          return this.error;
        default:
          break;
      }
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
    turnCameraOn() {
      this.isValid = undefined;
      this.tryAgain = false;
      this.camera = "auto";
    },

    turnCameraOff() {
      this.camera = "off";
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.errorShow(
            "ERROR: you need to grant camera access permission",
            "camera"
          );
        } else if (error.name === "NotFoundError") {
          this.errorShow("ERROR: no camera on this device", "camera");
        } else if (error.name === "NotSupportedError") {
          this.errorShow(
            "ERROR: secure context required (HTTPS, localhost)",
            "camera"
          );
        } else if (error.name === "NotReadableError") {
          this.errorShow("ERROR: is the camera already in use?", "camera");
        } else if (error.name === "OverconstrainedError") {
          this.errorShow("ERROR: installed cameras are not suitable", "camera");
        } else if (error.name === "StreamApiNotSupportedError") {
          this.errorShow(
            "ERROR: Stream API is not supported in this browser",
            "camera"
          );
        } else if (error.name === "InsecureContextError") {
          this.errorShow(
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.",
            "camera"
          );
        } else {
          this.errorShow(`ERROR: Camera error (${error.name})`, "camera");
        }
      }
    },
  },
};
</script>

<style scoped>
#camera {
  min-width: 200px;
  max-width: 400px;
  height: 400px;
  position: relative;
  margin: auto;
}
.validation-success,
.validation-failure {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  padding: 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>
