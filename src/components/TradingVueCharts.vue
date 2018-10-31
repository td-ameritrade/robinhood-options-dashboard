<template>
  <div class="hello">
    <VueTradingView
      :options="{
        // eslint-disable-next-line
        symbol: 'AMEX:SPY',
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
