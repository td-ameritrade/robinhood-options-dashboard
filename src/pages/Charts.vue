<template>
  <q-page
    padding
    class="row justify-center">
    <div >
      <!-- <div style="width: 800px; max-width: 90vw;" > -->
      <!-- <TradingVueCharts /> -->
      <Chart />
    </div>
  </q-page>
</template>


<style>
</style>

<script>

// import TradingVueCharts from '.././components/TradingVueCharts';
import Chart from '.././components/Chart';

export default {
  name: 'Charts',
  components: {
    // TradingVueCharts,
    Chart,

  },
  data() {
    return {
    };
  },
  methods: {
    //
  },

};
</script>
