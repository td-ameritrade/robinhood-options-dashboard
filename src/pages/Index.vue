<template>
  <q-page
    padding
    class="row justify-center">
    <div style="width: 800px; max-width: 90vw;" >

      <q-btn
        color="primary"
        class="q-ma-md"
        @click="getRobinHoodData()">Refresh Robinhood Data</q-btn>
      <q-btn
        color="primary"
        class="q-ma-md"
        @click="refreshQuoteData()">Refresh TDA Quote Data</q-btn>
      <q-btn
        color="primary"
        class="q-ma-md"
        @click="testing()">Refresh TDA Quote Data</q-btn>
    </div>

    <div
      style="width: 800px; max-width: 90vw;"
      class="q-ma-md">
      <PortfolioTable />
    </div>

    <div
      style="width: 800px; max-width: 90vw;"
      class="q-ma-md">
      <PerformanceTable />
    </div>

    <div
      style="width: 800px; max-width: 90vw;"
      class="q-ma-md">
      <PositionGreeksTable />
    </div>

    <!-- <div
      style="width: 800px; max-width: 90vw;"
      class="q-ma-md">
      <GreeksTable />
    </div> -->
  </q-page>
</template>


<style>
</style>

<script>

import PerformanceTable from '.././components/tables/PerformanceTable';
import PortfolioTable from '.././components/tables/PortfolioTable';
// import GreeksTable from '.././components/tables/GreeksTable';
import PositionGreeksTable from '.././components/tables/PositionGreeksTable';

export default {
  name: 'PageIndex',
  components: {
    PerformanceTable,
    PortfolioTable,
    // GreeksTable,
    PositionGreeksTable,


  },
  data() {
    return {
    };
  },
  methods: {
    async getRobinHoodData() {
      await this.$store.dispatch('robinhood/getAccountData');
    },
    async testing() {
      await this.$store.dispatch('optionstrategy/simulateOptionPayoffs');
    },
    async getQuoteData() {
      await this.$store.dispatch('robinhood/refreshQuoteData');
    },
  },

};
</script>
