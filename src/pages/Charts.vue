<template>
  <q-page
    padding
    class="row justify-center">
    <div >
      <!-- <TradingVueCharts /> -->
      <AnalysisDynamic />
    </div>
  </q-page>
</template>


<style>
</style>

<script>
// import TradingVueCharts from '.././components/TradingVueCharts';
import AnalysisDynamic from '.././components/analysis-dynamic';

export default {
  name: 'Charts',
  components: {
    AnalysisDynamic,

  },
  data() {
    return {
    };
  },

};
</script>
