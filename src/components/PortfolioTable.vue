<template>
  <div>

    <q-table
      :data="openposition"
      :columns="columns"
      :pagination.sync="pagination"
      title="Option Positions"
      row-key="name"
      dense
      dark
      class="bg-black"
    />


  </div>

</template>

<script>

//  created_at: '2018-10-12T19:36:53.043348Z',
//     direction: 'credit',
//     intraday_quantity: '5.0000',
//     average_open_price: '161.2000',
//     chain: 'https://api.robinhood.com/options/chains/c277b118-58d9-4060-8dc5-a3b5898955cb/',
//     updated_at: '2018-10-12T19:36:53.417582Z',
//     symbol: 'SPY',
//     trade_value_multiplier: '100.0000',
//     intraday_direction: 'credit',
//     strategy: 'short_call',
//     intraday_average_open_price: '161.2000',
//     legs: [{
//       strike_price: '276.0000', option: 'https://api.robinhood.com/options/instruments/f70e4501-cea6-4ff6-bd78-1a422c3da9ec/', expiration_date: '2018-10-15', option_type: 'call', id: '7b3fd074-f7a6-4d48-bd4f-313ff1862365', position_type: 'short', position: 'https://api.robinhood.com/options/positions/c52bd77e-68b0-41af-a886-165c80dfcf5f/', ratio_quantity: 1,
//     }],
//     id: '172ebd93-9c2e-485d-a9db-f216bbe83a9f',
//     quantity: '5.0000',

// import tableData from '.././assets/TableData';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'PortfolioTable',
  data() {
    return {

      quoteData: this.$store.state.robinhood.quotes,
      quotes: [],
      pagination: {
        sortBy: 'ticker', // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10, // current rows per page being displayed
      },
      columns: [
        {
          name: 'Qty',
          label: 'Qty',
          field: 'quantity',
          sortable: true,
        },
        {
          name: 'ticker',
          label: 'Ticker',
          field: 'chain_symbol',
          sortable: true,
        },
        {
          name: 'expiration',
          label: 'Expiration',
          field: 'expiration_date',
          sortable: true,
        },
        {
          name: 'strike',
          label: 'Strike',
          field: 'strike_price',
          sortable: true,
          format: val => `${parseFloat(val).toFixed(2)}`,
        },
        {
          name: 'type',
          label: 'Type',
          field: 'type',
          sortable: true,
        },
        {
          name: 'price',
          label: 'Price',
          field: 'price',
          format: val => `${parseFloat(val).toFixed(4)}`,
        },
        {
          name: 'averagePrice',
          label: 'Av. Price',
          field: 'average_price',
          format: val => `$ ${parseFloat(val).toFixed(2)}`,

        },
        {
          name: 'costbasis',
          label: 'Basis',
          field: 'costbasis',
          format: val => `$ ${parseFloat(val).toFixed(2)}`,
        },
        {
          name: 'netliq',
          label: 'Net Liq',
          field: 'netliq',
          format: val => `$ ${parseFloat(val).toFixed(2)}`,

        },
        {
          name: 'gainloss',
          label: 'PnL',
          field: 'gainloss',
          format: val => `$ ${parseFloat(val).toFixed(2)}`,

        },

        {
          name: 'impVol',
          label: 'Vol',
          field: 'impVol',
          format: val => `${parseFloat(val).toFixed(4)}`,
        },
      ],
      openpositions: [],
    };
  },
  // computed: {
  //   tableData:
  // }

  computed: {
    ...mapGetters('robinhood', ['openPositions', 'positionTotal']),
    ...mapState('robinhood', ['positions, openposition']),
    // quoteData: {
    //   get(symbol) {
    openposition: {
      get() {
        return this.$store.state.robinhood.openposition;
      },
    },
    classObject() {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal',
      };
    },
    // tableData() {
    //   // this.positionData = this.$store.state.robinhood.openpositions;
    //   // return this.openpositions;
    // },
  },

  methods: {

  },
};
</script>

<style>
</style>
