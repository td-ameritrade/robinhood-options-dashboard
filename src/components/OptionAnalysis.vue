<template>
  <div>
    <q-list style="width: 400px">
      <q-item>
        <q-item-side icon="mic" />
        <q-item-main>
          <q-slider
            v-model="increment"
            :min="0"
            :max="10"
            :step="0.01"
            label-always
            label/>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side icon="mic" />
        <q-item-main>
          <q-slider
            v-model="incrementCount"
            :min="0"
            :max="10"
            :step="1"
            label-always
            label/>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side icon="mic" />
        <q-item-main>
          <q-select
            v-model="analysisSymbol"
            :options="selectOptions"
            float-label="Symbol for Analysis"

          />
        </q-item-main>
      </q-item>

    </q-list>
    <q-btn
      label="update"
      @click="updateChart()" />
    <q-btn
      label="update"
      @click="createSimulatedPrices()" />
    <apexcharts
      :options="options"
      :series="series"
      width="500"
      type="bar"/>
    <apexcharts
      :options="options"
      :series="series"
      width="500"
      type="line"/>

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import { mapGetters, mapState } from 'vuex';

const BS = require('.././services/black-scholes.js');

export default {
  name: 'OptionAnalysis',
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      analysisSymbol: '',
      // selectOptions: [
      //   {
      //     label: 'Google',
      //     value: 'goog',
      //   },
      //   {
      //     label: 'Facebook',
      //     value: 'fb',
      //   },
      // ],
      price: 200,
      options: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          numeric: this.priceArray,
        },
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 49, 60, 70, 91],
      }, {
        name: 'series-2',
        data: [30, 50, 45, 50, 29, 60, 70, 91],
      }],
    };
  },
  computed: {
    ...mapGetters('robinhood', ['uniqueSymbols', 'positionTotal', 'openPositions']),
    ...mapState('robinhood', ['openposition']),
    analysisSymbol: {
      get() {
        return this.$store.state.optionstrategy.analysisSymbol;
      },
      set(val) {
        this.$store.dispatch('optionstrategy/changeAnalysisSymbol', val);
      },
    },
    selectOptions: {
      get() {
        const options = [];
        this.openposition.forEach((symbol) => {
          options.push({
            label: symbol.TDAPI,
            value: symbol.TDAPI,
            quantity: symbol.quantity,
          });
        });
        return options;
      },
    },
    increment: {
      get() {
        return this.$store.state.optionstrategy.priceIncrementAmount;
      },
      set(val) {
        this.$store.commit('optionstrategy/SET_PRICE_INCREMENT_AMOUNT', val);
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
    priceArray() {
      return this.$store.state.optionstrategy.priceArray;
    },
    // BSPrices: () => {
    //   const prices = [];
    //   for (let i; i < 8; i += 1) {
    //     prices.push(200);
    //     // console.log(prices);
    //   }
    //   return prices;
    // },
  },
  beforeMount() {
    this.updateChart();
  },
  methods: {
    createSimulatedPrices() {
      this.$store.dispatch('optionstrategy/simulatedPrices');
      // this.$store.dispatch('optionstrategy/calculateOptionPrice');
    },
    // BSPriced() {
    //   for (let i; i < this.length; i += 1) {
    //     this.prices.push(300);
    //     // console.log(this.prices);
    //   }
    // },
    updateChart() {
      const prices = this.priceArray;

      console.log(prices);

      const optionPrices = [];
      prices.forEach((price) => {
        // console.log(this.openPositions[0]);
        let type;
        if (this.openposition.type === 'P') {
          type = 'put';
        } else {
          type = 'call';
        }
        const optionPrice = BS.blackScholes(
          price,
          this.openposition.strike,
          (this.openposition.daystoexpiration / 365),
          this.openposition.impVol / 100,
          0.025,
          type,
        );
        // eslint-disable-next-line
        const positionProfit = (this.openPositions[0].quantity * optionPrice * 100) - this.openPositions[0].costbasis;
        optionPrices.push(positionProfit);
      });
      console.log(optionPrices);

      // eslint-disable-next-line
      // In the same way, update the series option
      // return Object.assign([], { name: 'series1' }, { data: this.positionTotal });
      this.series = [{
        data: optionPrices,
      }];
      this.options = {
        xaxis: {
          categories: this.priceArray,
        },
      };
    },

  },
};

</script>
