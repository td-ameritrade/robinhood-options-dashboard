<template>
  <div>
    <q-toggle
      v-model="darkMode"
      true="dark"
      false="light"/>
  </div>
</template>

<script>
export default {
  name: 'AnalysisPriceSliders',
  data() {
    return {
    };
  },
  computed: {
    darkMode: {
      get() {
        return this.$store.state.robinhood.darkMode;
      },
      set(val) {
        this.$store.commit('robinhood/TOGGLE_DARK_MODE', val);
      },
    },
    incrementAmount: {
      get() {
        return this.$store.state.optionstrategy.priceIncrementAmount;
      },
      set(val) {
        this.$store.commit('optionstrategy/SET_PRICE_INCREMENT_AMOUNT', val);
      },
    },
  },
  mounted() {
    this.setSymbols();
  },
  methods: {
    setSymbols() {
      const symbols = [];
      this.$store.state.robinhood.openposition.forEach((symbol) => {
        symbols.push(JSON.parse(JSON.stringify(symbol)));
      });
      this.$store.commit('optionstrategy/SET_ANALYSIS_SYMBOLS', symbols);
    },
  },
};
</script>

<style>
</style>
