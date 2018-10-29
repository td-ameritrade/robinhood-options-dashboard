<template>
  <div>  <div>
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
    </q-list>
  </div>
  </div>
</template>

<script>
export default {
  name: 'AnalysisPriceSliders',
  data() {
    return {

    };
  },
  computed: {

  },
};
</script>

<style>
</style>
