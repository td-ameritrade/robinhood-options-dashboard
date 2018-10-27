<template>
  <q-page
    padding
    class="row justify-center">
    <div style="width: 800px; max-width: 90vw;" >
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
  methods: {
    //
  },

};
</script>
