<template>
  <div>
    <q-table
      :data="positionTotal"
      :columns="performanceColumns"
      :pagination.sync="pagination"
      title="Position Summary by Performance"
      row-key="name"
      dense
      dark
      class="bg-black"
      color="primary"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'PerformanceTable',
  data() {
    return {
      pagination: {
        sortBy: 'chain_symbol', // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10, // current rows per page being displayed
      },

      performanceColumns: [
        {
          name: 'chain_symbol',
          label: 'underlying',
          field: 'chain_symbol',
          sortable: true,
        },
        {
          name: 'pos_costbasis',
          label: 'Cost Basis',
          field: 'costbasis',
          format: val => `$ ${parseFloat(val).toFixed(2)}`,
          sortable: true,
        },
        {
          name: 'net_liq',
          label: 'Net Liq',
          field: 'netliq',
          format: val => `$ ${parseFloat(val).toFixed(2)}`,
          sortable: true,
        },
        {
          name: 'gain_loss',
          label: 'PnL',
          field: 'gainloss',
          format: val => `$ ${parseFloat(val).toFixed(2)}`,
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
    ...mapGetters('robinhood', ['positionTotal']),
    ...mapState('robinhood', ['openposition']),
    // quoteData: {
    //   get(symbol) {

    //   },
    // },
    classObject(val) {
      if (val > 0) {
        return 'color: green';
      }
      return 'color: red';
    },
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
.RH {
  color: red;
}
</style>
