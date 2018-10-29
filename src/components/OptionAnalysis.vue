<template>
  <div>
    <q-list style="width: 400px">
      <q-item>
        <q-item-side icon="mic" />
        <q-item-main>
          <q-slider
            v-model="increment.amount"
            :min="0"
            :max="10"
            :step="0.01"
            label-always
            label

            @select="updatePriceArray()"/>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side icon="mic" />
        <q-item-main>
          <q-slider
            v-model="increment.count"
            :min="0"
            :max="10"
            :step="1"
            label-always

            label
            @select="updatePriceArray()"/>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side icon="mic" />
        <q-item-main>
          <q-select
            v-model="analysisSymbol"
            :options="selectOptions"
            float-label="Symbol for Analysis"
            @select="updatePriceArray()"

          />
        </q-item-main>
      </q-item>

    </q-list>
    <q-btn
      label="update"
      @click="updateChart()" />
    <!-- <q-btn
      label="update"
      @click="createSimulatedPrices()" /> -->
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

const fixFloat = value => parseFloat(parseFloat(value).toFixed(2));

export default {
  name: 'OptionAnalysis',
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      analysisSymbol: '',
      increment: {
        amount: 0.25,
        count: 6,
      },
      optionPrices: [],
      series: [{
        data: [],
      }],
      options: {
        chart: {
          type: 'line',
        },
        xaxis: {
          categories: this.priceArray,
        },

        // xaxis: {
        //   type: 'numeric',
        //   categories: [],
        // },
      },
      // options: {
      //         chart: {
      //           id: 'vuechart-example',
      //         },
      //         xaxis: {
      //           categories: this.priceArray,
      //         },
      //       },
      // series: [{
      //   name: 'series-1',
      //   data: this.optionPrices,
      // }],
    };
  },
  computed: {
    ...mapGetters('robinhood', ['uniqueSymbols', 'positionTotal', 'openPositions']),
    ...mapState('robinhood', ['openposition']),
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
    priceArray() {
      const prices = [];
      let price = this.analysisSymbol.underlyingprice -
        (this.increment.count * this.increment.amount);

      // calculate the price steps starting with the lowest (increment * -1)
      for (let i = this.increment.count * -1; i < this.increment.count; i += 1) {
        price += this.increment.amount;
        prices.push(fixFloat(price));
      }
      return prices;
    },
  },
  beforeMount() {
    // this.updateChart();
  },
  methods: {
    updateChart() {
      try {
        const chartData = [];
        console.log(this.priceArray);
        this.priceArray.forEach((price) => {
          // console.log(this.openPositions[0]);
          let type;
          if (this.analysisSymbol.contractType === 'P') {
            type = 'put';
          } else {
            type = 'call';
          }
          console.log(type);
          const optionPrice = BS.blackScholes(
            price,
            this.analysisSymbol.strike_price,
            (this.analysisSymbol.daystoexpiration / 365),
            this.analysisSymbol.impVol / 100,
            0.025,
            type,
          );
          const chartDataPoint = {
            x: price,
            y: optionPrice,
          };
          console.log(optionPrice);
          // eslint-disable-next-line
      // const positionProfit = (optionPrice);
          chartData.push(chartDataPoint);
          // this.series.data.push(chartDataPoint);
          // });
          // const positionProfit = (this.analysisSymbol.quantity *
          // optionPrice * 100) - this.analysisSymbol.costbasis;
          //     optionPrices.push(positionProfit);
          //   });        // console.log(optionPrices);

          // eslint-disable-next-line
    // In the same way, update the series option
          // return Object.assign([], { name: 'series1' }, { data: this.positionTotal });
        });
        this.series = [{
          data: chartData,
        }];
      } catch (e) {
        throw new Error(e);
      }
    },

  },
};

</script>
