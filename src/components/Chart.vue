<template>
  <div
    padding
    class="row justify-center">

    <div
      v-for="symbol in createSimulatedPriceArray"
      :key="symbol.vol"
      class="col; q-ma-md"
      style="width: 500px; max-width: 90vw;">
      {{ symbol.id }}
      <apexcharts
        :options="chartOptions"
        :series="series"
        title="title"
        width="500"
        type="line"/>
      <div>
        <button @click="updateChart()">Update!</button>
      </div>
    </div>

    <div
      class="col; q-ma-md"
      style="width: 500px; max-width: 90vw;">
      <apexcharts
        :options="chartOptions"
        :series="greeks"
        title="title"
        width="500"
        type="line"/>
      <div>
        <!-- <button @click="updateChart()">Update!</button> -->
      </div>
    </div>

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import { mapState, mapGetters } from 'vuex';

// const BS = require('.././services/black-scholes.js');
// const greeks = require('.././services/greeks.js');

export default {
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      // analysisSymbol: '',
      // increment: {
      //   amount: 1.00,
      //   count: 5,
      // },

      chartOptions: {
        chart: {
          id: 'vuechart-example',
        },
        labels: [271.51, 272.51, 273.51, 274.51, 275.51, 276.51],

      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 60, 70, 91],
      }],
      greeks: [{
        name: 'series-3',
        data: [30, 40, 49, 60, 70, 91],
      }],
    };
  },
  computed: {
    ...mapGetters('optionstrategy', ['createSimulatedPriceArray']),
    ...mapState('optionstrategy', ['analysisSymbol', 'priceIncrementAmount', 'priceIncrementCount']),


    // selectOptions: {
    //   get() {
    //     const options = [];
    //     this.openposition.forEach((symbol) => {
    //       options.push({
    //         label: symbol.TDAPI,
    //         value: symbol,
    //         // quantity: symbol.quantity,
    //       });
    //     });
    //     return options;
    //   },
    // },
  },
  methods: {

    async updateChart() {
      const series = [];

      try {
        this.createSimulatedPriceArray.forEach((item) => {
          console.log(item.simProfit);
          series.push({
            name: item.id,
            data: item.simProfit,
          });


          // Object.assign([], { name: item.id }, { data: item.posProfit });
        });
        //     const deltaTotal = [];
        //     const gainLossTotal = [];

        //     for (let i = this.priceIncrementCount * -1; i < this.priceIncrementCount; i += 1) {
        //       deltaTotal.push(0);
        //       gainLossTotal.push(0);
        //     }


        //     this.$store.state.optionstrategy.analysisSymbols.forEach((symbol) => {
        //       const prices = [];
        //       let startingPrice = symbol.underlyingprice -
        //     (this.priceIncrementCount * this.priceIncrementAmount);

        //       // calculate the price steps starting with the lowest (increment * -1)
        //       for (let i = this.priceIncrementCount * -1; i < this.priceIncrementCount; i += 1) {
        //         startingPrice += this.priceIncrementAmount;
        //         prices.push(startingPrice.toFixed(2));
        //       }

        //       console.log(prices);
        //       // const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];
        //       const chartData = [];
        //       const chartDeltas = [];
        //       const chartGammas = [];
        //       const chartThetas = [];
        //       const chartVegas = [];
        //       // console.log(prices);
        //       for (let i = 0; i < prices.length; i += 1) {
        //         // prices.forEach((price) => {
        //         // console.log(this.openPositions[0]);
        //         let type;
        //         if (symbol.type === 'P') {
        //           type = 'put';
        //         } else {
        //           type = 'call';
        //         }

        //         const bsInputs = [
        //           prices[i],
        //           symbol.strike_price,
        //           (symbol.daystoexpiration / 365),
        //           symbol.impVol / 100,
        //           0.025,
        //           type,
        //         ];
        //         const optionPrice = BS.blackScholes(...bsInputs);
        //         // console.log(optionPrice);

        //         const delta = greeks.getDelta(...bsInputs);
        //         deltaTotal[i] += delta;
        //         const gamma = greeks.getGamma(...bsInputs);
        //         const theta = greeks.getTheta(...bsInputs);
        //         const vega = greeks.getVega(...bsInputs);
        //         chartDeltas.push(JSON.parse(JSON.stringify(delta)));
        //         chartGammas.push(gamma);
        //         chartThetas.push(theta);
        //         chartVegas.push(vega);

        //         const positionProfit =
        //     (symbol.quantity * optionPrice * 100) - symbol.costbasis;
        //         // console.log(positionProfit);
        //         chartData.push(positionProfit);
        //         // console.log(positionProfit, gainLossTotal[i]);
        //         const pnL = ((optionPrice - symbol.average_price) * 100 * symbol.quantity);
        //         gainLossTotal[i] += pnL;
        //         // this.series.data.push(chartDataPoint);
        //         // });
        //         //
        //         // optionPrice * 100) - this.analysisSymbol.costbasis;
        //         //     optionPrices.push(positionProfit);
        //         //   });        // console.log(optionPrices);

        //         // eslint-disable-next-line
        // // In the same way, update the series option
        //         // return Object.assign([], { name: 'series1' }, { data: this.positionTotal });
        //       }
        //       console.log(chartData, chartDeltas, deltaTotal, gainLossTotal);
        //     });


        this.chartOptions = {
          labels: this.createSimulatedPriceArray[0].prices,
        };
        // In the same way, update the series option
        this.series = series;

        // this.greeks = [{
        //   name: 'Delta',
        //   data: chartDeltas,
        // },
        // {
        //   name: 'Gamma',
        //   data: chartGammas,
        // },
        // {
        //   name: 'Theta',
        //   data: chartThetas,
        // },
        // {
        //   name: 'Vega',
        //   data: chartVegas,
        // }];
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
</script>

<style>
</style>
