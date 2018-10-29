<template>
  <div
    padding
    class="row justify-center">

    <div
      class="col; q-ma-md"
      style="width: 500px; max-width: 90vw;">
      <q-list>
        <q-item>
          <q-item-side icon="mic" />
          <q-item-main>
            <q-select
              v-model="analysisSymbol"
              :options="selectOptions"
              float-label="Symbol for Analysis"
              @input="updateChart()"
            />
          </q-item-main>
        </q-item>
        <q-item >
          <q-item-side>Price Increment</q-item-side>
          <q-item-main>
            <q-field helper="price increment between points">
              <q-slider
                v-model="increment.amount"
                :min="0"
                :max="10"
                :step="0.01"
                label-always
                label
                @input="updateChart()"/>
            </q-field>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-side># Increments</q-item-side>
          <q-item-main>
            <q-field helper="number of price increments to plot">
              <q-slider
                v-model="increment.count"
                :min="0"
                :max="10"
                :step="1"
                label-always

                label
                @input="updateChart()"/>
            </q-field>
          </q-item-main>
        </q-item>
      </q-list>
    </div>

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
</div></template>

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
      analysisSymbol: '',
      increment: {
        amount: 1.00,
        count: 5,
      },

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
    ...mapState('optionstrategy', ['priceIncrementAmount', 'priceIncrementCount']),
    selectOptions: {
      get() {
        const options = [];
        this.openposition.forEach((symbol) => {
          options.push({
            label: symbol.TDAPI,
            value: symbol,
            // quantity: symbol.quantity,
          });
        });
        return options;
      },
    },
  },
  methods: {
    generatePriceArray() {

    },
    async updateChart() {
      const prices = [];
      let startingPrice = this.analysisSymbol.underlyingprice -
        (this.increment.count * this.increment.amount);

      // calculate the price steps starting with the lowest (increment * -1)
      for (let i = this.increment.count * -1; i < this.increment.count; i += 1) {
        startingPrice += this.increment.amount;
        prices.push(startingPrice.toFixed(2));
      }

      // const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];

      const chartData = [];
      const chartDeltas = [];
      const chartGammas = [];
      const chartThetas = [];
      const chartVegas = [];

      await prices.forEach((price) => {
        // console.log(this.openPositions[0]);
        let type;
        if (this.analysisSymbol.contractType === 'P') {
          type = 'put';
        } else {
          type = 'call';
        }

        const bsInputs = [
          price,
          this.analysisSymbol.strike_price,
          (this.analysisSymbol.daystoexpiration / 365),
          this.analysisSymbol.impVol / 100,
          0.025,
          type,
        ];

        const optionPrice = BS.blackScholes(...bsInputs);

        const delta = greeks.getDelta(...bsInputs);
        const gamma = greeks.getGamma(...bsInputs);
        const theta = greeks.getTheta(...bsInputs);
        const vega = greeks.getVega(...bsInputs);
        chartDeltas.push(delta);
        chartGammas.push(gamma);
        chartThetas.push(theta);
        chartVegas.push(vega);

        const positionProfit =
        (this.analysisSymbol.quantity * optionPrice * 100) - this.analysisSymbol.costbasis;
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


      this.chartOptions = {
        labels: prices,
      };
      // In the same way, update the series option
      this.series = [{
        name: 'Price',
        data: chartData,
      }];

      this.greeks = [{
        name: 'Delta',
        data: chartDeltas,
      },
      {
        name: 'Gamma',
        data: chartGammas,
      },
      {
        name: 'Theta',
        data: chartThetas,
      },
      {
        name: 'Vega',
        data: chartVegas,
      }];
    },
  },
};
</script>

<style>
</style>
