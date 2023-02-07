<script setup lang="ts">
import { computed, unref, onMounted } from 'vue';
import { getStackBlitzProjectConfig } from './helpers';
import HelloWorld from './components/HelloWorld.vue';
import sdk from '@stackblitz/sdk';
import { useRoute } from 'vue-router';
// Import stylesheets
import './style.css';

const route = useRoute();

const packageName = computed(
  () => route.query.packageName || '@shopware-pwa/shopware-6-client'
);

const packageVersion = computed(() => route.query.packageVersion || 'latest');
const functionName = computed(
  () => route.query.functionName || 'getSessionContext'
);

const isAsync = computed(() => !!route.query.async || true);

const openExample = () => {
  sdk.openProject(
    getStackBlitzProjectConfig({
      packageName: packageName.value,
      packageVersion: packageVersion.value,
      functionName: functionName.value,
      isAsync: isAsync.value,
    }),
    { newWindow: false }
  );
};

onMounted(() => setTimeout(() => openExample(), 500);
</script>

<template>
  <div>Your example configuration:</div>
  <div class="settings">
    <pre>{{
      {
        packageName,
        packageVersion,
        functionName,
        isAsync
      }
    }}</pre>
  </div>
  <!-- <div><button @click="openExample">Click to load</button></div> -->
</template>

<style>
pre {
  text-align: left;
}

div.settings {
  text-align: left;
}
</style>
