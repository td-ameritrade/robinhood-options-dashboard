<template>
  <div>
    <q-list dense>
      <q-item
        v-for="position in openposition"
        :key="position.id">
        <q-item-side>
          <q-chip
            v-if="position.quantity>0"
            color="green">
            {{ position.quantity }}
          </q-chip>
          <q-chip
            v-if="position.quantity<0"
            color="red">
            {{ position.quantity }}
          </q-chip>
        </q-item-side>
        <q-item-main>
          <q-btn @click="closePosition(position)">close</q-btn>

        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script>
// import { mapState } from 'vuex';

export default {
  data: () => ({
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
    tableData: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%',
      },
    ],
  }),
  computed: {
    openposition: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.state.robinhood.openposition));
      },
    },
  },
  methods: {
    closePosition(position) {
      this.$store.dispatch('robinhood/closeOptionsPosition', position);
    },
  },
};
// {
//   "quantity": "3",
//   "direction": "debit",
//   "price": "1.98",
//   "type": "limit",
//   "account": "https://api.robinhood.com/accounts/5PY08142/",
//   "time_in_force": "gfd",
//   "trigger": "immediate",
//   "legs": [
//     {
//       "side": "buy",
//       "option": "https://api.robinhood.com/options/instruments/0cd968ac-847f-42c1-8a3e-36beee5274c3/",
//       "position_effect": "close",
//       "ratio_quantity": "1"
//     }
//   ],
//   "override_day_trade_checks": false,
//   "override_dtbp_checks": false
// }
</script>


<style>
</style>
