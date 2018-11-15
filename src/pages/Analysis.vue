<template>
  <q-page
    padding
    class="row justify-center">
    <div style="width: 800px; max-width: 90vw;" >
      <!-- Coming Soon -->
      <AnalysisPriceSliders />
      <Chart />
    </div>
  </q-page>
</template>


<style>
</style>

<script>

import Chart from '.././components/Chart';
import AnalysisPriceSliders from '.././components/AnalysisPriceSliders';

export default {
  name: 'Analysis',
  components: {
    Chart,
    AnalysisPriceSliders,
  },
  data() {
    return {
    };
  },
  methods: {

  },

};
</script>
