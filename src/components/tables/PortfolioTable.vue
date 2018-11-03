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
      class="bg-black" />
  </div>
</template>

<script>

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
  computed: {
    ...mapGetters('robinhood', ['openPositions', 'positionTotal']),
    ...mapState('robinhood', ['positions, openposition']),
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
  },
};
</script>

<style>
</style>
