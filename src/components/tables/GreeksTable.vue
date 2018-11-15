<template>
  <div>
    <q-table
      :data="positionTotal"
      :columns="greeksColumns"
      :pagination.sync="pagination"
      title="Greeks - Total by Underlying"
      row-key="name"
      dense
      dark
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  // name: 'ComponentName',
  data() {
    return {

      quotes: [],
      pagination: {
        sortBy: 'chain_symbol', // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10, // current rows per page being displayed
      },
      greeksColumns: [
        {
          name: 'chain_symbol',
          label: 'underlying',
          field: 'chain_symbol',
          sortable: true,
        },
        {
          name: 'pos_delta',
          label: 'Delta',
          field: 'delta',
          format: val => `${val.toFixed(4)}`,
          style: 'color: yellow',
          sortable: true,
        },
        {
          name: 'pos_gamma',
          label: 'Gamma',
          field: 'gamma',
          format: val => `${val.toFixed(4)}`,
          style: 'color: red',
          sortable: true,
        },
        {
          name: 'pos_theta',
          label: 'Theta',
          field: 'theta',
          format: val => `${val.toFixed(4)}`,
          style: 'color: green',
          sortable: true,
        },
        {
          name: 'pos_vega',
          label: 'Vega',
          field: 'vega',
          format: val => `${val.toFixed(4)}`,
          style: 'color: blue',
          sortable: true,
        },
      ],
    };
  },
  // computed: {
  //   tableData:
  // }

  computed: {
    // positionTotal() {
    //   return this.$store.getters.robinhood.positionTotal;
    // },
    ...mapGetters('robinhood', ['positionTotal']),
    // quoteData: {
    //   get(symbol) {

    //   },
    // },

    // tableData() {
    //   // this.positionData = this.$store.state.robinhood.openpositions;
    //   // return this.openpositions;
    // },
  },

  methods: {
    getQuoteData() {
      this.$store.dispatch('robinhood/getQuoteData');
    },
    updatePositionData() {
      this.$store.dispatch('robinhood/updatePositionData');
    },
  },
};
</script>

<style>
</style>
