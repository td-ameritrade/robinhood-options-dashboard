<template>
  <q-page
    padding
    class="row justify-center">
    <div >
      <TradingVueCharts />
    </div>
  </q-page>
</template>


<style>
</style>

<script>
import TradingVueCharts from '.././components/TradingVueCharts';

export default {
  name: 'Charts',
  components: {
    TradingVueCharts,

  },
  data() {
    return {
    };
  },

};
</script>
