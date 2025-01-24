<template>
  <div id="cesiumContainer"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import CesiumEarch from "./utils/CesiumEarch";

onMounted(() => {
  CesiumEarch.createViewer();
});
</script>

<style lang="scss" scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
