<template>
  <div
    padding
    class="row justify-center">

    <div
      class="col; q-ma-md"
      style="width: 500px; max-width: 90vw;">
      <apexcharts
        :options="chartOptions"
        :series="series"
        title="title"
        width="500"
        type="line"/>
      <div>
        <button @click="updateChart">Update!</button>
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
        <button @click="updateChart">Update!</button>
      </div>
    </div>

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import { mapState } from 'vuex';

const BS = require('.././services/black-scholes.js');
const greeks = require('.././services/greeks.js');

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
          theme: 'palette11',

        },
        labels: [],

      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      }],
      greeks: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      }],
    };
  },
  computed: {
    ...mapState('robinhood', ['openposition']),
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
    generatePriceArray() {

    },
    async updateChart() {
      this.$store.state.optionstrategy.analysisSymbols.forEach((symbol) => {
        const prices = [];
        let startingPrice = symbol.underlyingprice -
        (this.priceIncrementCount * this.priceIncrementAmount);

        // calculate the price steps starting with the lowest (increment * -1)
        for (let i = this.priceIncrementCount * -1; i < this.priceIncrementCount; i += 1) {
          startingPrice += this.priceIncrementAmount;
          prices.push(startingPrice.toFixed(2));
        }

        // const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];
        const chartData = [];
        const chartDeltas = [];
        const chartGammas = [];
        const chartThetas = [];
        const chartVegas = [];
        console.log(prices);
        prices.forEach((price) => {
        // console.log(this.openPositions[0]);
          let type;
          if (symbol.type === 'P') {
            type = 'put';
          } else {
            type = 'call';
          }

          const bsInputs = [
            price,
            symbol.strike_price,
            (symbol.daystoexpiration / 365),
            symbol.impVol / 100,
            0.025,
            type,
          ];
          const optionPrice = BS.blackScholes(...bsInputs);
          console.log(optionPrice);

          const delta = greeks.getDelta(...bsInputs);
          const gamma = greeks.getGamma(...bsInputs);
          const theta = greeks.getTheta(...bsInputs);
          const vega = greeks.getVega(...bsInputs);
          chartDeltas.push(JSON.parse(JSON.stringify(delta)));
          chartGammas.push(gamma);
          chartThetas.push(theta);
          chartVegas.push(vega);

          const positionProfit =
        (symbol.quantity * optionPrice * 100) - symbol.costbasis;
          chartData.push(positionProfit);
        // this.series.data.push(chartDataPoint);
        // });
        //
        // optionPrice * 100) - this.analysisSymbol.costbasis;
        //     optionPrices.push(positionProfit);
        //   });        // console.log(optionPrices);

        // eslint-disable-next-line
    // In the same way, update the series option
        // return Object.assign([], { name: 'series1' }, { data: this.positionTotal });
        });
        console.log(chartData);
      });


      // this.chartOptions = {
      //   labels: prices,
      // };
      // // In the same way, update the series option
      // this.series = [{
      //   name: 'Price',
      //   data: chartData,
      // }];

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
    },
  },
};
</script>

<style>
</style>
