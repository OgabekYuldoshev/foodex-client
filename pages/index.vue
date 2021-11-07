<template>
  <div id="scan">
    <div id="scan-container">
      <img width="200" src="../static/QRScan.png" />
      <h3 class="text-center">
        Scan our QR code and order your favorite foods !
      </h3>
      <v-btn @click="$router.push('/qrscan')" color="blue">Scan Now</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: "main",
};
</script>

<style >
#scan {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
#scan-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
