<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});

useHead({
  title: "Trade",
});
</script>

<template>
  <div>
    <div>
      <TradeSearchForm />
      <main>
        <TradeHeader />
        <TradeLatestActivity />
      </main>
    </div>
    <TheFooter />
  </div>
</template>
