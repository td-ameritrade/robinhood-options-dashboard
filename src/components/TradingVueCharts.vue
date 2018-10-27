<template>
  <div class="hello">
    <VueTradingView
      :options="{
        symbol: 'NASDAQ:AAPL',
        theme: 'dark',
    }" />
  </div>
</template>

<script>
import VueTradingView from 'vue-trading-view';

export default {
  name: 'HelloWorld',
  components: {
    VueTradingView,
  },
  props: {
    // msg: String,
  },
};
</script>
