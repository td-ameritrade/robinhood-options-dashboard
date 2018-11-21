<template>
  <div>
    <q-table
      :data="openposition"
      :columns="greeksColumns"
      :pagination.sync="pagination"
      :dark="darkMode"
      :class="tableColor"
      title="Greeks by Position"
      row-key="name"
      dense
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  // name: 'ComponentName',
  data() {
    return {

      quotes: [],
      pagination: {
        sortBy: 'id', // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10, // current rows per page being displayed
      },
      greeksColumns: [
        // {
        //   name: 'chain_symbol',
        //   label: 'underlying',
        //   field: 'chain_symbol',
        //   sortable: true,
        // },
        {
          name: 'id',
          label: 'ID',
          field: 'TDAPI',
        },
        {
          name: 'delta',
          label: 'Delta',
          field: 'delta',
          format: val => `${parseFloat(val).toFixed(4)}`,

        },
        {
          name: 'gamma',
          label: 'Gamma',
          field: 'gamma',
          format: val => `${parseFloat(val).toFixed(4)}`,

        },
        {
          name: 'theta',
          label: 'Theta',
          field: 'theta',
          format: val => `${parseFloat(val).toFixed(4)}`,

        },
        {
          name: 'vega',
          label: 'Vega',
          field: 'vega',
          format: val => `${parseFloat(val).toFixed(4)}`,

        },
        {
          name: 'pos_delta',
          label: 'Delta',
          field: 'posDelta',
          format: val => `${parseFloat(val).toFixed(4)}`,
          style: 'color: purple',
          sortable: true,
        },
        {
          name: 'pos_gamma',
          label: 'Gamma',
          field: 'posGamma',
          format: val => `${parseFloat(val).toFixed(4)}`,
          style: 'color: red',
          sortable: true,
        },
        {
          name: 'pos_theta',
          label: 'Theta',
          field: 'posTheta',
          format: val => `${parseFloat(val).toFixed(4)}`,
          style: 'color: green',
          sortable: true,
        },
        {
          name: 'pos_vega',
          label: 'Vega',
          field: 'posVega',
          format: val => `${parseFloat(val).toFixed(4)}`,
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
    ...mapGetters('robinhood', ['openposition', 'tableColor', 'positionTotal']),
    ...mapState('robinhood', ['darkMode', 'openposition']),
    // quoteData: {
    //   get(symbol) {

    //   },
    // },

    // tableData() {
    //   // this.positionData = this.$store.state.robinhood.openpositions;
    //   // return this.openpositions;
    // },
  },

};
</script>

<style>
</style>
