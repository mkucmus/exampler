<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { getStackBlitzProjectConfig } from './helpers';
import sdk from '@stackblitz/sdk';
import { useRoute } from 'vue-router';
// Import stylesheets
import './style.css';

const route = useRoute();

const packageName = computed(
  () => route.query.packageName || '@shopware-pwa/api-client'
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
// timeout to get the URL params
onMounted(() => setTimeout(openExample, 500));
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
</template>

<style>
pre {
  text-align: left;
}

div.settings {
  text-align: left;
}
</style>
