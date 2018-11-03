<template>
  <div>
    <div>

      <q-list>

        <q-item>
          <q-item-side icon="mic" />
          <q-item-main>
            <q-select
              v-model="analysisSymbols"
              :options="selectOptions"
              multiple
              float-label="Symbol for Analysis"
            />
          </q-item-main>
        </q-item>

        <q-item>
          <q-item-side>Price Increment</q-item-side>
          <q-item-main>
            <q-field helper="price increment between points">
              <q-slider
                v-model="incrementAmount"
                :min="0"
                :max="10"
                :step="0.25"
                label-always
                label />
            </q-field>
          </q-item-main>
        </q-item>

        <q-item>
          <q-item-side># Increments</q-item-side>
          <q-item-main>
            <q-field helper="number of price increments to plot">
              <q-slider
                v-model="incrementCount"
                :min="0"
                :max="10"
                :step="1"
                label-always
                label />
            </q-field>
          </q-item-main>
        </q-item>

      </q-list>

    </div>
  </div>
</template>

<script>
export default {
  name: 'AnalysisPriceSliders',
  data() {
    return {
      multipleSelectOptions: [],
    };
  },
  computed: {
    selectOptions: {
      get() {
        const options = [];
        this.$store.state.robinhood.openposition.forEach((symbol) => {
          options.push(JSON.parse(JSON.stringify({
            label: symbol.TDAPI,
            value: symbol,
          })));
        });
        return options;
      },
    },
    analysisSymbols: {
      get() {
        return this.$store.state.optionstrategy.analysisSymbols;
      },
      set(val) {
        this.$store.commit('optionstrategy/SET_ANALYSIS_SYMBOLS', val);
      },
    },
    incrementCount: {
      get() {
        return this.$store.state.optionstrategy.priceIncrementCount;
      },
      set(val) {
        this.$store.commit('optionstrategy/SET_PRICE_INCREMENT_COUNT', val);
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
};
</script>

<style>
</style>
